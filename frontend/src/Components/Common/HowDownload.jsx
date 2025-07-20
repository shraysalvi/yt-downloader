import { motion } from 'framer-motion';
import React from 'react';

const STEP_STYLES = [
  {
    bg: 'linear-gradient(135deg, rgba(22,20,42,0.6) 0%, rgba(35,28,60,0.6) 100%)',
    overlay: 'radial-gradient(circle, rgba(90,87,255,0.3) 0%, transparent 70%)',
    circleBg: 'linear-gradient(135deg, #46D8FF 0%, #4664FF 100%)',
    circleShadow: '0 10px 20px -5px rgba(70,100,255,0.3)',
    border: 'from-blue-400/30 to-blue-600/30',
  },
  {
    bg: 'linear-gradient(135deg, rgba(28,19,48,0.6) 0%, rgba(42,27,70,0.6) 100%)',
    overlay: 'radial-gradient(circle, rgba(148,87,235,0.3) 0%, transparent 70%)',
    circleBg: 'linear-gradient(135deg, #6B09FF 0%, #BB09FF 100%)',
    circleShadow: '0 10px 20px -5px rgba(107,9,255,0.3)',
    border: 'from-purple-500/30 to-purple-700/30',
  },
  {
    bg: 'linear-gradient(135deg, rgba(36,22,60,0.6) 0%, rgba(48,28,70,0.6) 100%)',
    overlay: 'radial-gradient(circle, rgba(244,100,119,0.3) 0%, transparent 70%)',
    circleBg: 'linear-gradient(135deg, #F46477 0%, #FF4665 100%)',
    circleShadow: '0 10px 20px -5px rgba(244,100,119,0.3)',
    border: 'from-pink-500/30 to-red-500/30',
  },
];

const HowDownload = ({ steps, title, description }) => {
  if (!steps || !title || !description) {
    throw new Error('HowDownload: steps, title, and description props are required.');
  }
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">{title}</h2>
      <p className="text-white/70 text-center mb-14 max-w-3xl mx-auto text-lg">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const style = STEP_STYLES[idx] || STEP_STYLES[0];
          return (
            <motion.div
              key={step.number}
              whileHover={{ y: -8, boxShadow: style.circleShadow.replace('20px', '40px').replace('10px', '20px').replace('-5px', '-15px') }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden relative border border-white/5"
              style={{
                background: style.bg,
                boxShadow: '0 10px 25px -10px rgba(0,0,0,0.2)',
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none" style={{ background: style.overlay }}></div>
              <div className="p-8 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/5"
                    style={{ background: style.circleBg, boxShadow: style.circleShadow }}>
                    <span className="text-white text-xl font-bold">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-4">{step.title}</h3>
                <p className="text-white/70 text-center">{step.desc}</p>
              </div>
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${style.border}`}></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowDownload;