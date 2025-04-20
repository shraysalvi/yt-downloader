import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-hot-toast';
import socket from '../../Socket/Utils';
import { cancelDownload } from '../../Socket/Utils';
import {
  getDownloadQueue,
  removeDownloadItem,
  addRecentDownload
} from '../../services/storageServices';
import { downloadFile } from '../../services/downloadFile';

const ProgressQueue = () => {
  const [queue, setQueue] = useState(getDownloadQueue());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleDownloadAdded = (e) => {
      const newItem = e.detail;
      setQueue(prevQueue => {
        if (!prevQueue.find(item => item.id === newItem.id)) {
          setTimeout(() => toast.success('Added to download queue'), 0);
          return [...prevQueue, newItem];
        }
        return prevQueue;
      });
    };

    window.addEventListener("download_added", handleDownloadAdded);
    return () => window.removeEventListener("download_added", handleDownloadAdded);
  }, []);

  // Automatically open queue if any items exist
  useEffect(() => {
    if (queue.length > 0) {
      setIsOpen(true);
    }
  }, [queue]);


  useEffect(() => {
    const handleProgressUpdate = (data) => {
      setQueue(prevQueue => {
        let newQueue = prevQueue.map(item => {
          if (item.id === data.id) {
            return {
              ...item,
              progress: data._percent,
              progressDisplay: data._percent_str,
              status: data.status
            };
          }
          return item;
        });

        if (data.status === "completed") {
          const completedItem = newQueue.find(item => item.id === data.id);
          if (completedItem) {
            const timestamp = new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            });
            setTimeout(() => {
              if (!completedItem.downloaded) {
                // Use proper extension based on category
                const ext = completedItem.category === 'audio' ? completedItem.format : 'mp4';
                const fileName = data.info_dict && data.info_dict.title ?
                  `${data.info_dict.title}.${ext}` : `downloaded_${completedItem.category}.${ext}`;
                downloadFile(data.file, fileName);
              }
              removeDownloadItem(data.id);
              addRecentDownload({ ...completedItem, status: "completed", timestamp });
              toast.success('Download completed!');
            }, 0);
            newQueue = newQueue.filter(item => item.id !== data.id);
          }
        }

        if (data.status === "error") {
          setTimeout(() => toast.error("Download failed. Please try again."), 0);
        }

        return newQueue;
      });
    };

    socket.on('progress_update', handleProgressUpdate);
    return () => {
      socket.off('progress_update', handleProgressUpdate);
    };
  }, []);

  const handleCancel = async (item) => {
    try {
      const result = await cancelDownload(item.id, item.taskId);
      console.log("Cancel result:", result);
      // Remove from localStorage downloadQueue
      removeDownloadItem(item.id);
      // Update state by filtering out the canceled item
      setQueue(prevQueue =>
        prevQueue.filter(itm => itm.id !== item.id)
      );
      // Emit event for download cancellation
      window.dispatchEvent(new CustomEvent("download_canceled", { detail: { id: item.id } }));
      // Notify that download was cancelled
      toast.error("Download cancelled");
    } catch (error) {
      console.error("Error canceling download:", error);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {/* Only show button if there is at least one item in the queue */}
      {queue.length > 0 && (
        <>
          {(!isOpen && queue.length > 0) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-violet-600 text-white px-4 py-3 rounded-full shadow-black/80 shadow-sm flex items-center space-x-2"
            >
              <HiMiniBars3BottomLeft className="h-5 w-5" />
              <span>Download Queue ({queue.length})</span>
            </motion.button>
          )}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                className="bg-[#2A2536] border border-white/10 rounded-lg shadow-xl shadow-black/80 overflow-hidden w-80"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="p-3 bg-[#1E1A2E] border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-white font-medium">Download Queue ({queue.length})</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/70 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
                  >
                    <RxCross2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border-b border-white/5 flex gap-3 ${item.status === 'downloading' ? 'bg-white/5' : 'opacity-70'}`}
                    >
                      <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-white text-sm font-medium truncate">{item.title}</p>
                          {item.status === 'downloading' && (
                            <button
                              onClick={() => handleCancel(item)}
                              className="text-white/60 hover:text-white text-xs ml-2"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                        <p className="text-white/60 text-xs">{item.quality} • {item.format}</p>

                        {item.status === 'downloading' ? (
                          item.progress > 0 ? (
                            <>
                              <div className="mt-1 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-violet-500 h-full rounded-full"
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-white/60 text-xs mt-1">
                                Downloading... {item.progressDisplay ? item.progressDisplay.trim() : Math.round(item.progress) + '%'}
                              </p>
                            </>
                          ) : (
                            <p className="text-white/60 text-xs mt-1">Queued</p>
                          )
                        ) : item.status === 'queued' ? (
                          <p className="text-white/60 text-xs mt-1">Queued</p>
                        ) : item.status === 'canceled' ? (
                          <p className="text-white/60 text-xs mt-1">Canceled</p>
                        ) : item.status === 'error' ? (
                          <p className="text-white/60 text-xs mt-1">Error</p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>

  );
};

export default ProgressQueue;