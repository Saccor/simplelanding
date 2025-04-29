'use client';

import React, { useRef, useEffect, useState } from 'react';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

interface TextSectionProps {
  textLines?: string[];
  autoChangeInterval?: number;
}

export default function TextSection({
  textLines = [
    "WE'RE BUILDING TECHNOLOGY",
    "THAT'S MORE THAN SMART",
    "IT'S INTELLIGENT, SUSTAINABLE, AND DESIGNED WITH PURPOSE.",
    "THIS ISN'T JUST A COMPANY",
    "IT'S A CHALLENGE TO THE INDUSTRY.",
    "IT'S A COMMITMENT TO A BETTER WAY",
    "IT'S A CALL TO EVERYONE WHO BELIEVES IN A FUTURE WHERE TECHNOLOGY WORKS FOR US—NOT AGAINST US."
  ],
  autoChangeInterval = 3500
}: TextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // This will help avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;

  // Auto-cycle text effect with clean interval management
  useEffect(() => {
    if (!mounted) return;
    
    const intervalId = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % textLines.length);
    }, autoChangeInterval);
    
    return () => clearInterval(intervalId);
  }, [mounted, textLines.length, autoChangeInterval]);

  useEffect(() => {
    // Add Poppins font if not already in the document
    if (!document.getElementById('poppins-font')) {
      const link = document.createElement('link');
      link.id = 'poppins-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Calculate positioning based on screen size
  const getTextPosition = () => {
    if (isLargeDesktop) {
      return {
        width: '618px',
        fontSize: '40px',
        lineHeight: '60px',
      };
    } else if (isDesktop) {
      const textWidth = Math.min(618, width * 0.6);
      return {
        width: `${textWidth}px`,
        fontSize: '36px',
        lineHeight: '54px',
      };
    } else if (isTablet) {
      const textWidth = width * 0.7;
      return {
        width: `${textWidth}px`,
        fontSize: '32px',
        lineHeight: '48px',
      };
    } else if (isExtraSmall) {
      const textWidth = width * 0.92;
      return {
        width: `${textWidth}px`,
        fontSize: '18px',
        lineHeight: '26px',
      };
    } else {
      const textWidth = width * 0.85;
      return {
        width: `${textWidth}px`,
        fontSize: '24px',
        lineHeight: '36px',
      };
    }
  };

  const textPosition = mounted ? getTextPosition() : { 
    width: '618px', 
    fontSize: '40px', 
    lineHeight: '60px',
  };

  const getSectionHeight = () => {
    if (isExtraSmall) return '340px';
    if (isMobile) return '400px';
    if (isTablet) return '450px';
    return '522px';
  };

  const sectionHeight = mounted ? getSectionHeight() : '522px';

  return (
    <section className="w-full bg-white">
      <div 
        ref={containerRef} 
        className="w-full mx-auto flex items-center justify-center max-w-[1440px]"
        style={{ height: sectionHeight }}
      >
        <div 
          className="w-full h-full flex items-center justify-center relative"
          style={{ perspective: '1000px' }}
        >
          <div className="relative overflow-hidden" style={{ width: textPosition.width }}>
            {textLines.map((line, i) => {
              const isActive = i === activeIndex;
              
              return (
                <div
                  key={i}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translate3d(0, ${isActive ? 0 : 20}px, 0)`,
                    transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                    pointerEvents: 'none',
                    position: isActive ? 'relative' : 'absolute',
                  }}
                >
                  <p
                    className="font-normal text-center tracking-[-0.02em] text-[#192124] uppercase"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: textPosition.fontSize,
                      lineHeight: textPosition.lineHeight,
                      maxWidth: '100%',
                      padding: mounted && isExtraSmall ? '0 4px' : '0',
                      wordBreak: mounted && isExtraSmall ? 'break-word' : 'normal'
                    }}
                  >
                    {line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Optional subtle indicators showing progress */}
      <div className="w-full flex justify-center mt-4">
        <div className="flex space-x-1.5">
          {textLines.map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ 
                background: i === activeIndex ? '#a75c31' : '#D9D9D9',
                transform: i === activeIndex ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 