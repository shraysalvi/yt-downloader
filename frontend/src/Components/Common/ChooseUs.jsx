import { motion } from 'framer-motion';


const ChooseUs = () => {
    // Feature data for the grid section
    const features = [
        {
            title: "Ultra-Fast Speeds",
            description: "Nobody likes waiting. Download videos in seconds with our lightning-fast server speeds.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            iconBg: "linear-gradient(135deg, rgba(70,216,255,0.15) 0%, rgba(70,100,255,0.15) 100%)"
        },
        {
            title: "Secure & Private",
            description: " No tracking, no logs. Your downloads are completely private.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            iconBg: "linear-gradient(135deg, rgba(107,9,255,0.15) 0%, rgba(187,9,255,0.15) 100%)"
        },
        {
            title: "Premium HD Quality",
            description: "Get up to 1080p without losing clarity—with both video and audio perfectly preserved.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            iconBg: "linear-gradient(135deg, rgba(244,100,119,0.15) 0%, rgba(255,70,101,0.15) 100%)"
        },
        {
            title: "Compatible with All Devices",
            description: "Works on Windows, Mac, Android, iOS, and Linux with no extra software to install.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            iconBg: "linear-gradient(135deg, rgba(70,216,255,0.15) 0%, rgba(70,100,255,0.15) 100%)"
        },
        {
            title: "Simple, Intuitive Interface",
            description: "Three steps, zero confusion. Download videos with just a few clicks.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 15l5-5m0 0l-5-5m5 5H5" />
                </svg>
            ),
            iconBg: "linear-gradient(135deg, rgba(107,9,255,0.15) 0%, rgba(187,9,255,0.15) 100%)"
        },
        {
            title: "Multiple Formats",
            description: "Choose between MP4 or WebM and find your balance between top quality and file size.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            ),
            iconBg: "linear-gradient(135deg, rgba(244,100,119,0.15) 0%, rgba(255,70,101,0.15) 100%)"
        }
    ];

    return (
        <>
            {/* Features Grid Section */}
            <section >
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14">Why Eazy-dl is the Best YouTube Video Downloader in 2025 🔥</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature Cards - Using consistent background from FAQ section */}
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.2)" }}
                            className="rounded-2xl overflow-hidden relative h-64 border border-white/5"
                            style={{
                                background: "linear-gradient(145deg, rgba(20,18,39,0.6) 0%, rgba(32,26,55,0.6) 100%)",
                                boxShadow: "0 10px 20px -5px rgba(0,0,0,0.15)"
                            }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                            <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(123,97,255,0.2) 0%, transparent 70%)" }}></div>

                            <div className="p-8 h-full flex flex-col">
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                                        style={{ background: feature.iconBg }}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/70 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default ChooseUs
