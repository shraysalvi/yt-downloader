import Faq from '../Common/Faq';

const audioFaqs = [
  { q: 'Is it legal to convert YouTube videos to MP3?', a: 'Converting YouTube videos for personal use is generally acceptable. However, downloading copyrighted content without permission may violate copyright laws.' },
  { q: 'How fast is the conversion process?', a: 'Our converter typically processes videos in seconds, depending on the video length and your internet connection speed.' },
  { q: 'Do you store my downloaded files?', a: 'No, we don\'t store any files on our servers. All conversions are processed temporarily and files are deleted immediately after download.' },
  { q: 'Can I use this on mobile devices?', a: 'Yes! Our converter works perfectly on all devices including smartphones, tablets, and desktop computers.' },
  { q: 'What audio formats do you support?', a: 'We primarily support MP3 format, which is compatible with virtually all devices and music players.' },
  { q: 'Is there a limit on conversions?', a: 'No, you can convert unlimited YouTube videos to MP3 for free without any restrictions or daily limits.' },
];

const AudioFaq = () => (
  <Faq title="FAQ Related To YouTube to MP3 Converter" faqs={audioFaqs} />
);

export default AudioFaq; 