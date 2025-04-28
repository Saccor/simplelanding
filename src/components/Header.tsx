'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMuted, onToggleMute }) => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      style={{
        position: 'fixed',
        width: '100%',
        height: '87px',
        left: '0px',
        top: '0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        isolation: 'isolate',
        zIndex: 10,
        maxWidth: '100%'
      }}
      className={`${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'} transition-colors duration-300`}
    >
      {/* Sound Button (Right Side) */}
      <div style={{ position: 'absolute', right: '50px' }}>
        <button 
          className="text-white w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
          {!isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="22" y1="9" x2="16" y2="15"></line>
              <line x1="16" y1="9" x2="22" y2="15"></line>
            </svg>
          )}
        </button>
      </div>
      
      {/* Centered Logo */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <Image 
          src="/arfve-logo.svg"
          alt="Arfve"
          width={120}
          height={42}
          priority
        />
      </div>
    </header>
  );
};

export default Header; 