'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import useScrollObserver from '../hooks/useScrollObserver';

interface EmailSectionProps {
  emailHeading: string;
  emailSubtext: string;
  emailImage: string;
}

const EmailSection: React.FC<EmailSectionProps> = ({ 
  emailHeading, 
  emailSubtext, 
  emailImage 
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Refs for scroll animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Use scroll observers
  useScrollObserver({ ref: headingRef });
  useScrollObserver({ ref: subtextRef, threshold: 0.2 });
  useScrollObserver({ ref: descriptionRef, threshold: 0.2 });
  useScrollObserver({ ref: formRef, threshold: 0.3 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log('Email submitted:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormState('success');
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      setFormState('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section className="w-full bg-[#F3F3F3]">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row h-[650px]">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
          <Image
            src={emailImage}
            alt="Arfve earbuds"
            fill
            className="object-cover transition-opacity duration-500"
            style={{
              opacity: imageLoading ? 0 : 1
            }}
            onLoad={() => setImageLoading(false)}
            priority
          />
        </div>
        
        {/* Right side - Content */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-[400px] mx-auto md:mx-0">
            <h2 
              ref={headingRef}
              className="scroll-reveal text-2xl md:text-[28px] font-semibold text-[#333333] mb-4 leading-snug"
            >
              {emailHeading}
            </h2>
            
            <p 
              ref={subtextRef}
              className="scroll-reveal delay-200 text-lg md:text-[22px] font-semibold text-[#333333] mb-8 leading-snug"
            >
              {emailSubtext}
            </p>
            
            <p 
              ref={descriptionRef}
              className="scroll-reveal delay-300 text-base text-[#333333] mb-6"
            >
              Sign up with your email address, pay €1 to get our best opening offer
            </p>
            
            <div 
              ref={formRef}
              className="scroll-reveal delay-400 flex"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="flex-1 px-4 py-3 rounded-l-full border border-[#D1D5DB] text-base outline-none"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#B75C31] text-white px-6 py-3 rounded-r-full border-none text-base font-medium cursor-pointer"
              >
                Sign-up
              </button>
            </div>
            
            {formState === 'success' && (
              <p className="mt-2 text-[#059669]">Thank you for signing up!</p>
            )}
            {formState === 'error' && (
              <p className="mt-2 text-[#DC2626]">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection; 