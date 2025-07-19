import React from 'react';

const Faq = ({ title, faqs }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10 shadow-lg">
            <div className="text-violet-400 font-semibold mb-2">{faq.q}</div>
            <div className="text-white/70">{faq.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;