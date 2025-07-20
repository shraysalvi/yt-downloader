import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Home, About, Contact, Privacy, Audio, Thumbnail} from "./Pages";
import { getRecentDownloads } from './services/storageServices';
import { Footer, Header } from "./Components/Common";
import RecentsQueue from "./Components/Queue/RecentsQueue";
import ProgressQueue from "./Components/Queue/ProgressQueue";
import { Toaster } from "react-hot-toast";
import ScrollToTop from './Components/ScrollToTop';

const App = () => {
  const [recentCount, setRecentCount] = useState(0);
  const [showRecentsQueue, setShowRecentsQueue] = useState(false);

  const handleToggleRecent = () => {
    // Only open recents if there are items
    if (recentCount > 0) {
      setShowRecentsQueue((prev) => !prev);
    } else {
      console.log("No recent downloads available.");
    }
  };

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
      <BrowserRouter>
        {showRecentsQueue && (
          <RecentsQueue onClose={() => setShowRecentsQueue(false)} />
        )}
        <ProgressQueue />
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
        <Header onRecentClick={handleToggleRecent} recentCount={recentCount} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/privacy-policy' element={<Privacy />} />
          <Route path='/youtube-to-mp3-converter' element={<Audio />} />
          <Route path='/youtube-thumbnail-downloader' element={<Thumbnail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ScrollToTop />
    </>
  )
}

export default App;
