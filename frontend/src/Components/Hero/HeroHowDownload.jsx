import HowDownload from '../Common/HowDownload';

const homeSteps = [
  {
    number: 1,
    title: 'Copy the YouTube URL',
    desc: "Find your favorite video or Short on YouTube, copy the link from your browser's address bar, or hit 'Share' to grab it.",
  },
  {
    number: 2,
    title: 'Paste It into Eazy-dl',
    desc: 'Head over to Eazy-dl, paste that link into the input box, and hit "Download."',
  },
  {
    number: 3,
    title: 'Save and Enjoy!',
    desc: 'Choose your format and video quality, click download, and Hurray! Your video is now saved to your device.',
  },
];

const HeroHowDownload = () => (
  <HowDownload
    steps={homeSteps}
    title="How to Download YouTube Videos or Shorts in 3 Quick Steps"
    description="Follow these three easy steps to download videos, reels, and audio from YouTube. It's really that simple."
  />
);

export default HeroHowDownload; 