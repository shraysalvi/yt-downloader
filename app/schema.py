from typing import List, Literal, Optional
from urllib.parse import urlparse, parse_qs
from pydantic import BaseModel, HttpUrl, field_validator


class BaseFormat(BaseModel):
   format: str
   quality: int
   display: Optional[str]

   def __eq__(self, other):
      if isinstance(other, BaseFormat):
         return (self.format == other.format and 
                  self.quality == other.quality and 
                  self.display == other.display)
      return False

   def __hash__(self):
      return hash((self.format, self.quality, self.display))

class VideoFormats(BaseModel):
   video: List[BaseFormat]
   audio: List[BaseFormat]

   def __init__(self, **data):
      super().__init__(**data)
      self.video.sort(key=lambda x: x.quality)
      self.audio.sort(key=lambda x: x.quality)

class VideoInfo(BaseModel):
   title: str
   duration: str
   thumbnail: str
   formats: VideoFormats
   description: Optional[str] = None

class VideoRequest(BaseModel):
    url: HttpUrl

    @field_validator('url')
    def validate_youtube_url(cls, v: HttpUrl) -> HttpUrl:
        if 'youtube.com' not in v.host and 'youtu.be' not in v.host:
            raise ValueError('URL must be a YouTube link.')

        parsed_url = urlparse(str(v))
        query_params = parse_qs(parsed_url.query)
        if 'list' in query_params:
            raise ValueError('URL must be a single video link, not a playlist.')

        return v

class DownloadRequest(VideoRequest):
    quality: int
    format: str
    category: Literal['audio', 'video']

