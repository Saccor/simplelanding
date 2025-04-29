'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMuted, onToggleMute }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;

  // This helps avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Calculate sound button position based on screen size
  const getSoundButtonPosition = () => {
    const isExtraSmall = width <= breakpoints.xs;
    
    if (isLargeDesktop) {
      return {
        right: '124px'
      };
    } else if (isDesktop) {
      return {
        right: '50px'
      };
    } else if (isTablet) {
      return {
        right: '24px'
      };
    } else if (isExtraSmall) {
      // Extra small screens like iPhone SE
      return {
        right: '6px' // Even closer to the edge for tiny screens
      };
    } else {
      // Mobile positioning
      return {
        right: '12px'
      };
    }
  };

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

  // Get button size based on screen size
  const getButtonSize = () => {
    if (width <= breakpoints.xs) {
      return {
        width: '32px', // Smaller button for iPhone SE
        height: '32px',
        top: '12px' // Reduced top margin
      };
    }
    
    return {
      width: '40px',
      height: '40px',
      top: '24px'
    };
  };

  // Only calculate these values client-side to avoid hydration mismatches
  const headerPadding = mounted ? getHeaderPadding() : '64px 124px';
  const buttonSize = mounted ? getButtonSize() : { width: '40px', height: '40px', top: '24px' };
  const headerHeight = mounted ? (isExtraSmall ? '60px' : isMobile ? '70px' : '87px') : '87px';
  
  // Logo and icon sizes
  const logoWidth = mounted ? (isExtraSmall ? 70 : isMobile ? 90 : 118.15) : 118.15;
  const logoHeight = mounted ? (isExtraSmall ? 24 : isMobile ? 32 : 41) : 41;
  const iconSize = mounted ? (isExtraSmall ? "18" : "24") : "24";

  return (
    <header 
      className={`fixed w-full flex justify-between items-center z-[4] transition-colors duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}
      style={{
        padding: headerPadding,
        height: headerHeight,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      {/* Spacer for left side to balance the layout */}
      <div className="flex-1"></div>
      
      {/* Centered Logo */}
      <div className="flex-1 flex justify-center items-center" style={{ zIndex: 0 }}>
        <Image 
          src="/arfve-logo.svg"
          alt="Arfve"
          width={logoWidth}
          height={logoHeight}
          priority
        />
      </div>
      
      {/* Empty div for right side to maintain layout */}
      <div className="flex-1"></div>
    </header>
  );
};

export default Header; 