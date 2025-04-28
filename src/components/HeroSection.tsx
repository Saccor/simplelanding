'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

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
  const videoRef = useRef<HTMLVideoElement>(null);

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
    }
  }, [isMuted]);

  return (
    <section className="w-full bg-black">
      <div className="relative w-full" style={{ height: 'calc(100vh - 80px)', minHeight: '520px', maxHeight: '90vh' }}>
        {/* Video */}
        <div className="absolute inset-0 w-full overflow-hidden">
          <video
            ref={videoRef}
            className={`
              absolute inset-0 w-full h-full
              object-cover object-center
              transition-opacity duration-700
              ${isVideoLoading ? 'opacity-0' : 'opacity-100'}
            `}
            playsInline
            muted={isMuted}
            loop
            autoPlay
            preload="auto"
            controls={false}
            crossOrigin="anonymous"
            style={{ width: '100%', height: '100%' }}
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
            <div className="absolute inset-0 w-full bg-black flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Overlay for better visibility */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Video Controls */}
          <button
            onClick={onToggleMute}
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
      </div>
    </section>
  );
};

export default HeroSection; 