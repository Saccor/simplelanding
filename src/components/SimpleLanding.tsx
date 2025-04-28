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
  const [imageLoading, setImageLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero Section Effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Attempting to load video from URL:', videoUrl);
    
    // Add a fetch request to check if the video file is accessible
    fetch(videoUrl)
      .then(response => {
        if (response.ok) {
          console.log('Video file exists and is accessible', response.status);
        } else {
          console.error('Video file fetch failed:', response.status, response.statusText);
        }
      })
      .catch(error => {
        console.error('Error checking video file:', error);
      });

    const handleLoadedData = () => {
      console.log('Video loaded successfully');
      setIsVideoLoading(false);
      video.play().catch(error => {
        console.error('Video autoplay failed:', error);
        setIsVideoLoading(false);
      });
    };

    const handleError = (event: Event) => {
      console.error('Video loading error:', event);
      setIsVideoLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError as EventListener);
    
    // Add additional event listeners for better debugging
    video.addEventListener('loadstart', () => console.log('Video load started'));
    video.addEventListener('progress', () => console.log('Video download in progress'));
    video.addEventListener('canplay', () => console.log('Video can start playing'));
    
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError as EventListener);
      video.removeEventListener('loadstart', () => console.log('Video load started'));
      video.removeEventListener('progress', () => console.log('Video download in progress'));
      video.removeEventListener('canplay', () => console.log('Video can start playing'));
    };
  }, [videoUrl]);

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
    <main className="min-h-screen flex flex-col">
      <Header 
        isMuted={isMuted} 
        onToggleMute={handleToggleMute} 
      />
      
      {/* Hero Section */}
      <section className="w-full h-screen bg-black relative pt-16">
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted={isMuted}
            loop
            autoPlay
            preload="auto"
            controls={false}
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
            className="absolute bottom-6 right-6 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-20"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <Image
                src="/volume-off.svg"
                alt="Unmute"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            ) : (
              <Image
                src="/volume-on.svg"
                alt="Mute"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            )}
          </button>
        </div>
      </section>
      
      <TextSection 
        mainHeading={mainHeading}
        subHeading={subHeading}
      />
      
      <EmailSection 
        emailHeading={emailHeading}
        emailSubtext={emailSubtext}
        emailImage={emailImage}
      />
      
      <Footer />
    </main>
  );
} 