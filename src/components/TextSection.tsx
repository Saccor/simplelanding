'use client';

import React, { useRef, useEffect, useState } from 'react';

interface TextSectionProps {
  mainHeading?: string;
  subHeading?: string;
  textLines?: string[];
}

const TextSection: React.FC<TextSectionProps> = ({ 
  mainHeading = "WE'RE BUILDING TECHNOLOGY", 
  subHeading,
  textLines = [
    "We're building technology that's more than smart",
    "It's intelligent, sustainable, and designed with purpose.",
    "This isn't just a company",
    "It's a challenge to the industry.",
    "It's a commitment to a better way",
    "It's a call to everyone who believes in a future where technology works for us—not against us."
  ]
}) => {
  // State to track if elements are ready to be observed
  const [elementsReady, setElementsReady] = useState(false);
  
  // Create refs for each text line
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Create a ref callback for each line
  const assignRef = (index: number) => (el: HTMLParagraphElement | null) => {
    // Store the element reference in our array at the specified index
    lineRefs.current[index] = el;
    
    // Once all refs are assigned (or when the last one is assigned), mark elements as ready
    if (index === textLines.length - 1 && el) {
      setElementsReady(true);
    }
  };

  // Setup effect to initialize all observers once elements are ready
  useEffect(() => {
    if (!elementsReady) return;
    
    const observers: IntersectionObserver[] = [];
    
    // Wait a bit for the DOM to fully render
    setTimeout(() => {
      // Set up observers for each existing ref
      lineRefs.current.forEach((element) => {
        if (element) {
          element.classList.remove('visible'); // Reset in case it was already visible
          element.style.opacity = '0'; // Start hidden
          element.style.transform = 'translateY(20px)'; // Start below final position
          
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                element.classList.add('visible');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                observer.unobserve(element);
              }
            },
            {
              threshold: 0.2,
              rootMargin: "0px",
            }
          );
          
          observer.observe(element);
          observers.push(observer);
        }
      });
    }, 100);
    
    // Cleanup function to disconnect all observers
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [elementsReady]);

  return (
    <section className="w-full bg-white flex justify-center">
      <div className="text-container">
        <div className="flex flex-col justify-center items-center h-full w-full px-4 md:px-6 py-8 md:py-0">
          {textLines.map((line, index) => (
            <p 
              key={index}
              ref={assignRef(index)}
              className={`transition-all duration-500 delay-${index * 100} font-normal text-[18px] xs:text-[22px] sm:text-[26px] md:text-[35px] lg:text-[40px] leading-[1.3] text-center tracking-[-0.02em] text-[#192124] mb-3 sm:mb-4 md:mb-6`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextSection; 