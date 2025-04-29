'use client';

import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import Image from 'next/image';
import useScrollObserver from '../hooks/useScrollObserver';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

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
  const [mounted, setMounted] = useState(false);
  const { width, isMobile, isTablet } = useWindowSize();
  
  // Refs for scroll animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // This will help avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add Poppins font
  useEffect(() => {
    if (!document.getElementById('poppins-font')) {
      const link = document.createElement('link');
      link.id = 'poppins-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);
  
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

  // Check if device is extra small (iPhone SE size)
  const isExtraSmall = mounted && width <= breakpoints.xs;

  return (
    <section 
      className="w-full flex justify-center"
      style={{
        position: 'relative',
        width: isMobile ? '100%' : '1440px',
        height: isMobile ? 'auto' : '650px',
        background: '#F3F3F3',
        flex: 'none',
        order: 2,
        alignSelf: 'stretch',
        flexGrow: 0,
        zIndex: 2,
        margin: '0 auto',
        maxWidth: '100%'
      }}
    >
      {/* Left side - Image */}
      <div
        style={{
          position: isMobile ? 'relative' : 'absolute',
          width: isMobile ? '100%' : '488px',
          height: isMobile ? isExtraSmall ? '340px' : '400px' : '650px',
          left: isMobile ? 'auto' : '0px',
          top: isMobile ? 'auto' : '0px',
          overflow: 'hidden'
        }}
      >
        <Image
          src={emailImage}
          alt="Arfve earbuds"
          fill
          sizes="(max-width: 768px) 100vw, 488px"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: imageLoading ? 0 : 1,
            transition: 'opacity 0.5s ease'
          }}
          onLoad={() => setImageLoading(false)}
          priority
          quality={90}
        />
      </div>
      
      {/* Right Content Container - Frame 481534 */}
      <div
        style={mounted ? {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: isMobile ? (isExtraSmall ? '24px 20px' : '32px 24px') : '0px',
          gap: '42px',
          position: isMobile ? 'relative' : 'absolute',
          width: isMobile ? '100%' : '607px',
          height: isMobile ? 'auto' : '354px',
          left: isMobile ? '0px' : '653.99px',
          top: isMobile ? '0px' : '135.5px',
        } : undefined}
      >
        {/* Heading Container - Frame 481531 */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '28px',
            width: isMobile ? '100%' : '607px',
            height: isMobile ? 'auto' : '142px',
            flex: 'none',
            order: 0,
            alignSelf: 'stretch',
            flexGrow: 0
          }}
        >
          {/* Main Heading */}
          <h2 
            ref={headingRef}
            className="scroll-reveal"
            style={{
              width: isMobile ? '100%' : '607px',
              height: isMobile ? 'auto' : '76px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: isExtraSmall ? '20px' : isMobile ? '24px' : '30px',
              lineHeight: isExtraSmall ? '28px' : isMobile ? '32px' : '38px',
              color: '#192124',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0
            }}
          >
            {emailHeading}
          </h2>
          
          {/* Subheading */}
          <p 
            ref={subtextRef}
            className="scroll-reveal delay-200"
            style={{
              width: isMobile ? '100%' : '607px',
              height: isMobile ? 'auto' : '38px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: isExtraSmall ? '20px' : isMobile ? '24px' : '30px',
              lineHeight: isExtraSmall ? '28px' : isMobile ? '32px' : '38px',
              color: '#192124',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0
            }}
          >
            {emailSubtext}
          </p>
        </div>
        
        {/* Form Container - Frame 481518 */}
        <div
          ref={formRef}
          className="scroll-reveal delay-300"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: isMobile ? '0px' : '20px 0px',
            gap: isMobile ? '16px' : '30px',
            width: isMobile ? '100%' : '421.79px',
            height: isMobile ? 'auto' : '170px',
            filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
            borderRadius: '20px',
            flex: 'none',
            order: 1,
            flexGrow: 0
          }}
        >
          {/* Form Description */}
          <p 
            ref={descriptionRef}
            style={{
              width: isMobile ? '100%' : '421.79px',
              height: isMobile ? 'auto' : '56px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: isExtraSmall ? '14px' : isMobile ? '16px' : '18px',
              lineHeight: isExtraSmall ? '20px' : isMobile ? '24px' : '28px',
              color: '#192124',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0
            }}
          >
            Sign up with your email address, pay €1 to get our best opening offer
          </p>
          
          {/* Input Row - Frame 481510 */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '12px',
              width: isMobile ? '100%' : '421.79px',
              height: isExtraSmall ? '40px' : '44px',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0
            }}
          >
            {/* Email Input Field */}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: isExtraSmall ? '8px 16px' : '10px 20px',
                gap: '10px',
                width: isMobile ? '100%' : '311.79px',
                height: isExtraSmall ? '40px' : '44px',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.48)',
                borderRadius: '28px',
                flex: 'none',
                order: 0,
                flexGrow: 1,
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: isExtraSmall ? '12px' : '14px',
                lineHeight: isExtraSmall ? '18px' : '20px',
                textAlign: 'center',
                color: '#000000'
              }}
              autoComplete="email"
            />
            
            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: isExtraSmall ? '8px 16px' : '10px 20px',
                gap: '10px',
                width: isExtraSmall ? '90px' : '98px',
                height: isExtraSmall ? '40px' : '44px',
                background: '#B4694A',
                borderRadius: '55px',
                flex: 'none',
                order: 1,
                flexGrow: 0,
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: isExtraSmall ? '12px' : '14px',
                lineHeight: isExtraSmall ? '18px' : '20px',
                textAlign: 'center',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Sign-up
            </button>
          </div>
          
          {/* Success/Error Messages */}
          {mounted && formState === 'success' && (
            <p style={{ 
              marginTop: '8px', 
              color: '#059669',
              fontFamily: "'Poppins', sans-serif",
              fontSize: isExtraSmall ? '12px' : '14px'
            }}>
              Thank you for signing up!
            </p>
          )}
          {mounted && formState === 'error' && (
            <p style={{ 
              marginTop: '8px', 
              color: '#DC2626',
              fontFamily: "'Poppins', sans-serif",
              fontSize: isExtraSmall ? '12px' : '14px'
            }}>
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmailSection; 