import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Lightning Fast Processing',
    description: 'Extract YouTube thumbnails in seconds with our optimized servers and advanced algorithms for instant results.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(70,216,255,0.15) 0%, rgba(70,100,255,0.15) 100%)"
  },
  {
    title: 'Secure & Private',
    description: "Your downloads are completely private. We don't store any files or track your activity for maximum security.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(107,9,255,0.15) 0%, rgba(187,9,255,0.15) 100%)"
  },
  {
    title: 'All Sizes Available',
    description: 'Download thumbnails in 6 different sizes, from 120x90 to Full HD 1920x1080 for any use case.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15l6-6 4 4 8-8" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(244,100,119,0.15) 0%, rgba(255,70,101,0.15) 100%)"
  },
  {
    title: 'All Device Compatible',
    description: 'Works perfectly on desktop, mobile, and tablet. Download thumbnails on any device without software installation.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="2" y="7" width="20" height="13" rx="2" strokeWidth={2} />
        <rect x="7" y="2" width="10" height="5" rx="1" strokeWidth={2} />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(70,216,255,0.15) 0%, rgba(70,100,255,0.15) 100%)"
  },
  {
    title: 'Simple Interface',
    description: 'Clean, intuitive design makes downloading YouTube thumbnails effortless with just a few clicks.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11h8M8 15h4" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(107,9,255,0.15) 0%, rgba(187,9,255,0.15) 100%)"
  },
  {
    title: 'Completely Free',
    description: 'No subscription fees, no hidden costs. Download unlimited YouTube thumbnails absolutely free forever.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(244,100,119,0.15) 0%, rgba(255,70,101,0.15) 100%)"
  },
];

const ThumbnailFeatures = () => (
  <section className="features-section">
    <h2 className="text-center text-3xl font-bold mb-4 text-white">Why Eazy-dl is the Best YouTube Thumbnail Downloader in 2025 ✨</h2>
    <p className="text-center text-gray-400 mb-10">Experience the fastest and most reliable YouTube thumbnail extraction service</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 features-grid">
      {features.map((f, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.2)" }}
          className="rounded-2xl overflow-hidden relative h-64 border border-white/5"
          style={{
            background: "linear-gradient(145deg, rgba(20,18,39,0.6) 0%, rgba(32,26,55,0.6) 100%)",
            boxShadow: "0 10px 20px -5px rgba(0,0,0,0.15)"
          }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(123,97,255,0.2) 0%, transparent 70%)" }}></div>

          <div className="p-8 h-full flex flex-col">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: f.iconBg }}>
                {f.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
            <p className="text-white/70 text-sm">
              {f.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ThumbnailFeatures; 