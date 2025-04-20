const About = () => {
    return (
        <div className="min-h-screen bg-[#05051E]">
            <div className="max-w-4xl mx-auto px-4 sm:py-40 py-30">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">About Eazy-dl</h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mb-8"></div>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {/* Intro Paragraph */}
                    <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-lg text-white/70 leading-relaxed">

                            Eazy-dl is a free, fast, and reliable YouTube video downloader created with simplicity in mind. We understand the frustration of complex interfaces, annoying ads, and unnecessary signups that plague most video downloading tools.

                        <br></br>
                        <br></br>

                            Our mission is straightforward: to provide a clean, efficient way to download your favorite YouTube videos and Shorts in high quality. With Eazy-dl, you can save content in up to 1080p resolution without watermarks or hidden fees.

                            <br></br>
                            <br></br>

                            Developed by a small team of passionate developers, Eazy-dl prioritizes user privacy and experience above all. We don't track your downloads, collect personal data, or require registration.
  
                            <br></br>
                            <br></br>

                            Whether you're saving educational content, preserving creative inspiration, or building a personal collection, Eazy-dl is the tool that simply works—every time

                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;