import copy

from app.constants import AUDIO_FORMATS, VIDEO_FORMATS


def get_format(format: str, quality: str, category: str) -> str:
    """
    Returns format for download

    Args:
      format (str): format selected
      quality (str): quality selected

    Raises:
      Exception: unknown quality, unknown format

    Returns:
      dl_format: Formatted download string
    """
    if category=="audio" and format in AUDIO_FORMATS:
        # Audio quality needs to be set post-download, set in opts
        return f"bestaudio[ext={format}]/bestaudio/best"

    if category=="video" and format in VIDEO_FORMATS:
        if quality == "audio":
            return "bestaudio/best"
        # video {res} {vfmt} + audio {afmt} {res} {vfmt}
        vfmt, afmt = ("[ext=mp4]", "[ext=m4a]") if format == "mp4" else ("", "")
        vres = f"[height<={quality}]"
        vcombo = vres + vfmt
        return f"bestvideo{vcombo}+bestaudio{afmt}/best{vcombo}"

    raise Exception(f"Unkown format {format}")


def get_opts(format: str, quality: str, category: str, ytdl_opts: dict) -> dict:
    """
    Returns extra download options
    Mostly postprocessing options

    Args:
      format (str): format selected
      quality (str): quality of format selected (needed for some formats)
      ytdl_opts (dict): current options selected

    Returns:
      ytdl_opts: Extra options
    """

    opts = copy.deepcopy(ytdl_opts)

    postprocessors = []

    if category=="audio" and format in AUDIO_FORMATS:
        postprocessors.append(
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": format,
                "preferredquality": quality,
            }
        )

        # Audio formats without thumbnail
        if format not in ("wav") and "writethumbnail" not in opts:
            opts["writethumbnail"] = True
            postprocessors.append(
                {
                    "key": "FFmpegThumbnailsConvertor",
                    "format": "jpg",
                    "when": "before_dl",
                }
            )
            postprocessors.append({"key": "FFmpegMetadata"})
            postprocessors.append({"key": "EmbedThumbnail"})

    opts["postprocessors"] = postprocessors + (
        opts["postprocessors"] if "postprocessors" in opts else []
    )
    return opts

