'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

interface HeroSectionProps {
  videoUrl: string;
  mobileVideoUrl?: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  videoUrl, 
  mobileVideoUrl, 
  isMuted, 
  onToggleMute 
}) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop, breakpoint } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;

  // This helps avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Video loading effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedData = () => {
      setIsVideoLoading(false);
      video.play().catch(error => {
        console.error('Video autoplay failed:', error);
        setIsVideoLoading(false);
      });
    };

    const handleError = (error: Event) => {
      console.error('Video error:', error);
      setIsVideoLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError as EventListener);
    
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError as EventListener);
    };
  }, [videoUrl]); 

  // Update video muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      
      // If unmuting, also ensure video is playing (fixes autoplay policy issues)
      if (!isMuted && videoRef.current.paused) {
        videoRef.current.play().catch(error => {
          console.error('Failed to play video after unmuting:', error);
        });
      }
    }
  }, [isMuted]);

  // Handle scroll down button click
  const handleScrollDown = () => {
    // Try to find the content section by ID
    const contentSection = document.getElementById('content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback to next sibling if content ID not found
      const nextSection = sectionRef.current?.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Get button size based on screen size - using tailwind classes
  const getSoundButtonClasses = () => {
    let positionClasses = '';
    let sizeClasses = '';
    
    // Position classes
    if (isExtraSmall) {
      positionClasses = 'top-3 right-1.5';
    } else if (isMobile) {
      positionClasses = 'top-6 right-3';
    } else if (isTablet) {
      positionClasses = 'top-6 right-6';
    } else if (isDesktop) {
      positionClasses = 'top-6 right-12';
    } else {
      positionClasses = 'top-6 right-[124px]';
    }
    
    // Size classes
    sizeClasses = isExtraSmall ? 'w-8 h-8' : 'w-10 h-10';
    
    return `absolute z-[5] ${positionClasses} ${sizeClasses}`;
  };
  
  // Icon size
  const iconSize = mounted ? (isExtraSmall ? "18" : "24") : "24";

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black min-h-[520px]"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        playsInline
        muted={isMuted}
        loop
        autoPlay
        preload="auto"
        controls={false}
        crossOrigin="anonymous"
      >
        {/* Use source with media query for mobile */}
        {mobileVideoUrl && (
          <source 
            src={mobileVideoUrl} 
            type="video/mp4" 
            media="(max-width: 768px)"
          />
        )}
        <source 
          src={videoUrl} 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading Spinner */}
      {isVideoLoading && (
        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Subtle Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Scroll Down Button - Centered at bottom */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 z-[3] flex flex-col items-center cursor-pointer focus:outline-none group scroll-down-btn"
        aria-label="Scroll down to content"
      >
        <div className="animate-bounce">
          <svg width="72" height="23" viewBox="0 0 72 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 1.81059L36 21.0569L70 1.8106" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Sound Button with dynamic Tailwind classes */}
      <div className={mounted ? getSoundButtonClasses() : "absolute z-[5] top-6 right-[124px] w-10 h-10"}>
        <div className={`flex justify-center items-center rounded bg-[#333333] w-full h-full ${mounted && isExtraSmall ? 'p-0.5' : 'p-1'}`}>
          <button 
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="flex items-center justify-center w-full h-full"
          >
            <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
            {isMuted ? (
              // Muted version
              <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white"/>
                <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              // Unmuted version
              <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white"/>
                <path d="M15.54 8.46C16.1528 9.07286 16.496 9.91307 16.496 10.79C16.496 11.6669 16.1528 12.5071 15.54 13.12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 