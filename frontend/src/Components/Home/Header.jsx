import { FaRegClock } from "react-icons/fa6";
import { IoBookmark } from "react-icons/io5";
import { toast } from "react-hot-toast";

const Header = ({ onRecentClick, recentCount }) => {
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

  return (
    <div  className="fixed top-0 left-0 right-0 bg-[#05051E] py-4 px-4 z-30 flex justify-between items-center border-b border-white/5">
      <a href="/" className="flex items-center">
        <img 
          src="eazy-dl_SVG_transparent_bg2.svg"
          alt="Eazy‑dl Logo"
          className="h-auto sm:w-[10rem] w-[8rem]"
          onContextMenu={(e) => e.preventDefault()}
        />
      </a>
      <div className="flex items-center space-x-2 ml-auto">
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