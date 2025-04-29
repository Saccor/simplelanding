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
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
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

  // Get padding based on screen size
  const getHeaderPadding = () => {
    if (width <= breakpoints.xs) {
      // Extra small screens like iPhone SE
      return '12px 6px'; // Reduced padding for tiny screens
    } else if (isMobile) {
      return '24px 12px';
    } else if (isTablet) {
      return '32px 24px';
    } else if (isDesktop) {
      return '48px 64px';
    }
    return '64px 124px'; // Large desktop
  };

  // Only calculate these values client-side to avoid hydration mismatches
  const headerPadding = mounted ? getHeaderPadding() : '64px 124px';
  const headerHeight = mounted ? (isExtraSmall ? '60px' : isMobile ? '70px' : '87px') : '87px';
  
  // Logo sizes
  const logoWidth = mounted ? (isExtraSmall ? 70 : isMobile ? 90 : 118.15) : 118.15;
  const logoHeight = mounted ? (isExtraSmall ? 24 : isMobile ? 32 : 41) : 41;

  // Determine which logo to use based on which section we're in
  const logoSrc = inHeroSection ? "/arfve-logo.svg" : "/arfve-logo-dark.svg";

  return (
    <header 
      className={`fixed w-full flex justify-between items-center z-[4] transition-all duration-300 ${inHeroSection ? 'bg-transparent' : 'bg-white/95 shadow-sm'}`}
      style={{
        padding: headerPadding,
        height: headerHeight,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      {/* Spacer for left side to balance the layout */}
      <div className="flex-1"></div>
      
      {/* Centered Logo with transition */}
      <div className="flex-1 flex justify-center items-center" style={{ zIndex: 0 }}>
        <div className="transition-opacity duration-300">
          <Image 
            src={logoSrc}
            alt="Arfve"
            width={logoWidth}
            height={logoHeight}
            priority
            className="transition-all duration-300"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>
      
      {/* Spacer for right side to balance the layout */}
      <div className="flex-1"></div>
    </header>
  );
};

export default Header; 