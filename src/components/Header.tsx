'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMuted, onToggleMute }) => {
  const [inHeroSection, setInHeroSection] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop, breakpoint } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;

  // This helps avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect - detect which section we're in
  useEffect(() => {
    const handleScroll = () => {
      // Get content section element
      const contentSection = document.getElementById('content');
      
      if (contentSection) {
        // Get the position of the content section
        const contentPosition = contentSection.getBoundingClientRect().top;
        
        // We're in hero section if content is below viewport top (with a small buffer)
        const isInHero = contentPosition > 50;
        
        if (isInHero !== inHeroSection) {
          setInHeroSection(isInHero);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inHeroSection]);

  // Get header classes based on screen size
  const getHeaderClasses = () => {
    let paddingClasses = '';
    let heightClass = '';
    
    // Padding based on screen size
    if (isExtraSmall) {
      paddingClasses = 'px-1.5 py-3';
      heightClass = 'h-[60px]';
    } else if (isMobile) {
      paddingClasses = 'px-3 py-6';
      heightClass = 'h-[70px]';
    } else if (isTablet) {
      paddingClasses = 'px-6 py-8';
      heightClass = 'h-[80px]';
    } else if (isDesktop) {
      paddingClasses = 'px-16 py-12';
      heightClass = 'h-[87px]';
    } else {
      paddingClasses = 'px-[124px] py-16';
      heightClass = 'h-[87px]';
    }
    
    return `fixed w-full flex justify-between items-center z-[4] transition-all duration-300 ${paddingClasses} ${heightClass} ${inHeroSection ? 'bg-transparent' : 'bg-white/95 shadow-sm'}`;
  };
  
  // Logo sizes
  const logoWidth = mounted ? (isExtraSmall ? 70 : isMobile ? 90 : 118.15) : 118.15;
  const logoHeight = mounted ? (isExtraSmall ? 24 : isMobile ? 32 : 41) : 41;

  // Determine which logo to use based on which section we're in
  const logoSrc = inHeroSection ? "/arfve-logo.svg" : "/arfve-logo-dark.svg";

  return (
    <header 
      className={mounted ? getHeaderClasses() : "fixed w-full flex justify-between items-center z-[4] transition-all duration-300 px-[124px] py-16 h-[87px] bg-transparent"}
    >
      {/* Spacer for left side to balance the layout */}
      <div className="flex-1"></div>
      
      {/* Centered Logo with transition */}
      <div className="flex-1 flex justify-center items-center z-0">
        <div className="transition-opacity duration-300">
          <Image 
            src={logoSrc}
            alt="Arfve"
            width={logoWidth}
            height={logoHeight}
            priority
            className="transition-all duration-300 w-auto h-auto"
          />
        </div>
      </div>
      
      {/* Spacer for right side to balance the layout */}
      <div className="flex-1"></div>
    </header>
  );
};

export default Header; 