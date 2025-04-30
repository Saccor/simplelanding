'use client';

import { useState, useEffect } from 'react';

// Define consistent breakpoints for the entire application
export const breakpoints = {
  nano: 60,     // Nano screens (extremely small testing sizes like 53px)
  xxs: 300,     // Ultra small (testing sizes like 219px)
  xs: 480,      // Extra small (phones like iPhone SE)
  sm: 640,      // Small phones
  md: 768,      // Medium (large phones/small tablets)
  lg: 1024,     // Large (tablets/small laptops)
  xl: 1280,     // Extra large (laptops/desktops)
  xxl: 1440,    // Extra extra large (large desktops)
  ultrawide: 1920 // Ultrawide monitors
};

interface WindowSize {
  width: number;
  height: number;
  isNanoScreen: boolean;   // Added for nano screens (53-60px, etc)
  isUltraSmall: boolean;   // Added for extremely small screens
  isMobile: boolean;       // Mobile devices
  isTablet: boolean;       // Tablets
  isDesktop: boolean;      // Desktop screens
  isLargeDesktop: boolean; // Large desktop screens
  isUltrawide: boolean;    // Ultrawide monitors
  breakpoint: 'nano' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'ultrawide';
}

// Default values for server-side rendering - default to mobile for mobile-first approach
const defaultValues: WindowSize = {
  width: 375, // Default to a mobile-like width
  height: 667,
  isNanoScreen: false,
  isUltraSmall: false,
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isLargeDesktop: false,
  isUltrawide: false,
  breakpoint: 'xs'
};

export default function useWindowSize(): WindowSize {
  // Set initial state to values that won't cause hydration mismatches
  const [windowSize, setWindowSize] = useState<WindowSize>(defaultValues);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setHasMounted(true);
    
    // Handler to call on window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine current breakpoint
      let breakpoint: 'nano' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'ultrawide';
      if (width < breakpoints.nano) breakpoint = 'nano';
      else if (width < breakpoints.xxs) breakpoint = 'xxs';
      else if (width < breakpoints.xs) breakpoint = 'xs';
      else if (width < breakpoints.sm) breakpoint = 'sm';
      else if (width < breakpoints.md) breakpoint = 'md';
      else if (width < breakpoints.lg) breakpoint = 'lg';
      else if (width < breakpoints.xl) breakpoint = 'xl';
      else if (width < breakpoints.xxl) breakpoint = 'xxl';
      else breakpoint = 'ultrawide';
      
      // Update all values at once to avoid multiple re-renders
      setWindowSize({
        width,
        height,
        isNanoScreen: width < breakpoints.nano,
        isUltraSmall: width < breakpoints.xxs && width >= breakpoints.nano,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg && width < breakpoints.xxl,
        isLargeDesktop: width >= breakpoints.xxl && width < breakpoints.ultrawide,
        isUltrawide: width >= breakpoints.ultrawide,
        breakpoint
      });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  // During SSR or before hydration, return default values
  // After hydration, return actual window size
  return hasMounted ? windowSize : defaultValues;
} 