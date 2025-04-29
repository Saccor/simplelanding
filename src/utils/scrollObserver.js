'use client';

export function initScrollObserver() {
  // Safe check that we're on the client
  if (typeof window === 'undefined' || typeof document === 'undefined' || !window.IntersectionObserver) {
    // Return empty cleanup function for SSR
    return () => {};
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Create and configure the observer
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Use a slight delay to ensure DOM is fully loaded
  const setupObserver = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    if (elements.length > 0) {
      elements.forEach(el => {
        observer.observe(el);
      });
    } else {
      // If elements aren't found, try again in a short while
      setTimeout(setupObserver, 150);
    }
  };
  
  // Wait for DOM content to be loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    // If DOM is already loaded, set up with a small delay to be safe
    setTimeout(setupObserver, 100);
  }

  // Return cleanup function
  return () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => {
      observer.unobserve(el);
    });
    observer.disconnect();
  };
} 