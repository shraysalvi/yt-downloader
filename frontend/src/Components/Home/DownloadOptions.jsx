import { motion } from 'framer-motion';

const DownloadOptions = () => {
    return (
        <>
            {/* Download Options Section */}
            <section >
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Download Options for YouTube Videos & Shorts Online</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Option 1 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="rounded-2xl overflow-hidden relative border border-white/5"
                        style={{
                            background: "linear-gradient(135deg, rgba(22,20,42,0.6) 0%, rgba(35,28,60,0.6) 100%)",
                            boxShadow: "0 10px 25px -10px rgba(0,0,0,0.2)"
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
                            style={{ background: "radial-gradient(circle at top right, rgba(123,97,255,0.2) 0%, transparent 70%)" }}></div>

                        <div className="p-8 relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-full md:w-1/4 flex justify-center">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                                    style={{ background: "linear-gradient(135deg, rgba(70,216,255,0.15) 0%, rgba(70,100,255,0.15) 100%)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-blue-400"></div>
                                </div>
                            </div>
                            <div className="w-full md:w-3/4 text-center md:text-left">
                                <h3 className="text-xl font-semibold text-white mb-3">YouTube Video Downloader</h3>
                                <p className="text-white/70">
                                    Grab your favorite full-length videos in resolutions ranging from 360p to 1080p. Our tool ensures superb quality every time.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Option 2 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="rounded-2xl overflow-hidden relative border border-white/5"
                        style={{
                            background: "linear-gradient(135deg, rgba(22,20,42,0.6) 0%, rgba(35,28,60,0.6) 100%)",
                            boxShadow: "0 10px 25px -10px rgba(0,0,0,0.2)"
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
                            style={{ background: "radial-gradient(circle at top right, rgba(123,97,255,0.2) 0%, transparent 70%)" }}></div>

                        <div className="p-8 relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-full md:w-1/4 flex justify-center">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                                    style={{ background: "linear-gradient(135deg, rgba(107,9,255,0.15) 0%, rgba(187,9,255,0.15) 100%)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                    </svg>
                                    <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-purple-400"></div>
                                </div>
                            </div>
                            <div className="w-full md:w-3/4 text-center md:text-left">
                                <h3 className="text-xl font-semibold text-white mb-3">YouTube Shorts Downloader</h3>
                                <p className="text-white/70">
                                    Say goodbye to tricky conversions! Eazy-dl handles YouTube Shorts effortlessly, delivering sharp visuals flawlessly.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </>
    )
}

export default DownloadOptions