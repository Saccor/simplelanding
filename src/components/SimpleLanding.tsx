"use client"

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from './Header';
import TextSection from './TextSection';
import EmailSection from './EmailSection';
import Footer from './Footer';

interface SimpleLandingProps {
  // Hero Section Props
  videoUrl?: string;
  mobileVideoUrl?: string;
  
  // Text Section Props
  mainHeading?: string;
  subHeading?: string;
  
  // Email Section Props
  emailHeading?: string;
  emailSubtext?: string;
  emailImage?: string;
  
  // Video Controls Props
  initialMuted?: boolean;
  onMuteChange?: (isMuted: boolean) => void;
}

export default function SimpleLanding({
  videoUrl = "/HeroVideo1.mp4",
  mobileVideoUrl,
  mainHeading = "WE'RE BUILDING TECHNOLOGY",
  subHeading = "THAT'S MORE THAN SMART",
  emailHeading = "We're shaping a sustainable future for audio devices.",
  emailSubtext = "More to come - stay tuned",
  emailImage = "/Arfve6.jpg",
  initialMuted = true,
  onMuteChange
}: SimpleLandingProps) {
  // Hero Section State
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug logging
  useEffect(() => {
    console.log("SimpleLanding props:", {
      emailHeading,
      emailSubtext,
      emailImage
    });
  }, [emailHeading, emailSubtext, emailImage]);

  // Hero Section Effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log('Video loaded successfully!');
      setIsVideoLoading(false);
      video.play().catch(error => {
        console.error('Video autoplay failed:', error);
        setIsVideoLoading(false);
      });
    };

    const handleError = (event: Event) => {
      console.error('Video error:', event);
      setIsVideoLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError as EventListener);
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError as EventListener);
    };
  }, []);

  // Update video muted state when initialMuted prop changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = initialMuted;
      setIsMuted(initialMuted);
    }
  }, [initialMuted]);

  // Hero Section Handlers
  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Notify parent component if callback provided
    if (onMuteChange) {
      onMuteChange(newMutedState);
    }
  };

  return (
    <main>
      <Header 
        isMuted={isMuted} 
        onToggleMute={handleToggleMute} 
      />
      
      {/* Hero Section */}
      <section className="w-full bg-black">
        <div className="relative" style={{ height: 'calc(100vh - 80px)', minHeight: '520px' }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            playsInline
            muted={isMuted}
            loop
            autoPlay
            preload="auto"
          >
            <source 
              src={videoUrl} 
              type="video/mp4" 
            />
            {mobileVideoUrl && (
              <source 
                src={mobileVideoUrl} 
                type="video/mp4" 
                media="(max-width: 768px)"
              />
            )}
            Your browser does not support the video tag.
          </video>
          
          {/* Loading Spinner */}
          {isVideoLoading && (
            <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Overlay for better visibility */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Video Controls */}
          <button
            onClick={handleToggleMute}
            className="absolute bottom-6 right-6 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
          >
            <Image
              src={isMuted ? "/volume-off.svg" : "/volume-on.svg"}
              alt={isMuted ? "Unmute" : "Mute"}
              width={24}
              height={24}
              className="w-6 h-6 text-white"
            />
          </button>
        </div>
      </section>

      {/* Text Section */}
      <section className="w-full bg-white">
        <div className="w-full py-12 md:py-24">
          <div className="w-[92%] lg:w-[80%] xl:w-[618px] mx-auto px-4 md:px-0">
            <h2 className="font-normal 
                       text-[20px] xs:text-[24px] sm:text-[28px] md:text-[40px] lg:text-[50px]
                       leading-[1.3]
                       text-center uppercase tracking-[-0.02em] text-[#192124]
                       transition-all duration-300">
              {mainHeading}
            </h2>
            {subHeading && (
              <p className="font-normal 
                        text-[16px] xs:text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px]
                        leading-[1.3]
                        text-center uppercase tracking-[-0.02em] text-[#192124]
                        transition-all duration-300
                        mt-4 md:mt-6">
                {subHeading}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Use the standalone EmailSection component */}
      <EmailSection
        emailHeading={emailHeading}
        emailSubtext={emailSubtext}
        emailImage={emailImage}
      />
      
      <Footer />
    </main>
  );
} 