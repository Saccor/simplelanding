'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMuted, onToggleMute }) => {
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrolled]);

  // Calculate sound button position based on screen width
  const getSoundButtonPosition = () => {
    const basePosition = 1306;
    if (windowWidth < 1440) {
      // Calculate right position as percentage of screen width
      const rightPercentage = ((1440 - basePosition) / 1440) * 100;
      return {
        left: 'auto',
        right: `${rightPercentage}%`
      };
    }
    return {
      left: `${basePosition}px`,
      right: 'auto'
    };
  };

  const soundButtonPosition = getSoundButtonPosition();

  return (
    <header 
      className={`fixed w-full flex justify-center items-center z-[4] transition-colors duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}
      style={{
        padding: windowWidth < 768 ? '32px 24px' : '64px 124px',
        height: '87px',
        left: '0px',
        top: '0px',
        isolation: 'isolate',
        maxWidth: '1440px',
        margin: '0 auto',
        right: '0',
      }}
    >
      {/* Centered Logo */}
      <div className="relative" style={{ order: 0, flexGrow: 0, zIndex: 0 }}>
        <Image 
          src="/arfve-logo.svg"
          alt="Arfve"
          width={118.15}
          height={41}
          priority
        />
      </div>
      
      {/* Sound Button (Right Side) */}
      <div 
        style={{ 
          position: 'absolute',
          width: '40px',
          height: '40px',
          ...soundButtonPosition,
          top: '24px',
          background: '#333333',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4px 2px',
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            // Unmuted version
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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