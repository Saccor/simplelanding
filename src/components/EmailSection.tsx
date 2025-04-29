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

  // Fixed styles for server-side rendering
  const serverStyles = {
    section: {
      position: 'relative',
      width: '1440px',
      height: '650px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      background: '#F3F3F3',
      flex: 'none',
      order: 2,
      alignSelf: 'stretch',
      flexGrow: 0,
      zIndex: 2
    } as CSSProperties,
    leftDiv: {
      position: 'absolute',
      width: '488px',
      height: '650px',
      left: '0px',
      top: '0px',
      overflow: 'hidden'
    } as CSSProperties,
    rightDiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '50%',
      padding: '80px 60px',
      gap: '42px',
      marginLeft: '488px'
    } as CSSProperties,
    headingContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      width: '100%',
      maxWidth: '500px'
    } as CSSProperties,
    heading: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '30px',
      lineHeight: '38px',
      color: '#192124',
      fontWeight: 600
    } as CSSProperties,
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      width: '100%',
      maxWidth: '500px'
    } as CSSProperties,
    description: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '28px',
      color: '#192124'
    } as CSSProperties,
    formRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    } as CSSProperties,
    input: {
      padding: '10px 20px',
      height: '44px',
      fontSize: '14px',
      lineHeight: '20px',
      background: '#FFFFFF',
      border: '1px solid rgba(0, 0, 0, 0.48)',
      borderRadius: '9999px',
      fontFamily: "'Poppins', sans-serif",
      textAlign: 'center'
    } as CSSProperties,
    button: {
      padding: '10px 20px',
      width: '98px',
      height: '44px',
      fontSize: '14px',
      lineHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      borderRadius: '9999px',
      backgroundColor: '#B4694A',
      color: 'white'
    } as CSSProperties
  };

  return (
    <section 
      className="w-full flex justify-center"
      style={{
        background: '#F3F3F3',
        zIndex: 2,
        order: 2,
        alignSelf: 'stretch',
      }}
    >
      <div
        style={mounted ? {
          position: 'relative',
          width: isMobile ? '100%' : '1440px',
          height: isMobile ? 'auto' : '650px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
          background: '#F3F3F3',
          flex: 'none',
          flexGrow: 0,
          maxWidth: '100%'
        } as CSSProperties : serverStyles.section}
      >
        {/* Left side - Image */}
        <div
          className="relative"
          style={mounted ? {
            position: isMobile ? 'relative' : 'absolute',
            width: isMobile ? '100%' : '488px',
            height: isMobile ? isExtraSmall ? '340px' : '400px' : '650px',
            left: isMobile ? 'auto' : '0px',
            top: isMobile ? 'auto' : '0px',
            overflow: 'hidden'
          } as CSSProperties : serverStyles.leftDiv}
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
        
        {/* Right side - Content */}
        <div
          className="flex flex-col justify-center"
          style={mounted ? {
            width: isMobile ? '100%' : 'calc(100% - 488px)',
            marginLeft: isMobile ? '0' : '488px',
            padding: isMobile 
              ? isExtraSmall ? '24px 20px' : '32px 24px' 
              : isTablet ? '40px 32px' : '80px 60px',
            gap: isMobile ? '24px' : '42px'
          } as CSSProperties : serverStyles.rightDiv}
        >
          {/* Heading section */}
          <div 
            className="flex flex-col"
            style={mounted ? {
              gap: isMobile ? isExtraSmall ? '12px' : '16px' : '28px',
              width: '100%',
              maxWidth: '500px'
            } as CSSProperties : serverStyles.headingContainer}
          >
            <h2 
              ref={headingRef}
              className="scroll-reveal font-semibold"
              style={mounted ? {
                fontFamily: "'Poppins', sans-serif",
                fontSize: isExtraSmall ? '20px' : isMobile ? '24px' : isTablet ? '28px' : '30px',
                lineHeight: isExtraSmall ? '28px' : isMobile ? '32px' : isTablet ? '36px' : '38px',
                color: '#192124'
              } as CSSProperties : serverStyles.heading}
            >
              {emailHeading}
            </h2>
            
            <p 
              ref={subtextRef}
              className="scroll-reveal delay-200 font-semibold"
              style={mounted ? {
                fontFamily: "'Poppins', sans-serif",
                fontSize: isExtraSmall ? '20px' : isMobile ? '24px' : isTablet ? '28px' : '30px',
                lineHeight: isExtraSmall ? '28px' : isMobile ? '32px' : isTablet ? '36px' : '38px',
                color: '#192124'
              } as CSSProperties : serverStyles.heading}
            >
              {emailSubtext}
            </p>
          </div>
          
          {/* Form section */}
          <div
            ref={formRef}
            className="scroll-reveal delay-300 flex flex-col"
            style={mounted ? {
              gap: isExtraSmall ? '12px' : isMobile ? '16px' : '30px',
              width: '100%',
              maxWidth: '500px'
            } as CSSProperties : serverStyles.formContainer}
          >
            <p 
              ref={descriptionRef}
              style={mounted ? {
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: isExtraSmall ? '14px' : isMobile ? '16px' : '18px',
                lineHeight: isExtraSmall ? '20px' : isMobile ? '24px' : '28px',
                color: '#192124'
              } as CSSProperties : serverStyles.description}
            >
              Sign up with your email address, pay €1 to get our best opening offer
            </p>
            
            <div className="flex items-center gap-2" style={!mounted ? serverStyles.formRow : undefined}>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="flex-grow rounded-full"
                style={mounted ? {
                  padding: isExtraSmall ? '8px 16px' : '10px 20px',
                  height: isExtraSmall ? '40px' : '44px',
                  fontSize: isExtraSmall ? '12px' : '14px',
                  lineHeight: isExtraSmall ? '18px' : '20px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.48)',
                  fontFamily: "'Poppins', sans-serif",
                  textAlign: 'center'
                } as CSSProperties : serverStyles.input}
                autoComplete="email"
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="signup-button rounded-full"
                style={mounted ? {
                  padding: isExtraSmall ? '8px 16px' : '10px 20px',
                  width: isExtraSmall ? '90px' : '98px',
                  height: isExtraSmall ? '40px' : '44px',
                  fontSize: isExtraSmall ? '12px' : '14px',
                  lineHeight: isExtraSmall ? '18px' : '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500
                } as CSSProperties : serverStyles.button}
              >
                Sign-up
              </button>
            </div>
            
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
      </div>
    </section>
  );
};

export default EmailSection; 