import React, { useState, useCallback } from 'react';
import { Hero, Features } from '../Components/Common';
import AudioSteps from '../Components/Audio/AudioSteps';
import AudioQuality from '../Components/Audio/AudioQuality';
import AudioFeatures from '../Components/Audio/AudioFeatures';
import AudioFaq from '../Components/Audio/AudioFaq';
import MediaQualities from '../Components/Queue/MediaQualities';
import AudioHowDownload from '../Components/Audio/AudioHowDownload';

const Audio = () => {
    const [audioUrl, setAudioUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadingChange = useCallback((loading) => {
        setIsLoading(loading);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-[#05051e] overflow-hidden">
                <div className="z-10 pt-16">
                    <div className="container mx-auto px-4 py-4 sm:py-8">
                        <Hero 
                            onUrlUpdate={setAudioUrl} 
                            loading={isLoading}
                            h1="Free YouTube to MP3 Converter Online"
                            p="Convert any YouTube video to MP3 with Eazy-dl for free. No signups, no hassle, and no delays. Extract high-quality audio up to 320kbps instantly!"
                            buttonLabel="Download"
                        />
                        {/* Only pass audio formats to VideoQualities */}
                        <MediaQualities videoUrl={audioUrl} onLoadingChange={handleLoadingChange} showType="audio" />
                        <section className="sm:mt-40 mt-30 sm:mb-20 px-4 mx-auto max-w-6xl space-y-24">
                            <Features />
                            <AudioQuality />
                            <AudioHowDownload />
                            <AudioFeatures />
                            <AudioFaq />
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Audio; 