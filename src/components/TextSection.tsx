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

  const { width, isMobile, isTablet, isDesktop, isLargeDesktop, breakpoint } = useWindowSize();
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

  // Get text classes based on screen size
  const getTextClasses = () => {
    let textSize = '';
    let lineHeight = '';
    let maxWidth = '';
    
    if (isExtraSmall) {
      textSize = 'text-lg';
      lineHeight = 'leading-[26px]';
      maxWidth = 'max-w-[92%]';
    } else if (isMobile) {
      textSize = 'text-2xl';
      lineHeight = 'leading-9';
      maxWidth = 'max-w-[85%]';
    } else if (isTablet) {
      textSize = 'text-3xl';
      lineHeight = 'leading-[48px]';
      maxWidth = 'max-w-[70%]';
    } else if (isDesktop) {
      textSize = 'text-4xl';
      lineHeight = 'leading-[54px]';
      maxWidth = 'max-w-[618px]';
    } else {
      textSize = 'text-[40px]';
      lineHeight = 'leading-[60px]';
      maxWidth = 'max-w-[618px]';
    }
    
    return `font-normal text-center tracking-[-0.02em] text-[#192124] uppercase font-['Poppins',_sans-serif] ${textSize} ${lineHeight} ${maxWidth} mx-auto`;
  };

  // Get section height based on screen size
  const getSectionHeight = () => {
    if (isExtraSmall) return 'h-[340px]';
    if (isMobile) return 'h-[400px]';
    if (isTablet) return 'h-[450px]';
    return 'h-[522px]';
  };

  return (
    <section className="w-full bg-white">
      <div 
        ref={containerRef} 
        className={`w-full mx-auto flex items-center justify-center max-w-[1440px] ${mounted ? getSectionHeight() : 'h-[522px]'}`}
      >
        <div className="w-full h-full flex items-center justify-center relative" style={{ perspective: '1000px' }}>
          <div className="relative overflow-hidden w-full px-2 flex justify-center">
            {textLines.map((line, i) => {
              const isActive = i === activeIndex;
              
              return (
                <div
                  key={i}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-out ${
                    isActive 
                      ? 'opacity-100 translate-y-0 relative' 
                      : 'opacity-0 translate-y-5 absolute'
                  }`}
                >
                  <p className={mounted ? getTextClasses() : 'font-normal text-center tracking-[-0.02em] text-[#192124] uppercase font-[\'Poppins\',_sans-serif] text-[40px] leading-[60px] max-w-[618px] mx-auto'}>
                    {line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Indicators showing progress */}
      <div className="w-full flex justify-center mt-4">
        <div className="flex space-x-1.5">
          {textLines.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-[#a75c31] scale-110' : 'bg-[#D9D9D9] scale-100'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 