import asyncio
import math
import time
import uuid
import os
import socketio
import yt_dlp
from aioredis import Redis
from app.constants import (AUDIO_FORMATS, MAX_VIDEO_SIZE, REDIS_DOWNLOADS,
                           VIDEO_FORMATS, MAX_STORAGE, TAST_DOWNLOAD_DIR)
from app.schema import (BaseFormat, DownloadRequest, VideoFormats, VideoInfo,
                        VideoRequest)
from app.tasks import celery_app, download_video
from app.utils import (get_directory_size, get_audio_quality_label,
                       get_current_user, get_redis_instance, get_sio_instance,
                       time_format_seconds)
from celery.result import AsyncResult
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(prefix="/api/video", tags=["video"])


async def extract_video_info(url: str):
    def sync_extract():
        with yt_dlp.YoutubeDL({
            "quiet": True, "no_color": True,
            "skip_download": True, "no_warnings": True
        }) as ytdlp:
            return ytdlp.extract_info(url, download=False)
    return await asyncio.to_thread(sync_extract)


@router.post("/info", response_model=VideoInfo)
async def get_video_info(video: VideoRequest):
    try:
        info = await extract_video_info(str(video.url))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Extraction failed: {e}")

    audio_formats = set()
    video_formats = set()

    for fmt in info.get("formats", []):
        filesize = fmt.get("filesize") or fmt.get("filesize_approx") or 0
        if not fmt.get("format_id") or not filesize < MAX_VIDEO_SIZE * 1024 ** 3:
            continue
        
        if fmt.get("acodec") != "none" and fmt.get("vcodec") == "none" and (ext:= fmt.get("ext")) in AUDIO_FORMATS:
            # Audio format
            bitrate = fmt.get("abr")
            audio_formats.add(BaseFormat(
                format=ext,
                quality=f"{math.ceil(bitrate)}",
                display=get_audio_quality_label(bitrate)
            ))

        elif fmt.get("vcodec") != "none" and (qual := fmt.get("height", 0)) and 360 <= qual <= 1080 and (ext:= fmt.get("ext")) in VIDEO_FORMATS:
            # Video format
            video_formats.add(BaseFormat(
                format=ext,
                quality=qual,
                display=f"{fmt.get('width', 'unknown')}x{fmt.get('height', 'unknown')}",
            ))

    return VideoInfo(
        title=info.get("title", "Unknown Title"),
        duration=time_format_seconds(info.get("duration", 0)),
        thumbnail=info.get("thumbnail", "/static/default/thumbnail.png"),
        description=info.get("description", ""),
        formats=VideoFormats(video=list(video_formats), audio=list(audio_formats))
    )


@router.post("/add")
async def add_download(
    request: DownloadRequest, 
    user: str = Depends(get_current_user),
    redis: Redis=Depends(get_redis_instance),
    sio: socketio.AsyncServer = Depends(get_sio_instance)
):
    if get_directory_size(TAST_DOWNLOAD_DIR) > MAX_STORAGE * 1024 ** 3:
        raise HTTPException(status_code=400, detail="Server Busy.")

    download_id = str(uuid.uuid4())
    redis_key = REDIS_DOWNLOADS.format(user=user, download_id=download_id)

    download_data = {
        "id": download_id, 
        "status": "pending", 
        "timestamp": int(time.time()),
        "url": str(request.url),
        "quality": request.quality,
        "format": request.format,
        "category": request.category
    }

    await redis.hset(redis_key, mapping=download_data)

    task = download_video.delay(
        download_id=download_id,
        url=str(request.url),
        quality=request.quality,
        format=request.format,
        user=user,
        category=request.category,
    )

    await redis.hset(redis_key, mapping={"status": "queued", "task_id": task.id})
    download_data.update({"task_id": task.id, "status": "queued"})
    await sio.emit("download_added", download_data)

    return {"status": "ok", "download_id": download_id, "task_id": task.id}


@router.post("/delete")
async def delete_download(
    data: dict,
    user: str = Depends(get_current_user), 
    redis=Depends(get_redis_instance),
    sio=Depends(get_sio_instance)
):
    """
    Deletes finished or failed downloads from history.
    """
    ids = data.get("ids", [])
    if not ids:
        raise HTTPException(status_code=400, detail="No download IDs provided.")

    deleted_count = 0
    for download_id in ids:
        key = REDIS_DOWNLOADS.format(user=user, download_id=download_id)
        if await redis.exists(key):
            status = await redis.hget(key, "status")
            if status in ["finished", "error", "canceled"]:
                await redis.delete(key)
                await sio.emit("download_deleted", {"id": download_id})
                deleted_count += 1

    return {"status": "ok", "deleted": deleted_count}


@router.get("/history")
async def history(
        user: str = Depends(get_current_user),
        redis=Depends(get_redis_instance),
    ):
    """
    Returns a list of downloads that the user has made in the past.

    This only returns downloads that have finished or failed. Downloads
    that are queued or in progress are not shown in the history.
    """
    keys = await redis.keys(REDIS_DOWNLOADS.format(user=user, download_id="*"))
    downloads = []
    for key in keys:
        data = await redis.hgetall(key)
        download = {k: v for k, v in data.items()}
        downloads.append(download)
    return {"downloads": downloads}


@router.post("/cancel")
async def cancel_download(
    data: dict,
    user: str = Depends(get_current_user),
    redis=Depends(get_redis_instance),
):    
    """
    Cancel a running download.

    Args:
        data: dict containing download_id and task_id.

    Returns:
        dict with status and message.

    Raises:
        HTTPException: If download_id or task_id are missing, or if the task is in a bad state.
    """
    download_id = data.get("download_id")
    task_id = data.get("task_id")

    if not download_id or not task_id:
        raise HTTPException(status_code=400, detail="Missing download_id or task_id")

    try:
        result = AsyncResult(task_id, app=celery_app)
        if result.state in ["SUCCESS", "FAILURE", "REVOKED"]:
            raise HTTPException(status_code=400, detail=f"Task {task_id} is already {result.state.lower()}")

        result.revoke(terminate=True)

        key = REDIS_DOWNLOADS.format(user=user, download_id=download_id)
        if await redis.exists(key):
            await redis.delete(key)

        return {"status": "ok", "message": f"Download {download_id} canceled"}

    except HTTPException as http_err:
        raise http_err

    except Exception as e:
        error_message = f"Error canceling download {download_id}: {str(e)}"
        return {"status": "error", "message": error_message}
