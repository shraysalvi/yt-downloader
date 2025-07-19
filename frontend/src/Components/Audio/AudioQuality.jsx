import React from 'react';

const qualities = [
  {
    title: 'Standard Quality',
    bitrate: '128 kbps',
    description: 'Good for casual listening and smaller file sizes',
  },
  {
    title: 'High Quality',
    bitrate: '192 kbps',
    description: 'Perfect balance of quality and file size',
    recommended: true,
  },
  {
    title: 'Premium Quality',
    bitrate: '320 kbps',
    description: 'Maximum quality for audiophiles',
  },
];

const AudioQuality = () => (
  <section className="quality-section">
    <h2 className="text-center text-3xl font-bold mb-12 text-white">Choose Your Audio Quality</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 quality-grid">
      {qualities.map((q, idx) => (
        <div
          key={idx}
          className={`quality-card bg-[#110f29] p-8 rounded-xl text-center border-2 transition-all ${q.recommended ? 'border-[#7e21ff] relative' : 'border-transparent'} hover:border-[#7e21ff] hover:-translate-y-1`}
        >
          {q.recommended && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7e21ff] text-white px-4 py-1 rounded-full text-xs">Recommended</span>
          )}
          <div className="quality-title text-lg font-semibold mb-2 text-gray-200">{q.title}</div>
          <div className="quality-bitrate text-[#7e21ff] text-base mb-2">{q.bitrate}</div>
          <div className="quality-description text-gray-400">{q.description}</div>
        </div>
      ))}
    </div>
  </section>
);

export default AudioQuality; 