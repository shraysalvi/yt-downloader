import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";
import { fetchVideoInfo, addDownload } from '../../Socket/Utils';
import socket from '../../Socket/Utils';
import { addDownloadItem } from '../../services/storageServices';

// DownloadButton now accepts a custom downloadHandler
const DownloadButton = ({ format, videoUrl, videoData, className, downloadHandler }) => {
  const [status, setStatus] = useState('idle');
  const [downloadId, setDownloadId] = useState(null);

  useEffect(() => {
    if (!downloadId) return;

    const handleProgressUpdate = (data) => {
      if (data.id === downloadId) {
        if (data.status === 'downloading') {
          setStatus('downloading');
        } else if (data.status === 'completed') {
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
    if (downloadHandler) {
      // For thumbnails or custom logic
      downloadHandler(format, videoUrl, videoData);
      return;
    }
    try {
      setStatus('preparing');
      const category = (format.format === 'm4a') ? "audio" : "video";
      const downloadData = {
        url: videoUrl,
        quality: format.quality || format.display,
        format: format.format || format.ext,
        category: category
      };
      const response = await addDownload(downloadData);
      if (response && response.status === "ok") {
        const downloadItem = {
          id: response.download_id,
          taskId: response.task_id,
          title: videoData.title,
          thumbnail: videoData.thumbnail,
          resolution: format.resolution,
          quality: format.quality || format.display,
          format: format.format || format.ext,
          status: "downloading",
          category: category
        };
        addDownloadItem(downloadItem);
        window.dispatchEvent(new CustomEvent("download_added", { detail: downloadItem }));
        setDownloadId(response.download_id);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
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
      className={`py-2.5 rounded-full font-medium transition-all duration-200 w-full sm:w-24 bg-violet-600 text-white hover:bg-violet-500 disabled:bg-white/10 disabled:cursor-not-allowed ${className || ''}`}
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

// MediaQualities is now generic: accepts 'qualities', 'downloadHandler', and 'title' props
const MediaQualities = ({ videoUrl, onLoadingChange, showType, qualities, downloadHandler, title, displayData: displayDataProp }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAllFormats, setShowAllFormats] = useState(false);
  const infoBoxRef = useRef(null);

  // If qualities are provided, use them directly (for thumbnails)
  // Otherwise, fetch video/audio info as before
  useEffect(() => {
    if (qualities) return; // skip fetching for thumbnails
    const loadVideoData = async () => {
      setLoading(true);
      if (onLoadingChange) onLoadingChange(true);
      const data = await fetchVideoInfo(videoUrl);
      setVideoData(data);
      setLoading(false);
      if (onLoadingChange) onLoadingChange(false);
    };
    if (videoUrl && videoUrl.trim()) {
      loadVideoData();
    }
  }, [videoUrl, onLoadingChange, qualities]);

  // For video/audio, extract formats as before
  let filteredFormats = [];
  let displayTitle = title;
  // Use displayDataProp if provided (for thumbnails), otherwise fallback to videoData
  let displayData = displayDataProp || videoData;
  if (qualities) {
    filteredFormats = qualities;
    displayTitle = title || 'Download thumbnail as:';
  } else if (videoData) {
    const { formats } = videoData;
    if (formats) {
      if (showType === 'video') {
        filteredFormats = formats.video || [];
      } else if (showType === 'audio') {
        filteredFormats = formats.audio || [];
      } else {
        filteredFormats = [...(formats.video || []), ...(formats.audio || [])];
      }
      filteredFormats = filteredFormats.sort((a, b) => (Number(b.quality) || 0) - (Number(a.quality) || 0));
    }
    displayTitle = title || (showType === 'audio' ? 'Download audio as:' : 'Download video as:');
  }
  const visibleFormats = showAllFormats ? filteredFormats : filteredFormats.slice(0, 4);

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

  if (qualities && (!Array.isArray(qualities) || qualities.length === 0)) {
    // Show a message if no static qualities are available
    return <div className="text-center text-white/70 py-8">No formats available</div>;
  }
  if (!qualities && !videoData) {
    return null;
  }

  return (
    <motion.div
      ref={infoBoxRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto mt-8 px-4"
    >
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-lg">
        {/* Header section for video/audio and thumbnail, with null check */}
        {displayData && displayData.thumbnail && (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-full md:w-1/3 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src={displayData.thumbnail}
                    alt={displayData.title || 'thumbnail'}
                    className="w-full h-full object-cover"
                  />
                  {displayData.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {displayData.duration}
                    </div>
                  )}
                </motion.div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 line-clamp-2">
                  {displayData.title || ''}
                </h2>
                <p className="text-white/70 text-sm line-clamp-2 mb-2">
                  {displayData.description || ''}
                </p>
              </div>
            </div>
          </>
        )}
        <h3 className="text-lg font-medium text-white mb-4">{displayTitle}</h3>
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
              // Compose class name: e.g., 1080p.mp4, 130p.m4a
              const quality = format.quality || format.display || format.res || '';
              const ext = format.format || format.ext || '';
              let className = `${quality}p.${ext}`.replace(/\s+/g, '').toLowerCase();
              className = className.replace(/[^a-z0-9_.-]/g, '');
              const formatLabel = format.label || `${quality}p.${ext}`;
              const formatDetails = format.res || format.display || '';
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 gap-4 backdrop-blur-xl border border-white/10"
                >
                  <div>
                    <div className="text-white font-medium flex items-center">
                      <span>{formatLabel}</span>
                    </div>
                    <div className="text-sm text-white/60">
                      {formatDetails}
                    </div>
                  </div>
                  <DownloadButton
                    format={format}
                    videoUrl={videoUrl}
                    videoData={displayData}
                    className={className}
                    downloadHandler={downloadHandler}
                  />
                </div>
              );
            })}
            {filteredFormats.length > 4 && (
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
      </div>
    </motion.div>
  );
};

export default MediaQualities;
