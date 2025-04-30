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
  const isExtraSmall = width <= breakpoints.xs;

  // This helps avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black min-h-[520px]"
    >
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full">
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