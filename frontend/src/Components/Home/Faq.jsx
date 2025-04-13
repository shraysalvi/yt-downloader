import React from 'react'

const Faq = () => {
    return (
        <>
            <section >
                <div className="rounded-3xl overflow-hidden relative border border-white/5"
                    style={{
                        background: "linear-gradient(135deg, rgba(18,17,35,0.7) 0%, rgba(30,25,55,0.7) 100%)",
                        boxShadow: "0 15px 30px -10px rgba(0,0,0,0.2)"
                    }}>
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

                    <div className="p-12 relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">FAQ Related To YouTube Video Downloader</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* FAQ Item 1 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <div className="w-4 h-4 bg-blue-400 mr-3 rounded-sm"></div>
                                    How can I download YouTube videos without an app? 
                                </h3>
                                <p className="text-white/70 pl-7">
                                Just use Eazy-dl! Paste the video link into our site, select the quality, and download straight to your browser. No installations required.
                                </p>
                            </div>

                            {/* FAQ Item 2 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <div className="w-4 h-4 bg-purple-400 mr-3 rounded-sm"></div>
                                    Is Eazy-dl YouTube Video Downloader ad-free? 
                                </h3>
                                <p className="text-white/70 pl-7">
                                Absolutely! Eazy-dl offers a clean and safe experience without annoying pop-ups or shady redirects. 
                                </p>
                            </div>

                            {/* FAQ Item 3 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <div className="w-4 h-4 bg-blue-400 mr-3 rounded-sm"></div>
                                    How do I save videos to my phone gallery? 
                                </h3>
                                <p className="text-white/70 pl-7">
                                On Android, the video will appear directly in your gallery. For iPhones, check your Downloads folder and move the file to Photos if needed.
                                </p>
                            </div>

                            {/* FAQ Item 4 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <div className="w-4 h-4 bg-purple-400 mr-3 rounded-sm"></div>
                                    Can I download videos without watermarks? 
                                </h3>
                                <p className="text-white/70 pl-7">
                                Always. Eazy-dl never adds watermarks, ensuring your videos stay exactly as they are on YouTube.
                                </p>
                            </div>

                            {/* FAQ Item 5 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <div className="w-4 h-4 bg-blue-400 mr-3 rounded-sm"></div>
                                    Is it legal to use YouTube downloaders? 
                                </h3>
                                <p className="text-white/70 pl-7">
                                For personal, private use, downloading is generally fine. Just avoid sharing or using copyrighted content commercially without permission. 
                                </p>
                            </div>

                            {/* FAQ Item 6 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <div className="w-4 h-4 bg-purple-400 mr-3 rounded-sm"></div>
                                    Can I download YouTube Shorts? 
                                </h3>
                                <p className="text-white/70 pl-7">
                                You bet! Just paste the YouTube Shorts link, pick your quality, and grab the video seamlessly. 
                                </p>
                            </div>

                            {/* FAQ Item 7 */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <div className="w-4 h-4 bg-blue-400 mr-3 rounded-sm"></div>
                                    What makes Eazy-dl the fastest downloader? 
                                </h3>
                                <p className="text-white/70 pl-7">
                                Our advanced servers process videos instantly, giving you faster downloads than other tools on the web.  
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Faq