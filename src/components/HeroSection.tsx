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
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;

  // This helps avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Video loading effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Video URL:', videoUrl); // Debug log
    
    const handleLoadedData = () => {
      console.log('Video loaded successfully'); // Debug log
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
    
    // Add play event listener for debugging
    video.addEventListener('play', () => {
      console.log('Video playing, muted:', video.muted);
    });
    
    // Add pause event listener for debugging
    video.addEventListener('pause', () => {
      console.log('Video paused');
    });
    
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError as EventListener);
    };
  }, [videoUrl]); // Added videoUrl as dependency

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

  // Calculate sound button position based on screen size
  const getSoundButtonPosition = () => {
    if (isLargeDesktop) {
      return {
        right: '124px',
        top: '24px'
      };
    } else if (isDesktop) {
      return {
        right: '50px',
        top: '24px'
      };
    } else if (isTablet) {
      return {
        right: '24px',
        top: '24px'
      };
    } else if (isExtraSmall) {
      // Extra small screens like iPhone SE
      return {
        right: '6px', // Even closer to the edge for tiny screens
        top: '12px'
      };
    } else {
      // Mobile positioning
      return {
        right: '12px',
        top: '24px'
      };
    }
  };

  // Get button size based on screen size
  const getButtonSize = () => {
    if (width <= breakpoints.xs) {
      return {
        width: '32px', // Smaller button for iPhone SE
        height: '32px'
      };
    }
    
    return {
      width: '40px',
      height: '40px'
    };
  };

  // Only calculate these values client-side to avoid hydration mismatches
  const buttonPosition = mounted ? getSoundButtonPosition() : { top: '24px', right: '124px' };
  const buttonSize = mounted ? getButtonSize() : { width: '40px', height: '40px' };
  
  // Icon size
  const iconSize = mounted ? (isExtraSmall ? "18" : "24") : "24";

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{
        minHeight: '520px'
      }}
    >
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
        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Subtle Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Scroll Down Button - Centered at bottom */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[3] flex flex-col items-center cursor-pointer focus:outline-none group scroll-down-btn"
        aria-label="Scroll down to content"
        style={{
          bottom: '5%' // Position from bottom
        }}
      >
        <div className="animate-bounce">
          <svg width="72" height="23" viewBox="0 0 72 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 1.81059L36 21.0569L70 1.8106" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Sound Button - Absolute position in Hero section */}
      <div 
        className="absolute z-[5]"
        style={{ 
          top: buttonPosition.top,
          right: buttonPosition.right
        }}
      >
        <div 
          style={{ 
            width: buttonSize.width,
            height: buttonSize.height,
            background: '#333333',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: mounted && isExtraSmall ? '2px 1px' : '4px 2px'
          }}
        >
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