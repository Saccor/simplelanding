'use client';

import React, { useRef, useEffect, useState } from 'react';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation variants
  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // This will help avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set up text rotation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % textLines.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [textLines.length]);

  const { width, isMobile, isTablet, isDesktop, isLargeDesktop, breakpoint } = useWindowSize();
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

    // Add the custom CSS class
    if (!document.getElementById('textsection-styles')) {
      const style = document.createElement('style');
      style.id = 'textsection-styles';
      style.innerHTML = `
        .textsection-line--1 {
          /* Typography */
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 40px;
          line-height: 60px;
          letter-spacing: -0.02em;
          text-transform: uppercase;

          /* Color */
          color: #192124;
        }
        
        @media (max-width: 1024px) {
          .textsection-line--1 {
            font-size: 32px;
            line-height: 48px;
          }
        }
        
        @media (max-width: 768px) {
          .textsection-line--1 {
            font-size: 24px;
            line-height: 36px;
          }
        }
        
        @media (max-width: 480px) {
          .textsection-line--1 {
            font-size: 18px;
            line-height: 26px;
          }
        }
      `;
      document.head.appendChild(style);
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
      maxWidth = 'max-w-[90%]';
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
    
    return `textsection-line--1 ${maxWidth} mx-auto`;
  };

  // Get section height based on screen size
  const getSectionHeight = () => {
    if (isExtraSmall) return 'h-[340px]';
    if (isMobile) return 'h-[400px]';
    if (isTablet) return 'h-[450px]';
    return 'h-[522px]';
  };

  return (
    <section className="w-full bg-white overflow-x-hidden">
      <div 
        ref={containerRef} 
        className={`w-full mx-auto flex items-center justify-center max-w-[100vw] sm:max-w-screen-lg lg:max-w-screen-xl ${mounted ? getSectionHeight() : 'h-[522px]'}`}
      >
        <div className="w-full h-full flex items-center justify-center relative" style={{ perspective: '1000px' }}>
          <div className="relative overflow-hidden w-full px-1 xs:px-2 flex justify-center">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <p className={mounted ? getTextClasses() : 'textsection-line--1 max-w-[90%] sm:max-w-[70%] lg:max-w-[618px] mx-auto'}>
                  {textLines[activeIndex]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
} 