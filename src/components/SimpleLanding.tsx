"use client"

import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import TextSection from './TextSection';
import EmailSection from './EmailSection';
import Footer from './Footer';

interface SimpleLandingProps {
  // Hero Section Props
  imageUrl?: string;
  
  // Text Section Props
  mainHeading?: string;
  subHeading?: string;
  
  // Email Section Props
  emailHeading?: string;
  emailSubtext?: string;
  emailImage?: string;
}

export default function SimpleLanding({
  imageUrl = "/images/image.png",
  mainHeading = "WE'RE BUILDING TECHNOLOGY",
  subHeading = "THAT'S MORE THAN SMART",
  emailHeading = "We're shaping a sustainable future for audio devices.",
  emailSubtext = "More to come - stay tuned",
  emailImage = "/images/Arfve5.jpg",
}: SimpleLandingProps) {
  return (
    <main className="flex flex-col w-full">
      {/* Fixed Header - always visible */}
      <Header />
      
      {/* Fullscreen Hero Section */}
      <HeroSection
        imageUrl={imageUrl}
      />

      {/* Content Sections */}
      <div id="content" className="w-full content-container">
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