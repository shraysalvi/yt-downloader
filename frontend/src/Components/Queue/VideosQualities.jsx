import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";
import { fetchVideoInfo, addDownload } from '../../Socket/Utils';
import socket from '../../Socket/Utils';
import { addDownloadItem } from '../../services/storageServices';


const DownloadButton = ({ format, videoUrl, videoData }) => {
  const [status, setStatus] = useState('idle');
  const [downloadId, setDownloadId] = useState(null);

  useEffect(() => {
    if (!downloadId) return;

    const handleProgressUpdate = (data) => {
      if (data.id === downloadId) {
        console.log('Progress update:', data);
        if (data.status === 'downloading') {
          setStatus('downloading');
        } else if (data.status === 'completed') {
          console.log('Download completed:', data);
          setStatus('completed');
          setTimeout(() => setStatus('idle'), 3000);
        } else if (data.status === 'error') {
          setStatus('error');
          setTimeout(() => setStatus('idle'), 3000);
        }
      }
    };

    const handleDownloadCanceled = (e) => {
      if (e.detail.id === downloadId) {
        setStatus('idle');
        setDownloadId(null);
      }
    };

    socket.on('progress_update', handleProgressUpdate);
    window.addEventListener('download_canceled', handleDownloadCanceled);
    
    return () => {
      socket.off('progress_update', handleProgressUpdate);
      window.removeEventListener('download_canceled', handleDownloadCanceled);
    };
  }, [downloadId]);

  const handleDownload = async () => {
    try {
      setStatus('preparing');
      const downloadData = {
        url: videoUrl,
        quality: format.quality || format.display,
        format: format.format || format.ext,
        category: "video"
      };

      const response = await addDownload(downloadData);
      console.log("Download initiated:", response);

      if (response && response.status === "ok") {
        const downloadItem = {
          id: response.download_id,
          taskId: response.task_id,
          title: videoData.title,
          thumbnail: videoData.thumbnail,
          resolution: format.resolution,
          quality: format.quality || format.display,
          format: format.format || format.ext,
          status: "downloading"
        };
        addDownloadItem(downloadItem);
        window.dispatchEvent(new CustomEvent("download_added", { detail: downloadItem }));
        setDownloadId(response.download_id);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Download error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleDownload}
      disabled={status !== 'idle' && status !== 'completed' && status !== 'error'}
      className="py-2.5 rounded-full font-medium transition-all duration-200 w-full sm:w-24 bg-violet-600 text-white hover:bg-violet-500 disabled:bg-white/10 disabled:cursor-not-allowed"
    >
      {status === 'preparing' && (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-white text-xs">Preparing...</span>
        </div>
      )}

      {status === 'downloading' && (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-white text-xs">Processing</span>
        </div>
      )}

      {status === 'completed' && (
        <span className="text-white text-xs">Downloaded</span>
      )}

      {status === 'error' && (
        <span className="text-white text-xs">Failed</span>
      )}

      {status === 'idle' && (
        <span className="text-white text-sm">Download</span>
      )}
    </motion.button>
  );
};

const VideoQualities = ({ videoUrl, onLoadingChange }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAllFormats, setShowAllFormats] = useState(false);

  useEffect(() => {
    const loadVideoData = async () => {
      setLoading(true);
      if (onLoadingChange) onLoadingChange(true);

      const data = await fetchVideoInfo(videoUrl);
      // Debug: Check response structure
      console.log("Fetched video data:", data);
      setVideoData(data);

      setLoading(false);
      if (onLoadingChange) onLoadingChange(false);
    };

    if (videoUrl.trim()) {
      loadVideoData();
    }
  }, [videoUrl, onLoadingChange]);

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 px-4 animate-pulse">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <div className="rounded-xl overflow-hidden shadow-lg bg-gray-700 h-48"></div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-700 rounded w-full"></div>
            <div className="h-16 bg-gray-700 rounded w-full"></div>
            <div className="h-16 bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!videoData) {
    return null; // or show a placeholder if no videoUrl is provided
  }

  // Merge formats if they come separated as audio and video
  const { title, thumbnail, description, duration, formats } = videoData;
  // Combine video and audio formats then sort in descending order based on normalized quality (numeric)
  const allFormats = formats
    ? [...(formats.video || []), ...(formats.audio || [])].sort((a, b) => {
      // Use Number(a.quality) as quality may be a number or a string.
      return (Number(b.quality) || 0) - (Number(a.quality) || 0);
    })
    : [];
  const visibleFormats = showAllFormats ? allFormats : allFormats.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto mt-8 px-4"
    >
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-lg">
        {/* Video Information */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
              {duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {duration}
                </div>
              )}
            </motion.div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 line-clamp-2">
              {title}
            </h2>
            <p className="text-white/70 text-sm line-clamp-2 mb-2">
              {description}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-medium text-white mb-4">Download video as:</h3>

        {/* Format List */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3 max-h-[60vh] overflow-y-auto pr-1"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)'
            }}
          >

            {visibleFormats.map((format, index) => {
              const formatLabel = `${format.quality || format.display || ""}p.${format.format || format.ext || ""}`;
              const formatDetails = `${format.display || ""} ${format.resolution || ""} ${format.filesize || ""}`;
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 
                             bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 
                             gap-4 backdrop-blur-xl border border-white/10"
                >
                  <div>
                    <div className="text-white font-medium flex items-center">
                      <span>{formatLabel}</span>
                    </div>
                    <div className="text-sm text-white/60">
                      {formatDetails}
                    </div>
                  </div>
                  <DownloadButton format={format} videoUrl={videoUrl} videoData={videoData} />
                </div>
              );
            })}


            {allFormats.length > 4 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAllFormats(!showAllFormats)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 transition-all rounded-xl text-white text-sm flex items-center space-x-2"
                >
                  <span>{showAllFormats ? 'Show less' : 'Show more'}</span>
                  <IoIosArrowDown className={`h-4 w-4 transition-transform duration-300 ${showAllFormats ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {allFormats.length === 0 && (
          <div className="text-center text-white/70 py-8">
            No formats available
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoQualities;