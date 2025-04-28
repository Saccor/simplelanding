'use client';

import { useEffect, RefObject } from 'react';

interface UseScrollObserverProps {
  ref: RefObject<HTMLElement | null>;
  threshold?: number;
  rootMargin?: string;
  onIntersect?: () => void;
}

export default function useScrollObserver({
  ref,
  threshold = 0.1,
  rootMargin = "0px",
  onIntersect
}: UseScrollObserverProps) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add('visible');
          if (onIntersect) onIntersect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, rootMargin, onIntersect]);
} 