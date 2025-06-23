import { motion } from 'framer-motion'
import { useState } from 'react';
import toast from 'react-hot-toast';

// Moved the regex outside so both handlers can use it
const youtubeRegex = /^(https?:\/\/)?((www\.|m\.)?youtube\.com|youtu\.?be)\/.+$/;

// Helper function to clean the URL
function cleanYoutubeUrl(inputUrl) {
    try {
        const parsedUrl = new URL(inputUrl);
        
        // Handle shorts URLs: convert to standard watch URL
        if (parsedUrl.pathname.startsWith('/shorts/')) {
            const id = parsedUrl.pathname.split('/')[2];
            if (id) {
                return { url: `https://www.youtube.com/watch?v=${id}` };
            }
        }
        
        // If it's a pure playlist URL, return error
        if (parsedUrl.pathname === '/playlist') {
            return { error: 'Playlist URLs are not supported.' };
        }
        // For /watch URLs with extra playlist parameters, remove them
        if (parsedUrl.pathname === '/watch' && parsedUrl.searchParams.has('list')) {
            const videoId = parsedUrl.searchParams.get('v');
            if (videoId && videoId.length >= 11) {
                // Return only the necessary part
                return { url: `https://www.youtube.com/watch?v=${videoId.substring(0, 11)}` };
            }
        }
        // Otherwise, return the original URL
        return { url: inputUrl };
    } catch (e) {
        return { error: 'Invalid URL' };
    }
}

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

    // Helper function to trigger download if URL is valid and clean the URL if needed
    const triggerDownload = async (inputUrl) => {
        const trimmedUrl = inputUrl.trim();
        if (!trimmedUrl) {
            toast.error('Please enter a URL');
            return;
        }
        if (!youtubeRegex.test(trimmedUrl)) {
            toast.error('Invalid YouTube URL');
            return;
        }
        // Clean the URL
        const { url: cleanUrl, error } = cleanYoutubeUrl(trimmedUrl);
        if (error) {
            toast.error(error);
            return;
        }
        try {
            // Call backend only with the clean URL
            await onUrlUpdate(cleanUrl);
        } catch (error) {
            toast.error('Network error. Please try again.');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        triggerDownload(url);
    }

    return (
        <section className="px-4 mt-26">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight max-w-3xl mx-auto">
                    Free YouTube Video Downloader Online - Save Videos, Shorts in HD Quality
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
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const pasted = e.clipboardData.getData('text');
                                    setUrl(pasted);
                                    // Delay ensures the state is updated
                                    setTimeout(() => {
                                        if (youtubeRegex.test(pasted)) {
                                            triggerDownload(pasted);
                                        }
                                    }, 10);
                                }}
                                type="text"
                                className="w-full bg-white/5 text-white py-4 px-6 pr-6 sm:pr-40 rounded-full outline-none border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/50 transition-all"
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
