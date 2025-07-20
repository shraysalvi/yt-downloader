import React from 'react';
import Faq from '../Common/Faq';

const THUMBNAIL_FAQS = [
  { q: 'What thumbnail sizes can I download?', a: 'You can download thumbnails in 6 different sizes: 120x90, 320x180, 480x360, 640x480, 1280x720, and 1920x1080 pixels.' },
  { q: 'How fast is the thumbnail extraction?', a: 'Our service extracts thumbnails instantly. The process typically takes less than a second once you submit the URL.' },
  { q: 'Do you store downloaded thumbnails?', a: 'No, we don\'t store any thumbnails on our servers. All processing is done in real-time and files are served directly to you.' },
  { q: 'Can I use this on mobile devices?', a: 'Yes! Our thumbnail downloader works perfectly on all devices including smartphones, tablets, and desktop computers.' },
  { q: 'What image formats are supported?', a: 'YouTube thumbnails are provided in JPG format, which is the standard format used by YouTube for all video thumbnails.' },
  { q: 'Is there a limit on downloads?', a: 'No, you can download unlimited YouTube thumbnails for free without any restrictions or daily limits.' },
  { q: 'Is it legal to download thumbnails?', a: 'Downloading thumbnails for personal use, research, or analysis is generally acceptable. Always respect copyright and fair use guidelines.' },
  { q: 'Do I need to install software?', a: 'No software installation required! Our thumbnail downloader works entirely in your web browser across all platforms.' },
];

const ThumbnailFaq = () => (
  <Faq title="FAQ Related To YouTube Thumbnail Downloader" faqs={THUMBNAIL_FAQS} />
);

export default ThumbnailFaq; 