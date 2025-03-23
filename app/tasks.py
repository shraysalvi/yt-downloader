import json
import logging
import os
import time
import redis
import yt_dlp
from app.constants import REDIS_DOWNLOADS, YTDL_OPTIONS, TAST_DOWNLOAD_DIR
from app.dl_formats import get_format, get_opts
from celery import Celery

logger = logging.getLogger(__name__)

celery_app = Celery(
    "tasks",
    broker=os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

# ✅ Persistent Redis Client (Sync)
REDIS_CLIENT = redis.from_url(
    os.environ.get("REDIS_URL", "redis://localhost:6379/1"),
    decode_responses=True
)

def update_status(key, status_data):
    """
    Updates download status in Redis.
    """
    try:
        REDIS_CLIENT.hset(key, mapping={k: str(v) for k, v in status_data.items()})
    except Exception as e:
        logger.error(f"Redis update failed: {e}")

def publish_progress(channel, message):
    """
    Publishes progress updates via Redis Pub/Sub.
    """
    try:
        REDIS_CLIENT.publish(channel, json.dumps(message))
    except Exception as e:
        logger.error(f"Redis publish failed: {e}")

@celery_app.task(bind=True)
def download_video(self, download_id, url, quality, format, user, category):
    """
    Celery task to download a video using yt_dlp.
    Uses a persistent Redis connection to store progress.
    """
    key = REDIS_DOWNLOADS.format(user=user, download_id=download_id)
    update_status(key, {"status": "starting"})

    dl_format = get_format(format, quality, category)
    opts = get_opts(format, quality, category, YTDL_OPTIONS)

    opts.update({
        "quiet": True,
        "no_color": True,
        "paths": {"home": TAST_DOWNLOAD_DIR, "temp": TAST_DOWNLOAD_DIR + "/tmp"},
        "outtmpl": {
            "default": "%(title)s - %(format_id)s.%(ext)s",
            "chapter": "%(title)s - %(section_number)s %(section_title)s - %(format_id)s.%(ext)s"
        },
        "format": dl_format,
    })

    def progress_hook(d):
        """
        Progress callback function to send updates via Redis.
        """
        publish_progress("download_progress", {"id": download_id, **d})

    opts["progress_hooks"] = [progress_hook]

    try:
        with yt_dlp.YoutubeDL(opts) as ytdlp:
            info_dict = ytdlp.extract_info(url)
            final_file = ytdlp.prepare_filename(info_dict)
            data = {"status": "completed", "filesize": os.path.getsize(final_file), "file": final_file}
            update_status(key, data)
            data.update({"id": download_id})
            publish_progress("download_complete", data)
    except Exception as e:
        logger.error(f"Error downloading {url}: {e}")
        update_status(key, {"status": "error", "msg": str(e)})

