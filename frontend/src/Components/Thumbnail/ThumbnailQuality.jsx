import React from 'react';

const sizes = [
  {
    title: 'Small',
    resolution: '120 x 90',
    description: 'Perfect for mobile apps and small displays',
    icon: '📱',
  },
  {
    title: 'Medium',
    resolution: '320 x 180',
    description: 'Great for web thumbnails and previews',
    icon: '💻',
  },
  {
    title: 'High Quality',
    resolution: '480 x 360',
    description: 'Ideal balance of quality and file size',
    icon: '🖥️',
    recommended: true,
  },
  {
    title: 'Standard',
    resolution: '640 x 480',
    description: 'Standard definition for most uses',
    icon: '📺',
  },
  {
    title: 'HD',
    resolution: '1280 x 720',
    description: 'High definition for professional use',
    icon: '🎬',
  },
  {
    title: 'Full HD',
    resolution: '1920 x 1080',
    description: 'Maximum quality for premium content',
    icon: '✨',
  },
];

const ThumbnailQuality = () => (
  <section className="quality-section">
    <h2 className="text-center text-3xl font-bold mb-12 text-white">Choose Your Thumbnail Size</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 quality-grid">
      {sizes.map((size, idx) => (
        <div
          key={idx}
          className={`quality-card bg-[#110f29] p-8 rounded-xl text-center border-2 transition-all ${size.recommended ? 'border-[#7e21ff] relative' : 'border-transparent'} hover:border-[#7e21ff] hover:-translate-y-1`}
        >
          {size.recommended && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7e21ff] text-white px-4 py-1 rounded-full text-xs">Recommended</span>
          )}
          <div className="text-4xl mb-2">{size.icon}</div>
          <div className="quality-title text-lg font-semibold mb-2 text-gray-200">{size.title}</div>
          <div className="quality-bitrate text-[#7e21ff] text-base mb-2">{size.resolution}</div>
          <div className="quality-description text-gray-400">{size.description}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ThumbnailQuality; 