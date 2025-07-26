import React, { useState, useCallback } from 'react';
import { Hero, Features } from '../Components/Common';
import MediaQualities from '../Components/Queue/MediaQualities';
import ThumbnailFeatures from '../Components/Thumbnail/ThumbnailFeatures';
import ThumbnailUseCases from '../Components/Thumbnail/ThumbnailUseCases';
import ThumbnailFaq from '../Components/Thumbnail/ThumbnailFaq';
import ThumbnailQuality from '../Components/Thumbnail/ThumbnailQuality';
import { fetchVideoInfo } from '../Socket/Utils';
import ThumbnailHowDownload from '../Components/Thumbnail/ThumbnailHowDownload';

const SIZES = [
  { label: 'Small', res: '120x90', key: 'default' },
  { label: 'Medium', res: '320x180', key: 'mqdefault' },
  { label: 'High Quality', res: '480x360', key: 'hqdefault' },
  { label: 'Standard', res: '640x480', key: 'sddefault' },
  { label: 'HD', res: '1280x720', key: 'maxresdefault' },
  { label: 'Full HD', res: '1920x1080', key: 'maxresdefault' },
];

function getVideoId(thumbnailUrl) {
  // Log the thumbnail URL for debugging
  console.log("thumbnailData.thumbnail:", thumbnailUrl);
  // Try the standard YouTube thumbnail pattern
  let match = thumbnailUrl && thumbnailUrl.match(/\/vi\/([^/]+)\//);
  if (match) {
    console.log("Extracted videoId (standard pattern):", match[1]);
    return match[1];
  }
  // Try to extract videoId from other possible patterns (e.g., .../vi_webp/VIDEO_ID/..., .../default.jpg?video_id=VIDEO_ID, etc.)
  match = thumbnailUrl && thumbnailUrl.match(/([a-zA-Z0-9_-]{11})/); // fallback: look for 11-char YouTube ID
  if (match) {
    console.log("Extracted videoId (fallback pattern):", match[1]);
    return match[1];
  }
  console.warn("Could not extract videoId from thumbnail URL:", thumbnailUrl);
  return null;
}

const Thumbnail = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailData, setThumbnailData] = useState(null);

  const handleLoadingChange = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  const handleUrlUpdate = async (url) => {
    setVideoUrl(url);
    setIsLoading(true);
    const data = await fetchVideoInfo(url);
    setThumbnailData(data);
    setIsLoading(false);
  };

  // Prepare the qualities array for MediaQualities
  let qualities = [];
  if (videoUrl && thumbnailData) {
    const videoId = getVideoId(thumbnailData.thumbnail);
    if (videoId) {
      qualities = SIZES.map(size => ({
        ...size,
        format: 'jpg',
        ext: 'jpg',
        quality: size.res,
        label: `${size.label} (${size.res})`,
        res: size.res,
        url: `https://i.ytimg.com/vi/${videoId}/${size.key}.jpg`,
      }));
    } else {
      console.warn("No videoId found, qualities will be empty.");
    }
  }

  // Custom download handler for thumbnails (force download)
  const handleThumbnailDownload = async (format) => {
    try {
      const response = await fetch(format.url, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${format.key}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL after download
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      alert('Failed to download image. Please try again.');
      console.error('Download error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#05051e] overflow-hidden">
      <div className="z-10 pt-16">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          <Hero
            onUrlUpdate={handleUrlUpdate}
            loading={isLoading}
            h1="Free YouTube Thumbnail Downloader Online"
            p="Download high-quality YouTube thumbnails in all sizes with Eazy-dl for free. No signups, no hassle, and no delays. Get HD thumbnails up to 1920x1080 instantly!"
            buttonLabel="Download"
          />
          {videoUrl && thumbnailData && (
            <MediaQualities
              videoUrl={videoUrl}
              qualities={qualities}
              downloadHandler={handleThumbnailDownload}
              title="Download thumbnail as:"
              displayData={thumbnailData}
            />
          )}
          <section className="sm:mt-40 mt-30 sm:mb-20 px-4 mx-auto max-w-6xl space-y-24">
            <Features />
            <ThumbnailQuality />

            <ThumbnailHowDownload />
            <ThumbnailFeatures />
            <ThumbnailUseCases />
            <ThumbnailFaq />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail; 