import React from 'react';

const SIZES = [
  { label: 'Small', res: '120x90', key: 'default', icon: '📱' },
  { label: 'Medium', res: '320x180', key: 'mqdefault', icon: '💻' },
  { label: 'High Quality', res: '480x360', key: 'hqdefault', icon: '🖥️', recommended: true },
  { label: 'Standard', res: '640x480', key: 'sddefault', icon: '📺' },
  { label: 'HD', res: '1280x720', key: 'maxresdefault', icon: '🎬' },
  { label: 'Full HD', res: '1920x1080', key: 'maxresdefault', icon: '✨' }, // YouTube uses maxresdefault for both 1280x720 and 1920x1080, fallback if not available
];

function getVideoId(thumbnailUrl) {
  // Typical thumbnail: https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg
  const match = thumbnailUrl && thumbnailUrl.match(/\/vi\/([^/]+)\//);
  return match ? match[1] : null;
}

const ThumbnailSizes = ({ videoUrl, thumbnailData }) => {
  if (!videoUrl || !thumbnailData) return null;
  const videoId = getVideoId(thumbnailData.thumbnail);
  if (!videoId) return null;

  // YouTube thumbnail URL pattern
  const getThumbUrl = (key) => `https://i.ytimg.com/vi/${videoId}/${key}.jpg`;

  return (
    <section className="sizes-section mb-20">
      <h2 className="text-3xl font-bold text-white text-center mb-10">Available Thumbnail Sizes</h2>
      <div className="sizes-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {SIZES.map((size, idx) => (
          <div key={size.key + idx} className={`size-card rounded-2xl p-6 bg-white/5 border border-white/10 shadow-lg text-center relative ${size.recommended ? 'recommended border-violet-500' : ''}`}>
            <div className="size-preview text-4xl mb-3">{size.icon}</div>
            <div className="size-title text-lg font-semibold text-white mb-1">{size.label}</div>
            <div className="size-resolution text-violet-400 mb-2">{size.res}</div>
            <img
              src={getThumbUrl(size.key)}
              alt={`${size.label} thumbnail`}
              className="mx-auto rounded-lg mb-3 border border-white/10"
              style={{ width: '80%', maxHeight: 120, objectFit: 'cover', background: '#222' }}
              onError={e => e.target.style.display = 'none'}
            />
            <a
              href={getThumbUrl(size.key)}
              download={`youtube-thumbnail-${videoId}-${size.key}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-5 py-2 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 transition-all"
            >
              Download
            </a>
            {size.recommended && (
              <div className="absolute top-2 right-2 bg-violet-500 text-white text-xs px-3 py-1 rounded-full">Most Popular</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThumbnailSizes; 