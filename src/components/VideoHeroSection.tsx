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
      className="relative w-screen h-screen"
    >
      <video
        src={videoSrc}
        preload="metadata"
        poster="/images/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        onClick={scrollToNextSection}
        className="absolute top-[90%] left-1/2 transform -translate-x-1/2 z-50 bg-transparent p-0 transition-transform duration-300 hover:scale-110"
        aria-label="Scroll to next section"
        style={{ border: 'none', boxShadow: 'none' }}
      >
        <svg 
          width="68" 
          height="20" 
          viewBox="0 0 68 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 hover:stroke-[#00ff88]"
        >
          <polyline 
            points="4,4 34,16 64,4" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
        </svg>
      </button>
    </section>
  );
};

export default VideoHeroSection; 