'use client';

import React, { useRef, useEffect, useState } from 'react';

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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
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

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [textLines.length]);

  return (
    <section className="relative flex justify-center bg-white overflow-hidden">
      <div 
        ref={containerRef} 
        className="relative w-[1440px] h-[522px] flex items-center justify-center"
        style={{
          maxWidth: '100%',  // For responsiveness
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center w-full h-full px-4 md:px-6">
          {textLines.map((line, i) => (
            <p
              key={i}
              className="text-line absolute font-normal text-[18px] xs:text-[22px] sm:text-[26px] md:text-[35px] lg:text-[40px] leading-[1.3] text-center tracking-[-0.02em] text-[#192124] transition-all duration-700"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transform: i === activeIndex ? 'translateY(0)' : 
                          i < activeIndex ? 'translateY(-40px)' : 'translateY(40px)',
                pointerEvents: 'none'
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
} 