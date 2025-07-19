import Faq from '../Common/Faq';

const homeFaqs = [
  { q: 'How can I download YouTube videos without an app?', a: 'Just use Eazy-dl! Paste the video link into our site, select the quality, and download straight to your browser. No installations required.' },
  { q: 'Is Eazy-dl YouTube Video Downloader ad-free?', a: 'Absolutely! Eazy-dl offers a clean and safe experience without annoying pop-ups or shady redirects.' },
  { q: 'How do I save videos to my phone gallery?', a: 'On Android, the video will appear directly in your gallery. For iPhones, check your Downloads folder and move the file to Photos if needed.' },
  { q: 'Can I download videos without watermarks?', a: 'Always. Eazy-dl never adds watermarks, ensuring your videos stay exactly as they are on YouTube.' },
  { q: 'Is it legal to use YouTube downloaders?', a: 'For personal, private use, downloading is generally fine. Just avoid sharing or using copyrighted content commercially without permission.' },
  { q: 'Can I download YouTube Shorts?', a: 'You bet! Just paste the YouTube Shorts link, pick your quality, and grab the video seamlessly.' },
  { q: 'What makes Eazy-dl the fastest downloader?', a: 'Our advanced servers process videos instantly, giving you faster downloads than other tools on the web.' },
];

const HomeFaq = () => (
  <Faq title="FAQ Related To YouTube Video Downloader" faqs={homeFaqs} />
);

export default HomeFaq; 