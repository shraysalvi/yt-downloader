import { FaRegClock } from "react-icons/fa6";
import { IoBookmark, IoMenu, IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const NAV_LINKS = [
  {
    to: "/",
    label: "Youtube Video Downloader",
    exact: true,
  },
  {
    to: "/youtube-to-mp3-converter",
    label: "YouTube to MP3",
    exact: false,
  },
];

const Header = ({ onRecentClick, recentCount }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleRecentClick = () => {
    if (recentCount > 0) {
      onRecentClick();
    } else {
      toast.error('No download history yet.');
    }
  };

  const handleBookmark = () => {
    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // Check if it's Android
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS || isAndroid) {
      // For mobile devices, show instructions for adding to home screen
      toast.success(
        <div className="text-center">
          <p className="font-bold mb-1">Add to Home Screen</p>
          {isIOS ? (
            <p>Tap the share icon ⎋ then "Add to Home Screen"</p>
          ) : (
            <p>Tap menu ⋮ then "Add to Home Screen"</p>
          )}
        </div>,
        { duration: 3000 }
      );
    } else if (window.sidebar && window.sidebar.addPanel) {
      // Firefox (legacy support)
      window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ("AddFavorite" in window.external)) {
      // IE
      window.external.AddFavorite(window.location.href, document.title);
    } else {
      // Other desktop browsers
      toast.success('Press Ctrl+D (or ⌘+D on Mac) to save this tool');
    }
  };

  // Helper for active tab underline
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-base font-semibold transition-all duration-200 relative text-white/90 hover:text-white ` +
    (isActive
      ?
        "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-1 after:bg-gradient-to-r after:from-[#46D8FF] after:via-[#6B09FF] after:to-[#F46477] after:rounded-full text-white"
      :
        "text-white/70");

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#05051E] py-4 px-4 z-30 flex items-center border-b border-white/5">
      {/* Logo */}
      <Link to="/" className="flex items-center flex-shrink-0">
        <img 
          src="eazy-dl_SVG_transparent_bg2.svg"
          alt="Eazy‑dl Logo"
          className="h-auto sm:w-[10rem] w-[8rem]"
          onContextMenu={(e) => e.preventDefault()}
        />
      </Link>
      {/* Centered Nav */}
      <nav className="hidden sm:flex flex-1 justify-center items-center gap-2">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={navLinkClass}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      {/* Hamburger and Recent for mobile */}
      <div className="flex sm:hidden items-center gap-2 ml-auto">
        <button
          onClick={handleRecentClick}
          className="px-3 py-2 rounded-full text-white bg-white/5 hover:bg-white/10 flex items-center gap-1 transition-all duration-300 text-sm"
        >
          <FaRegClock className="h-4 w-4" />
          <span className="sm:hidden">Recent</span>
          {recentCount > 0 && (
            <span className="ml-1 bg-violet-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {recentCount}
            </span>
          )}
        </button>
        <button
          className="text-white text-2xl p-2 focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open navigation menu"
        >
          {mobileOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 flex flex-col" onClick={() => setMobileOpen(false)}>
          <div className="bg-[#05051E] shadow-lg w-4/5 max-w-xs h-full p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <img 
                  src="eazy-dl_SVG_transparent_bg2.svg"
                  alt="Eazy‑dl Logo"
                  className="h-auto w-32"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Link>
              <button className="text-white text-2xl" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                <IoClose />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-[#46D8FF] via-[#6B09FF] to-[#F46477] text-white' : 'text-white/80 hover:bg-white/10'}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
      {/* Right side buttons (desktop only) */}
      <div className="hidden sm:flex items-center space-x-2 ml-auto">
        <button
          onClick={handleRecentClick}
          className="px-3 py-2 rounded-full text-white bg-white/5 hover:bg-white/10 flex items-center gap-1 transition-all duration-300 text-sm"
        >
          <FaRegClock className="h-4 w-4" />
          <span>Recent</span>
          {recentCount > 0 && (
            <span className="ml-1 bg-violet-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {recentCount}
            </span>
          )}
        </button>
        <button
          onClick={handleBookmark}
          className="text-white hover:bg-white/5 transition-all duration-300 text-sm hidden sm:block"
        >
          <span className="p-[1px] bg-gradient-to-r from-[#46D8FF] via-[#6B09FF] to-[#F46477] rounded-full inline-block">
            <span className="flex items-center px-3 py-2 bg-[#05051e] rounded-full">
              <IoBookmark className="h-4 w-4 mr-1" />
              Save this tool
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;