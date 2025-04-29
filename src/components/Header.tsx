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
          background: 'rgba(255, 255, 255, 0.1)',
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
          <svg 
            width="20" 
            height="16" 
            viewBox="0 0 20 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ border: '2px solid #FFFFFF' }}
          >
            {isMuted ? (
              <path d="M1 10V6C1 5.44772 1.44772 5 2 5H5L9 1V15L5 11H2C1.44772 11 1 10.5523 1 10Z" stroke="white" strokeWidth="2" />
            ) : (
              <>
                <path d="M1 10V6C1 5.44772 1.44772 5 2 5H5L9 1V15L5 11H2C1.44772 11 1 10.5523 1 10Z" stroke="white" strokeWidth="2" />
                <path d="M16 8C16 6.4087 15.3679 4.88258 14.2426 3.75736C13.1174 2.63214 11.5913 2 10 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 10C14 9.20435 13.6839 8.44129 13.1213 7.87868C12.5587 7.31607 11.7956 7 11 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 