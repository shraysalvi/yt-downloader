import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer >
            {/* Social Icons Section */}
            <div className="flex justify-center items-center py-8">
                <div className="flex space-x-6">
                    <a
                        href="https://youtube.com/@Eazy-dl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-pink-600 transition-all duration-300 group"
                    >
                        <FaYoutube className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                            YouTube Channel
                        </span>
                    </a>
                </div>
            </div>

            {/* Branding & Copyright Section */}
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center border-t border-white/20">
                <a href="/" className="flex items-center">
                    <img
                        src="eazy-dl_SVG_transparent_bg2.svg"
                        alt="Eazy‑dl Logo"
                        className="h-10 w-auto"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </a>

                {/* Right side: copyright + privacy */}
                <div className="mt-4 md:mt-0 flex flex-col space-y-1.5 items-center md:items-end text-sm text-gray-400 transition-colors">
                    <span className="hover:text-gray-300">
                        © 2025 Eazy-dl — All rights reserved
                    </span>
                    <nav className="flex space-x-2">
                        <Link to="/about-us" className="hover:text-gray-300">
                            About us
                        </Link>
                        <span>|</span>
                        <Link to="/blog" className="hover:text-gray-300">
                            Blog
                        </Link>
                        <span>|</span>
                        <Link to="/privacy-policy" className="hover:text-gray-300">
                            Privacy Policy
                        </Link>
                        <span>|</span>
                        <Link to="/contact-us" className="hover:text-gray-300">
                            Contact us
                        </Link>
                    </nav>
                </div>
            </div>


        </footer>
    );
};

export default Footer;