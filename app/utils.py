import asyncio
import os
import time
import uuid

from aioredis import Redis
from app.constants import AUDIO_QUALITIES, REDIS_DOWNLOADS, TAST_DOWNLOAD_DIR
from fastapi import Cookie, HTTPException, Request, Response
from pydantic import HttpUrl


def get_audio_quality_label(bitrate: float) -> str:
   """Get standardized audio quality label based on bitrate."""
   for quality, info in AUDIO_QUALITIES.items():
       if bitrate >= info["min_bitrate"]:
           return info["label"]
   return AUDIO_QUALITIES["low"]["label"]


def time_format_seconds(seconds):
    """
    Convert a time duration from seconds to a formatted string.

    Args:
        seconds (int): The time duration in seconds.

    Returns:
        str: The time formatted as a string in "H:MM:SS" if the duration
             is an hour or more, otherwise in "M:SS".
    """

    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    if hours > 0:
        return f"{hours}:{minutes:02}:{seconds:02}"
    else:
        return f"{minutes}:{seconds:02}"


async def get_current_user(
    response: Response,
    session_id: str = Cookie(None),
) -> str:
    """
    Get the current user's session ID, creating a new one if necessary.

    This function is designed to be used as a dependency in a FastAPI route.
    It uses the `session_id` cookie to store the session ID. If the cookie
    does not exist, it creates a new session ID and sets it on the response.

    Returns:
        str: The current user's session ID.
    """
    if session_id:
        return session_id

    # Set the new session_id cookie on the response.
    session_id = str(uuid.uuid4())
    response.set_cookie(key="session_id", value=session_id, httponly=True)
    return session_id


def convert_for_redis(data: dict) -> dict:
    """
    Convert a dictionary's values for storage in Redis.

    This function iterates over a dictionary and converts certain value types
    to string representations suitable for storage in Redis. Specifically, it
    converts boolean values to "true" or "false", and `HttpUrl` objects to their
    string form. Other values are kept unchanged.

    Args:
        data (dict): The dictionary containing the original data.

    Returns:
        dict: A new dictionary with values converted for Redis compatibility.
    """

    new_data = {}
    for key, value in data.items():
        if isinstance(value, bool):
            new_data[key] = "true" if value else "false"
        elif isinstance(value, HttpUrl):
            new_data[key] = str(value)
        else:
            new_data[key] = value
    return new_data


def get_directory_size(path):
    """
    Calculate the total size of a directory.

    This function computes the total size of all files in a given directory,
    including the sizes of files in all its subdirectories. It does not follow
    symbolic links.

    Args:
        path (str): The path to the directory.

    Returns:
        int: The total size of the directory in bytes.
    """

    total_size = 0
    with os.scandir(path) as it:
        for entry in it:
            if entry.is_file(follow_symlinks=False):
                total_size += entry.stat().st_size
            elif entry.is_dir(follow_symlinks=False):
                total_size += get_directory_size(entry.path)
    return total_size


async def delete_redis_history(client: Redis):
    """
    Asynchronously deletes old download records from Redis.
    """
    now = int(time.time())

    keys = await client.keys(REDIS_DOWNLOADS.format(user="*", download_id="*"))
    
    keys_to_delete = []

    for key in keys:
        timestamp = await client.hget(key, "timestamp")

        if timestamp:
            timestamp = float(timestamp)
            if timestamp < now - 60 * 60 * 24:
                keys_to_delete.append(key)

    if keys_to_delete:
        await client.delete(*keys_to_delete)


async def periodic_cleanup(redis: Redis):
    """
    Periodically cleans up old download records from Redis.

    This function runs an infinite loop that calls `delete_redis_history`
    to remove outdated download records from Redis and then waits for
    an hour before repeating the process.

    Args:
        redis (Redis): The Redis client instance used to interact with
                       the Redis database.
    """

    while True:
        await delete_redis_history(redis)
        await asyncio.sleep(60 * 60)


def get_redis_instance(request: Request):
    """
    Returns the Redis client instance stored in the application state.

    Parameters
    ----------
    request : Request
        The current request object.

    Returns
    -------
    redis : Redis
        The Redis client instance.
    """
    return request.app.state.redis


def get_sio_instance(request: Request):
    """
    Returns the socketio server instance stored in the application state.

    Parameters
    ----------
    request : Request
        The current request object.

    Returns
    -------
    sio : socketio.Server
        The socketio server instance.
    """
    return request.app.state.sio

async def periodic_download_cleanup():
    """
    Periodically cleans up old download records from the file system.
    Deletes files in the TAST_DOWNLOAD_DIR that are older than 2 hours.
    """
    while True:
        now = time.time()
        try:
            for filename in os.listdir(TAST_DOWNLOAD_DIR):
                file_path = os.path.join(TAST_DOWNLOAD_DIR, filename)
                if os.path.isfile(file_path):
                    file_creation_time = os.path.getctime(file_path)
                    # Check if the file is older than 2 hours (1.5 * 60 * 60 seconds)
                    if now - file_creation_time > 1.5 * 60 * 60:
                        os.remove(file_path)
                        print(f"Deleted old file: {file_path}")
        except Exception as e:
            print(f"Error during periodic cleanup: {e}")

        await asyncio.sleep(30 * 60)
