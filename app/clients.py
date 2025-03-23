import os

import socketio
from aioredis import Redis, from_url


async def get_redis() -> Redis:
    """
    Return a Redis client instance.

    This function is a coroutine that returns a Redis client instance connected to
    the redis instance specified in the REDIS_URL environment variable. If no
    REDIS_URL is specified, it defaults to a local redis instance on port 6379,
    database 1.

    :rtype: aioredis.Redis
    """
    return await from_url(
        os.environ.get("REDIS_URL", "redis://localhost:6379/1"),
        decode_responses=True
    )

SOCKET_CLIENT = socketio.AsyncServer(
        async_mode='asgi',
        cors_allowed_origins='*',
        engineio_logger=False
    )
