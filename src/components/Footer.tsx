'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

const Footer: React.FC = () => {
  const { width, isMobile } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;
  const [mounted, setMounted] = useState(false);
  
  // This helps avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use default sizes during SSR, and actual sizes on client
  const logoWidth = mounted ? (isExtraSmall ? 70 : 88) : 88;
  const logoHeight = mounted ? (isExtraSmall ? 21 : 27) : 27;
  const iconSize = mounted ? (isExtraSmall ? "16" : "18") : "18";

  // Server-side default styles
  const defaultStyles = {
    footerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 124px 24px',
      gap: '32px',
      width: '100%',
      maxWidth: '1440px',
      height: 'auto',
      minHeight: '97px',
      background: '#FFFFFF',
      zIndex: 3
    } as React.CSSProperties,
    socialIconsContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '18px',
      height: '30px',
      justifyContent: 'flex-end',
      flex: 1
    } as React.CSSProperties,
    centerLinksContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '12px',
      height: '24px',
      justifyContent: 'center',
      flex: 2,
      fontSize: '14px',
      color: '#192124'
    } as React.CSSProperties
  };

  return (
    <footer className="w-full bg-white flex justify-center">
      <div 
        className="footer-container"
        style={mounted ? {
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'space-between',
          padding: isMobile 
            ? isExtraSmall ? '16px 8px' : '20px 24px' 
            : '32px 124px 24px',
          gap: isMobile ? '12px' : '32px',
          width: '100%',
          maxWidth: '1440px',
          height: 'auto',
          minHeight: isMobile ? 'auto' : '97px',
          background: '#FFFFFF',
          zIndex: 3
        } as React.CSSProperties : defaultStyles.footerContainer}
      >
        {/* Logo (left section) */}
        <div 
          className="flex items-center justify-center"
          style={mounted && isMobile ? { width: '100%' } : {}}
        >
          <Image 
            src="/arfve-logo-dark.svg"
            alt="Arfve"
            width={logoWidth}
            height={logoHeight}
            style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
          />
        </div>

        {/* Center links */}
        <div 
          className="center-links-container"
          style={mounted ? {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: isMobile ? (isExtraSmall ? '8px' : '10px') : '12px',
            height: '24px',
            justifyContent: 'center',
            flex: isMobile ? 'none' : 2,
            width: isMobile ? '100%' : 'auto',
            fontSize: isExtraSmall ? '12px' : '14px',
            color: '#192124'
          } as React.CSSProperties : defaultStyles.centerLinksContainer}
        >
          <Link href="#" className="hover:opacity-80 transition-opacity">
            Privacy policy
          </Link>
          <Link href="#" className="hover:opacity-80 transition-opacity">
            Cookie settings
          </Link>
          <span>© 2025 Arfve</span>
        </div>

        {/* Social Media Icons (right section) */}
        <div 
          className="social-icons-container"
          style={mounted ? {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: isExtraSmall ? '15px' : '18px',
            height: '30px',
            justifyContent: isMobile ? 'center' : 'flex-end',
            flex: isMobile ? 'none' : 1,
            width: isMobile ? '100%' : 'auto'
          } as React.CSSProperties : defaultStyles.socialIconsContainer}
        >
          <Link href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
            <svg className="youtube-icon" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </Link>
          <Link href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
            <svg className="instagram-icon" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </Link>
          <Link href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
            <svg className="linkedin-icon" xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 