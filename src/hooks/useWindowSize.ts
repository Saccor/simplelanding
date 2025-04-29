'use client';

import { useState, useEffect } from 'react';

// Define consistent breakpoints for the entire application
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440
};

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

// Default values for server-side rendering
const defaultValues: WindowSize = {
  width: breakpoints.lg, // Default to a desktop-like width
  height: 800,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: false
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
      
      // Update all values at once to avoid multiple re-renders
      setWindowSize({
        width,
        height,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg && width < breakpoints.xxl,
        isLargeDesktop: width >= breakpoints.xxl
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