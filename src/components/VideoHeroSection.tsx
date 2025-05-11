'use client';

import React from 'react';

interface VideoHeroSectionProps {
  videoUrl?: string; 
}

const VideoHeroSection: React.FC<VideoHeroSectionProps> = ({ 
  videoUrl = "/videos/Hero_v2_1.mp4"
}) => {
  const videoSrc = "/videos/Hero_v2_1_high_quality.mp4";

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-screen h-screen overflow-hidden"
      style={{ aspectRatio: '16/9' }}
    >
      <video
        src={videoSrc}
        preload="metadata"
        poster="/images/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
      />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Scroll Down Button */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10"
        aria-label="Scroll to next section"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  );
};

export default VideoHeroSection; 