'use client';

export function initScrollObserver() {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with the scroll-reveal class
  setTimeout(() => {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => {
      observer.observe(el);
    });
  }, 100);

  return () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => {
      observer.unobserve(el);
    });
  };
} 