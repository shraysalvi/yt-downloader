import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="">
            {/* Social Icons Section */}
            <div className="flex justify-center items-center py-8">
                <div className="flex space-x-6">
                    <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all duration-300 group">
                        <FaFacebookF className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-black transition-all duration-300 group">
                        <FaXTwitter className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition-all duration-300 group">
                        <FaInstagram className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300 group">
                        <FaLinkedinIn className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Branding & Copyright Section */}
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center border-t border-white/20">
                <a className="flex items-center group">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-all">
                        Eazy-dl
                    </span>
                </a>
                <p className="mt-4 md:mt-0 text-sm text-gray-400 hover:text-gray-300 transition-colors">
                    © {new Date().getFullYear()} Eazy-dl — All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;