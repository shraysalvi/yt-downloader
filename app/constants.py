import json
import os

AUDIO_QUALITIES = {
   "high": {"min_bitrate": 192, "label": "High Quality (192kbps)"},
   "medium": {"min_bitrate": 128, "label": "Medium Quality (128kbps)"},
   "low": {"min_bitrate": 64, "label": "Low Quality (64kbps)"}
}

REDIS_DOWNLOADS = "{user}/download/{download_id}"

AUDIO_FORMATS = ["m4a", "mp3", "opus", "wav", "flac"]

VIDEO_FORMATS = ["mp4", "webm", "mkv", "mov"]

YTDL_OPTIONS = json.loads(os.getenv("YTDL_OPTIONS", "{}"))

MAX_VIDEO_SIZE = float(os.getenv("MAX_VIDEO_SIZE", 4))

TAST_DOWNLOAD_DIR = DOWNLOAD_URL = os.getenv("DOWNLOAD_URL", "/download")

DOWNLOAD_DIRECTORY=os.getenv("DOWNLOAD_DIRECTORY", "Downloads")

MAX_STORAGE = float(os.getenv("MAX_STORAGE", 400))
