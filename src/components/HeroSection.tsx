'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

interface HeroSectionProps {
  imageUrl?: string; 
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  imageUrl = "/images/image.png"
}) => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
  const isExtraSmall = width <= 320;

  // This helps avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black">
      {isExtraSmall && mounted && (
        <div className="w-full h-16 bg-white"></div>
      )}
      <div 
        className="relative w-full" 
        style={{ height: 'clamp(220px, 50vh, 400px)' }}
      >
        <Image
          src={imageUrl}
          alt="Hero Image"
          priority
          fill
          className="object-cover object-center"
          quality={90}
        />
      </div>
      
      {/* Subtle Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/20"></div>
    </section>
  );
};

export default HeroSection; 