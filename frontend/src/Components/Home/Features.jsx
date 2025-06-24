import { motion } from 'framer-motion';

const Features = () => {
    return (
        <>
            <section >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className=" w-full rounded-3xl overflow-hidden border border-white/5"
                    style={{
                        background: "linear-gradient(125deg, rgba(20,17,39,0.7) 0%, rgba(32,24,58,0.7) 100%)",
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)"
                    }}
                >
                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none"
                        ></div>

                    <div className=" z-10 p-10 flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-2/3 pr-0 md:pr-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                                Download YouTube Videos in Stunning HD - It's Easy!
                            </h2>
                            <p className="text-white/80 mb-4 text-lg leading-relaxed">
                                Tired of losing access to your favorite YouTube videos? Our high quality YouTube video downloader makes saving any content you love super easy and lightning-fast. Whether you're hoarding educational tutorials, hilarious shorts, or those professional presentations you need for work, Eazy-dl keeps everything looking exactly like the original—no annoying watermarks or weird restrictions.
                            </p>
                            <p className="text-white/70 text-lg">
                                Ready to never lose a video again? Download YouTube videos in crisp 1080p quality with our simple yet powerful YouTube video downloader 1080p tool. Perfect for content creators who need offline backup libraries, students cramming for exams, or basically anyone who's ever thought "I wish I could save this for later." Just paste, click, and boom—you've got your video ready to watch anytime, anywhere.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* Glowing circle background */}
                                <div className="absolute w-36 h-36 rounded-full bg-purple-600/10 filter blur-xl"></div>

                                {/* YouTube icon */}
                                <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-700/80 to-fuchsia-800/80 flex items-center justify-center shadow-lg border border-white/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                    </svg>
                                </div>

                                {/* Decorative dots */}
                                <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-blue-400/40"></div>
                                <div className="absolute bottom-8 right-0 w-2 h-2 rounded-full bg-purple-400/40"></div>
                                <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-fuchsia-500/20"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default Features
