import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoTrashOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getRecentDownloads } from "../../services/storageServices";

const slideInVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const RecentsQueue = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [downloads, setDownloads] = useState([]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const updateDownloads = () => {
    const recents = getRecentDownloads();
    // Reverse the array to show the newest first without mutating the original
    setDownloads(recents.slice().reverse());
  };

  useEffect(() => {
    // Load recent downloads on mount
    updateDownloads();
    // Update recents when a "recent_update" event is dispatched
    window.addEventListener("recent_update", updateDownloads);
    return () => {
      window.removeEventListener("recent_update", updateDownloads);
    };
  }, []);

  const handleClearRecents = () => {
    localStorage.removeItem("recentDownloads");
    toast.success('Download history cleared')
    setDownloads([]);
    window.dispatchEvent(new Event("recent_update"));
  };

  return (
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          variants={slideInVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[80vw] bg-white/10 backdrop-blur-2xl border-l  border-white/20 shadow-lg overflow-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)'
          }}
        >
          <div className="p-4">
            <div className=" flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">
                Recent Downloads
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleClose}
                  className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
                >
                  <RxCross2 className="h-5 w-5" />
                </button>
                <button
                  onClick={handleClearRecents}
                  className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
                >
                  <IoTrashOutline className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3" >
              {downloads.length !== 0 ? (
                downloads.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/10 rounded-lg overflow-hidden cursor-pointer hover:bg-white/15 transition-all duration-200 border border-white/5"
                  >
                    <div className="flex">
                      <div className="w-1/3 relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover aspect-video"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-2/3 p-2">
                        <p className="text-white text-xs font-medium line-clamp-2">
                          {item.title}
                        </p>
                        <div className="flex flex-col mt-1">
                          <span className="text-white/70 text-xs">
                            {item.quality}p • {item.format}
                          </span>
                          <span className="text-white/50 text-xs">
                            {item.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-white/70 text-sm mt-4">
                  No recent downloads available.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecentsQueue;