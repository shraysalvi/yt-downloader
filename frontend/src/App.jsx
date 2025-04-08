import React, { useState, useCallback, useEffect } from 'react';
import { Header, Hero, Features, HowDownload, ChooseUs, DownloadOptions, Faq, Footer } from './Components/Home';
import ProgressQueue from './Components/Queue/ProgressQueue';
import RecentsQueue from './Components/Queue/RecentsQueue';
import VideoQualities from './Components/Queue/VideosQualities';
import { getRecentDownloads } from './services/storageServices';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [showRecentsQueue, setShowRecentsQueue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentCount, setRecentCount] = useState(0);

  const handleToggleRecent = () => {
    // Only open recents if there are items
    if (recentCount > 0) {
      setShowRecentsQueue((prev) => !prev);
    } else {
      console.log("No recent downloads available.");
    }
  };

  const handleLoadingChange = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  useEffect(() => {
    const updateRecentCount = () => {
      const recents = getRecentDownloads();
      setRecentCount(recents.length);
    };

    updateRecentCount();
    window.addEventListener("storage", updateRecentCount);
    window.addEventListener("recent_update", updateRecentCount);
    return () => {
      window.removeEventListener("storage", updateRecentCount);
      window.removeEventListener("recent_update", updateRecentCount);
    };
  }, []);

  return (
    <>
      {showRecentsQueue && (
        <RecentsQueue onClose={() => setShowRecentsQueue(false)} />
      )}
      <div className="min-h-screen bg-[#05051e] overflow-hidden">
        <Header onRecentClick={handleToggleRecent} recentCount={recentCount} />
        <div className="z-10 pt-16">
          <div className="container mx-auto px-4 py-4 sm:py-8">
            <ProgressQueue />
            <Hero onUrlUpdate={setVideoUrl} loading={isLoading} />
            <VideoQualities videoUrl={videoUrl} onLoadingChange={handleLoadingChange} />
            <section className="sm:mt-40 mt-30 sm:mb-20 px-4 mx-auto max-w-6xl space-y-24">
              <Features />
              <HowDownload />
              <ChooseUs />
              <DownloadOptions />
              <Faq />
            </section>
          </div>
          <Footer />
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </>
  );
};

export default App;