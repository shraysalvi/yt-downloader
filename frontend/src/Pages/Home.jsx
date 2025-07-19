import React, { useState, useCallback } from 'react';
import { Hero, Features, HowDownload, ChooseUs, DownloadOptions } from '../Components/Common';
import MediaQualities from '../Components/Queue/MediaQualities';
import HomeFaq from '../Components/Home/HomeFaq';

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
                        {/* Only pass video formats to VideoQualities */}
                        <MediaQualities videoUrl={videoUrl} onLoadingChange={handleLoadingChange} showType="video" />
                        <section className="sm:mt-40 mt-30 sm:mb-20 px-4 mx-auto max-w-6xl space-y-24">
                            <Features />
                            <HowDownload />
                            <ChooseUs />
                            <DownloadOptions />
                            <HomeFaq />
                        </section>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Home;