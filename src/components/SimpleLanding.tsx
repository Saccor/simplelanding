"use client"

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from './Header';
import TextSection from './TextSection';
import EmailSection from './EmailSection';
import Footer from './Footer';
import { initScrollObserver } from '../utils/scrollObserver';

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

  // Initialize scroll observer
  useEffect(() => {
    const cleanup = initScrollObserver();
    return cleanup;
  }, []);

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
      <section className="w-full bg-black flex justify-center">
        <div className="video-container">
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
          <div className="absolute inset-0 bg-black/30 z-[1]"></div>
          
          {/* Down Arrow */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[2] animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <TextSection
        textLines={[
          mainHeading,
          subHeading,
          "IT'S INTELLIGENT, SUSTAINABLE, AND DESIGNED WITH PURPOSE.",
          "THIS ISN'T JUST A COMPANY",
          "IT'S A CHALLENGE TO THE INDUSTRY.",
          "IT'S A COMMITMENT TO A BETTER WAY",
          "IT'S A CALL TO EVERYONE WHO BELIEVES IN A FUTURE WHERE TECHNOLOGY WORKS FOR US—NOT AGAINST US."
        ]}
      />

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