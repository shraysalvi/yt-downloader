import React from 'react';

const steps = [
  {
    icon: '🔗',
    title: 'Copy YouTube URL',
    description: "Find your favorite video on YouTube and copy the URL from the browser's address bar",
  },
  {
    icon: '⚡',
    title: 'Paste & Convert',
    description: 'Paste the link into Eazy-dl and click "Convert" to start processing',
    recommended: true,
  },
  {
    icon: '📥',
    title: 'Download MP3',
    description: 'Choose your preferred audio quality and download your MP3 file instantly',
  },
];

const AudioSteps = () => (
  <section className="steps-section">
    <h2 className="text-center text-3xl font-bold mb-12 text-white">How to Convert YouTube Videos to MP3 in 3 Quick Steps</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 steps-grid">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`step-card bg-[#110f29] p-8 rounded-xl text-center border-2 transition-all ${step.recommended ? 'border-[#7e21ff] relative' : 'border-transparent'} hover:border-[#7e21ff] hover:-translate-y-1`}
        >
          {step.recommended && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7e21ff] text-white px-4 py-1 rounded-full text-xs">Most Popular</span>
          )}
          <div className="step-icon text-4xl mb-4">{step.icon}</div>
          <div className="step-title text-lg font-semibold mb-2 text-gray-200">{step.title}</div>
          <div className="step-description text-gray-400">{step.description}</div>
        </div>
      ))}
    </div>
  </section>
);

export default AudioSteps; 