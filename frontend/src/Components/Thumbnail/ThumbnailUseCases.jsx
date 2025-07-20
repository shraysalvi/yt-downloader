import React from 'react';
import { motion } from 'framer-motion';

const useCases = [
  {
    title: 'Content Creators',
    description: 'Get inspiration for your own thumbnails or analyze successful designs from popular YouTube videos.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 3a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(70,216,255,0.15) 0%, rgba(70,100,255,0.15) 100%)"
  },
  {
    title: 'Marketing Research',
    description: 'Analyze competitor thumbnails and trending designs to improve your video marketing strategy.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v-2a4 4 0 014-4h14" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(107,9,255,0.15) 0%, rgba(187,9,255,0.15) 100%)"
  },
  {
    title: 'Educational Projects',
    description: 'Use thumbnails in presentations, research papers, or educational materials with proper attribution.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15l6-6 4 4 8-8" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(244,100,119,0.15) 0%, rgba(255,70,101,0.15) 100%)"
  },
  {
    title: 'Business Presentations',
    description: 'Include video thumbnails in business reports, case studies, or client presentations professionally.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="2" y="7" width="20" height="13" rx="2" strokeWidth={2} />
        <rect x="7" y="2" width="10" height="5" rx="1" strokeWidth={2} />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(70,216,255,0.15) 0%, rgba(70,100,255,0.15) 100%)"
  },
  {
    title: 'Video Production',
    description: 'Reference thumbnails for video editing, storyboarding, or creating video compilation projects.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11h8M8 15h4" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(107,9,255,0.15) 0%, rgba(187,9,255,0.15) 100%)"
  },
  {
    title: 'Social Media',
    description: 'Share video thumbnails on social platforms or use them in your social media content strategy.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, rgba(244,100,119,0.15) 0%, rgba(255,70,101,0.15) 100%)"
  },
];

const ThumbnailUseCases = () => (
  <section className="use-cases-section mb-20">
    <h2 className="text-3xl font-bold text-white text-center mb-10">Perfect For Every Use Case</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 use-cases-grid">
      {useCases.map((uc, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.2)" }}
          className="rounded-2xl overflow-hidden relative h-64 border border-white/5"
          style={{
            background: "linear-gradient(145deg, rgba(20,18,39,0.6) 0%, rgba(32,26,55,0.6) 100%)",
            boxShadow: "0 10px 20px -5px rgba(0,0,0,0.15)"
          }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(123,97,255,0.2) 0%, transparent 70%)" }}></div>

          <div className="p-8 h-full flex flex-col">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: uc.iconBg }}>
                {uc.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{uc.title}</h3>
            <p className="text-white/70 text-sm">
              {uc.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ThumbnailUseCases; 