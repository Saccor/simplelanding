'use client';

import React, { useRef, useEffect, useState } from 'react';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

interface TextSectionProps {
  textLines?: string[];
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
  ]
}: TextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;

  useEffect(() => {
    // Add Poppins font if not already in the document
    if (!document.getElementById('poppins-font')) {
      const link = document.createElement('link');
      link.id = 'poppins-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is scrolled through the viewport
      const scrollPercentage = 1 - (containerBottom / windowHeight);
      
      // Number of possible indices (number of text lines)
      const maxIndex = textLines.length - 1;
      
      // Calculate active index based on scroll percentage
      // Only activate when the section is fully in view and being scrolled through
      if (containerTop < windowHeight && containerBottom > 0) {
        // Map the scroll percentage to an index
        const calculatedIndex = Math.floor(scrollPercentage * (maxIndex + 1));
        // Ensure the index is within bounds
        const boundedIndex = Math.max(0, Math.min(calculatedIndex, maxIndex));
        setActiveIndex(boundedIndex);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculations
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [textLines.length]);

  // Calculate positioning based on screen size
  const getTextPosition = () => {
    if (isLargeDesktop) {
      // Exact specifications for large desktop
      return {
        width: '618px',
        fontSize: '40px',
        lineHeight: '60px'
      };
    } else if (isDesktop) {
      // Desktop - proportional scaling
      const textWidth = Math.min(618, width * 0.6);
      return {
        width: `${textWidth}px`,
        fontSize: '36px',
        lineHeight: '54px'
      };
    } else if (isTablet) {
      // Tablet - proportional sizing
      const textWidth = width * 0.7;
      return {
        width: `${textWidth}px`,
        fontSize: '32px',
        lineHeight: '48px'
      };
    } else if (isExtraSmall) {
      // iPhone SE - even smaller text and narrower container
      const textWidth = width * 0.92; // Wider container for small screens (92% of viewport)
      return {
        width: `${textWidth}px`,
        fontSize: '18px', // Smaller font size for iPhone SE
        lineHeight: '26px' // Tighter line height
      };
    } else {
      // Mobile - smaller text
      const textWidth = width * 0.85;
      return {
        width: `${textWidth}px`,
        fontSize: '24px',
        lineHeight: '36px'
      };
    }
  };

  const textPosition = getTextPosition();

  // Section height adjusts for mobile
  const getSectionHeight = () => {
    if (isExtraSmall) return '340px'; // Shorter for iPhone SE
    if (isMobile) return '400px';
    if (isTablet) return '450px';
    return '522px';
  };

  return (
    <section className="w-full bg-white">
      <div 
        ref={containerRef} 
        className="w-full mx-auto flex items-center justify-center max-w-[1440px] relative"
        style={{ height: getSectionHeight() }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {textLines.map((line, i) => (
            <div
              key={i}
              className="absolute transition-all duration-700"
              style={{
                width: textPosition.width,
                opacity: i === activeIndex ? 1 : 0,
                transform: i === activeIndex ? 'translateY(0)' : 
                          i < activeIndex ? 'translateY(-40px)' : 'translateY(40px)',
                pointerEvents: 'none'
              }}
            >
              <p
                className="font-normal text-center tracking-[-0.02em] text-[#192124] uppercase"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: textPosition.fontSize,
                  lineHeight: textPosition.lineHeight,
                  maxWidth: '100%',
                  height: 'auto',
                  minHeight: isExtraSmall ? '50px' : isMobile ? '80px' : '120px', // Reduced min height for extra small screens
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isExtraSmall ? '0 4px' : '0',
                  wordBreak: isExtraSmall ? 'break-word' : 'normal' // Allow word breaking on very small screens
                }}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 