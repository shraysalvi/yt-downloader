import React from "react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-[#05051E]">
            <div className="max-w-4xl mx-auto px-4 sm:py-40 py-30">
                {/* Header Section */}

                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">Contact Us</h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mb-8"></div>
                </div>

                {/* Content Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                    <div className="space-y-8 text-white/70">
                        {/* Intro Text */}
                        <p className="text-lg md:text-xl leading-relaxed text-left">
                            Have questions or feedback about Eazy-dl?
                        </p>

                        <p className="text-lg md:text-xl leading-relaxed text-left">
                            We're here to help! Get in touch with our team through the email mentioned below.
                        </p>

                        <p className="text-lg md:text-xl leading-relaxed text-left">
                            Send us an email at <span className="text-white font-semibold">'hello@eazy-dl.com'</span> for any query or suggestion. We would be happy to respond to your mail as soon as possible.
                        </p>

                        {/* Response Time */}
                        <p className="text-lg md:text-xl text-left leading-relaxed">
                            We aim to respond to all inquiries within <br />
                            <span className="text-white font-semibold">24-48 hours</span> during business days.
                        </p>

                        {/* Closing Section */}
                        <div className="pt-10 mt-10 border-t border-white/10 text-left">
                            <p className="text-xl text-white/70">
                                Thank you for using Eazy-dl!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
