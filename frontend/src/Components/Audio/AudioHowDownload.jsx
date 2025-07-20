import HowDownload from '../Common/HowDownload';

const audioSteps = [
  {
    number: 1,
    title: 'Copy YouTube URL',
    desc: "Find your favorite video on YouTube and copy the URL from the browser's address bar, or hit 'Share' to get the link.",
  },
  {
    number: 2,
    title: 'Paste into Eazy-dl',
    desc: 'Head over to Eazy-dl and paste the link into the input field, then click "Generate" to process audio.',
  },
  {
    number: 3,
    title: 'Download Audio',
    desc: 'Choose your preferred audio quality and format, then download your MP3 file instantly to your device.',
  },
];

const AudioHowDownload = () => (
  <HowDownload
    steps={audioSteps}
    title="How to Download YouTube Audio in 3 Quick Steps"
    description="Follow these three easy steps to convert and download audio from YouTube. It's really that simple."
  />
);

export default AudioHowDownload; 