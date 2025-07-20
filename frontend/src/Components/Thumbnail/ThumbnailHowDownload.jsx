import HowDownload from '../Common/HowDownload';

const thumbnailSteps = [
  {
    number: 1,
    title: 'Copy YouTube URL',
    desc: "Find your favorite video on YouTube and copy the URL from the browser's address bar, or hit 'Share' to get the link.",
  },
  {
    number: 2,
    title: 'Paste into Eazy-dl',
    desc: 'Head over to Eazy-dl and paste the link into the input field, then click "Generate" to process thumbnails.',
  },
  {
    number: 3,
    title: 'Download Thumbnail',
    desc: 'Choose your preferred thumbnail size and quality, then download your image file instantly to your device.',
  },
];

const ThumbnailHowDownload = () => (
  <HowDownload
    steps={thumbnailSteps}
    title="How to Download YouTube Thumbnails in 3 Quick Steps"
    description="Follow these three easy steps to download thumbnails from YouTube. It's really that simple."
  />
);

export default ThumbnailHowDownload; 