import { motion } from 'framer-motion';


const HowDownload = () => {
    return (
        <>
            {/* How to Download Section - Hollow cards with border */}

            <section >
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">How to Download YouTube Videos or Shorts in 3 Quick Steps </h2>
                <p className="text-white/70 text-center mb-14 max-w-3xl mx-auto text-lg">
                    Follow these three easy steps to download videos, reels, and audio from YouTube. It's really that simple.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Step 1 */}
                    <motion.div
                        whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(70, 100, 255, 0.15)" }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl overflow-hidden relative border border-white/5"
                        style={{
                            background: "linear-gradient(135deg, rgba(22,20,42,0.6) 0%, rgba(35,28,60,0.6) 100%)",
                            boxShadow: "0 10px 25px -10px rgba(0,0,0,0.2)"
                        }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(90,87,255,0.3) 0%, transparent 70%)" }}></div>

                        <div className="p-8 relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/5"
                                    style={{
                                        background: "linear-gradient(135deg, #46D8FF 0%, #4664FF 100%)",
                                        boxShadow: "0 10px 20px -5px rgba(70,100,255,0.3)"
                                    }}>
                                    <span className="text-white text-xl font-bold">1</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-4"> Copy the YouTube URL</h3>
                            <p className="text-white/70 text-center">
                            Find your favorite video or Short on YouTube, copy the link from your browser's address bar, or hit "Share" to grab it.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400/30 to-blue-600/30"></div>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                        whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(107, 9, 255, 0.15)" }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl overflow-hidden relative border border-white/5"
                        style={{
                            background: "linear-gradient(135deg, rgba(28,19,48,0.6) 0%, rgba(42,27,70,0.6) 100%)",
                            boxShadow: "0 10px 25px -10px rgba(0,0,0,0.2)"
                        }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(148,87,235,0.3) 0%, transparent 70%)" }}></div>

                        <div className="p-8 relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/5"
                                    style={{
                                        background: "linear-gradient(135deg, #6B09FF 0%, #BB09FF 100%)",
                                        boxShadow: "0 10px 20px -5px rgba(107,9,255,0.3)"
                                    }}>
                                    <span className="text-white text-xl font-bold">2</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-4">Paste It into Eazy-dl </h3>
                            <p className="text-white/70 text-center">
                            Head over to Eazy-dl, paste that link into the input box, and hit "Download."
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/30 to-purple-700/30"></div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                        whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(244, 100, 119, 0.15)" }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl overflow-hidden relative border border-white/5"
                        style={{
                            background: "linear-gradient(135deg, rgba(36,22,60,0.6) 0%, rgba(48,28,70,0.6) 100%)",
                            boxShadow: "0 10px 25px -10px rgba(0,0,0,0.2)"
                        }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(244,100,119,0.3) 0%, transparent 70%)" }}></div>

                        <div className="p-8 relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/5"
                                    style={{
                                        background: "linear-gradient(135deg, #F46477 0%, #FF4665 100%)",
                                        boxShadow: "0 10px 20px -5px rgba(244,100,119,0.3)"
                                    }}>
                                    <span className="text-white text-xl font-bold">3</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-4">Save and Enjoy! </h3>
                            <p className="text-white/70 text-center">
                            Choose your format and video quality, click download, and Hurray! Your video is now saved to your device.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500/30 to-red-500/30"></div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default HowDownload