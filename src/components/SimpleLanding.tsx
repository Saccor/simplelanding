"use client"

import React, { useEffect, useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
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
  videoUrl = "/videos/Hero v2.mp4",
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

  // Initialize scroll observer
  useEffect(() => {
    const cleanup = initScrollObserver();
    return cleanup;
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("SimpleLanding props:", {
      videoUrl,
      emailHeading,
      emailSubtext,
      emailImage
    });
  }, [videoUrl, emailHeading, emailSubtext, emailImage]);

  // Update muted state when initialMuted prop changes
  useEffect(() => {
    setIsMuted(initialMuted);
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
    <main className="flex flex-col w-full">
      {/* Fixed Header - always visible */}
      <Header 
        isMuted={isMuted} 
        onToggleMute={handleToggleMute} 
      />
      
      {/* Fullscreen Hero Section */}
      <HeroSection
        videoUrl={videoUrl}
        mobileVideoUrl={mobileVideoUrl}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Content Sections */}
      <div id="content" className="w-full">
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

        {/* Email Section */}
        <EmailSection
          emailHeading={emailHeading}
          emailSubtext={emailSubtext}
          emailImage={emailImage}
        />
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
} 