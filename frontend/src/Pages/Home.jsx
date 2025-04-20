import React, { useState, useCallback } from 'react';
import { Hero, Features, HowDownload, ChooseUs, DownloadOptions, Faq } from '../Components/Home';
import VideoQualities from '../Components/Queue/VideosQualities';

const Home = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadingChange = useCallback((loading) => {
        setIsLoading(loading);
    }, []);



    return (
        <>

            <div className="min-h-screen bg-[#05051e] overflow-hidden">
                <div className="z-10 pt-16">
                    <div className="container mx-auto px-4 py-4 sm:py-8">
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
                </div>
            </div>


        </>
    );
};

export default Home;