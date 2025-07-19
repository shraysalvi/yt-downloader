import { motion } from 'framer-motion';

const Features = ({
    title = "Download YouTube Videos in Stunning HD - It's Easy!",
    desc1 = "Tired of losing access to your favorite YouTube videos? Our high quality YouTube video downloader makes saving any content you love super easy and lightning-fast. Whether you're hoarding educational tutorials, hilarious shorts, or those professional presentations you need for work, Eazy-dl keeps everything looking exactly like the original—no annoying watermarks or weird restrictions.",
    desc2 = "Ready to never lose a video again? Download YouTube videos in crisp 1080p quality with our simple yet powerful YouTube video downloader 1080p tool. Perfect for content creators who need offline backup libraries, students cramming for exams, or basically anyone who's ever thought \"I wish I could save this for later.\" Just paste, click, and boom—you've got your video ready to watch anytime, anywhere."
}) => {
    return (
        <>
            <section >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className=" w-full text-center"
                >
                    <div className=" z-10 flex flex-col items-center">
                        <div className="w-full max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                                {title}
                            </h2>
                            <p className="text-white/70 mb-4 text-lg leading-relaxed">
                                {desc1}
                            </p>
                            <p className="text-white/70 text-lg">
                                {desc2}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    )
}

export default Features
