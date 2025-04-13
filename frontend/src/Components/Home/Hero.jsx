import { motion } from 'framer-motion'
import { useState } from 'react';
import toast from 'react-hot-toast';


// Reusable button component
const DownloadButton = ({ className = '', children, loading = false }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className={`relative rounded-full font-medium transition-all duration-300 bg-[linear-gradient(90deg,#46D8FF_0%,#6B09FF_50%,#F46477_100%)] text-white hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden ${className}`}
        disabled={loading}
    >
        <div className="relative flex items-center justify-center w-full h-full">
            {loading ? (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing</span>
                </div>
            ) : (
                <span>{children}</span>
            )}
        </div>
    </motion.button>
)

const Hero = ({ onUrlUpdate, loading = false }) => {
    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            toast.error('Please enter a URL');
            return;
        }

        // Validate against a basic YouTube URL regex
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (!youtubeRegex.test(trimmedUrl)) {
            toast.error('Invalid YouTube URL');
            return;
        }

        try {
            await onUrlUpdate(trimmedUrl);
        } catch (error) {
            // Show a network error toast if onUrlUpdate fails.
            toast.error('Network error. Please try again.');
        }
    }

    return (
        <section className="px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight max-w-3xl mx-auto">
                    YouTube Video Downloader - Save Videos & Shorts in HD Quality
                </h1>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                    Download any YouTube video or Shorts with Eazy-dl for free. No signups, no hassle, and no delays. Enjoy HD quality up to 1080p instantly!
                </p>
            </motion.div>

            <div className="mt-20">
                <div className="w-full max-w-3xl mx-auto">
                    <form className="relative flex flex-col sm:block" onSubmit={handleSubmit}>
                        <div className="relative transition-all backdrop-blur-xl rounded-full overflow-hidden">
                            <input
                                placeholder="YouTube URL here..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                type="text"
                                className=" w-full  bg-white/5 text-white py-4 px-6 pr-6 sm:pr-40 rounded-full outline-none border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/50 transition-all"
                            />
                            <div className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2">
                                <DownloadButton className="px-6 py-3" loading={loading}>
                                    Download
                                </DownloadButton>
                            </div>
                        </div>
                        <div className="sm:hidden mt-3">
                            <DownloadButton className="w-full py-3" loading={loading}>
                                Download
                            </DownloadButton>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default Hero;