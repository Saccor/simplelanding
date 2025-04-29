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
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();

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
    const basePosition = 1306;
    const isExtraSmall = width <= breakpoints.xs;
    
    if (isLargeDesktop) {
      return {
        left: `${basePosition}px`,
        right: 'auto'
      };
    } else if (isDesktop) {
      // Position from right for large screens
      return {
        left: 'auto',
        right: '50px'
      };
    } else if (isTablet) {
      // Position from right for tablets
      return {
        left: 'auto',
        right: '24px'
      };
    } else if (isExtraSmall) {
      // Extra small screens like iPhone SE
      return {
        left: 'auto',
        right: '6px' // Even closer to the edge for tiny screens
      };
    } else {
      // Mobile positioning
      return {
        left: 'auto',
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

  const soundButtonPosition = getSoundButtonPosition();
  const headerPadding = getHeaderPadding();
  const buttonSize = getButtonSize();
  const isExtraSmall = width <= breakpoints.xs;

  return (
    <header 
      className={`fixed w-full flex justify-center items-center z-[4] transition-colors duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}
      style={{
        padding: headerPadding,
        height: isExtraSmall ? '60px' : isMobile ? '70px' : '87px', // Reduced height for tiny screens
        left: '0px',
        top: '0px',
        isolation: 'isolate',
        maxWidth: '100%',
        margin: '0 auto',
        right: '0',
      }}
    >
      {/* Centered Logo */}
      <div className="relative" style={{ order: 0, flexGrow: 0, zIndex: 0 }}>
        <Image 
          src="/arfve-logo.svg"
          alt="Arfve"
          width={isExtraSmall ? 70 : isMobile ? 90 : 118.15} // Smaller logo for iPhone SE
          height={isExtraSmall ? 24 : isMobile ? 32 : 41}
          priority
        />
      </div>
      
      {/* Sound Button (Right Side) */}
      <div 
        style={{ 
          position: 'absolute',
          width: buttonSize.width,
          height: buttonSize.height,
          ...soundButtonPosition,
          top: buttonSize.top,
          background: '#333333',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isExtraSmall ? '2px 1px' : '4px 2px', // Smaller padding for tiny screens
          order: 1,
          flexGrow: 0,
          zIndex: 1
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
            <svg width={isExtraSmall ? "18" : "24"} height={isExtraSmall ? "18" : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            // Unmuted version
            <svg width={isExtraSmall ? "18" : "24"} height={isExtraSmall ? "18" : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white"/>
              <path d="M15.54 8.46C16.1528 9.07286 16.496 9.91307 16.496 10.79C16.496 11.6669 16.1528 12.5071 15.54 13.12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header; 