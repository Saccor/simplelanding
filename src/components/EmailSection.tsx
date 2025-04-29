'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const isExtraSmall = width <= breakpoints.xs;

  // Initial styles for server-side rendering to avoid hydration mismatches
  const defaultSectionStyle = {
    width: '100%',
    maxWidth: '1440px',
    background: '#F3F3F3',
    position: 'relative' as const,
    flexGrow: 0,
    zIndex: 2,
    margin: '0 auto',
    overflow: 'hidden' as const,
    display: 'flex' as const,
    flexDirection: 'row' as const,
  };
  
  const defaultImageStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '650px',
    overflow: 'hidden' as const,
    flex: '0 0 40%',
  };
  
  const defaultRightContentStyle = {
    position: 'relative' as const,
    width: '607px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    padding: '135.5px 40px 40px 40px',
    gap: '42px',
    maxWidth: 'calc(100% - 30px)',
    flex: '0 0 60%',
  };
  
  const defaultFormStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    padding: '12px 0px',
    gap: '30px',
    width: '421.79px',
    height: 'auto',
    filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
    borderRadius: '20px',
    maxWidth: '100%',
    fontSize: '18px',
    lineHeight: '28px',
  };
  
  const defaultHeadingStyle = {
    width: '100%',
    height: 'auto',
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal' as const,
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '38px',
    color: '#192124',
    margin: 0,
    maxWidth: '100%'
  };

  const defaultDescriptionStyle = {
    width: '100%',
    height: 'auto',
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '28px',
    color: '#192124',
    margin: 0,
    maxWidth: '100%'
  };

  const defaultInputStyle = {
    boxSizing: 'border-box' as const,
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    padding: '10px 20px',
    gap: '10px',
    height: '44px',
    background: '#FFFFFF',
    border: '1px solid rgba(0, 0, 0, 0.48)',
    borderRadius: '28px',
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center' as const,
    color: '#000000',
    flexGrow: 1,
    maxWidth: 'calc(100% - 98px)'
  };

  const defaultButtonStyle = {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    gap: '10px',
    width: '98px',
    height: '44px',
    background: '#B4694A',
    borderRadius: '55px',
    border: 'none',
    fontFamily: "'Poppins', sans-serif",
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center' as const,
    color: '#FFFFFF',
    cursor: 'pointer'
  };
  
  // Form row container style - extracted to avoid inline style issues
  const defaultFormRowStyle = {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    padding: '0px',
    gap: '8px',
    width: '100%', 
    height: '44px',
    maxWidth: '100%'
  };

  // Only update styles if mounted to avoid hydration mismatches
  const sectionStyle = mounted ? {
    ...defaultSectionStyle,
    flexDirection: (isMobile || isExtraSmall) ? 'column' as const : 'row' as const,
  } : defaultSectionStyle;
  
  const imageStyle = mounted ? {
    ...defaultImageStyle,
    height: (isExtraSmall ? '340px' : isMobile ? '300px' : '650px'),
    flex: (isMobile || isExtraSmall) ? 'none' : '0 0 40%'
  } : defaultImageStyle;
  
  const rightContentStyle = mounted ? {
    ...defaultRightContentStyle,
    width: (isExtraSmall ? '94%' : isMobile ? '90%' : isTablet ? '80%' : '607px'),
    gap: (isExtraSmall ? '16px' : isMobile ? '24px' : isTablet ? '32px' : '42px'),
    padding: (isMobile || isExtraSmall) ? '20px 16px' : '135.5px 40px 40px 40px',
    flex: (isMobile || isExtraSmall) ? 'none' : '0 0 60%',
  } : defaultRightContentStyle;
  
  const formStyle = mounted ? {
    ...defaultFormStyle,
    gap: (isExtraSmall ? '12px' : isMobile ? '16px' : '30px'),
    width: (isExtraSmall ? '100%' : isMobile ? '100%' : '421.79px'),
    fontSize: (isExtraSmall ? '14px' : isMobile ? '16px' : '18px'),
    lineHeight: (isExtraSmall ? '20px' : isMobile ? '24px' : '28px'),
  } : defaultFormStyle;
  
  const headingStyle = mounted ? {
    ...defaultHeadingStyle,
    fontSize: (isExtraSmall ? '20px' : isMobile ? '24px' : isTablet ? '28px' : '30px'),
    lineHeight: (isExtraSmall ? '28px' : isMobile ? '32px' : isTablet ? '36px' : '38px'),
  } : defaultHeadingStyle;

  const descriptionStyle = mounted ? {
    ...defaultDescriptionStyle,
    fontSize: (isExtraSmall ? '14px' : isMobile ? '16px' : '18px'),
    lineHeight: (isExtraSmall ? '20px' : isMobile ? '24px' : '28px'),
  } : defaultDescriptionStyle;

  const inputStyle = mounted ? {
    ...defaultInputStyle,
    padding: (isExtraSmall ? '8px 16px' : '10px 20px'),
    height: (isExtraSmall ? '40px' : '44px'),
    fontSize: (isExtraSmall ? '12px' : '14px'),
    lineHeight: (isExtraSmall ? '18px' : '20px'),
  } : defaultInputStyle;

  const buttonStyle = mounted ? {
    ...defaultButtonStyle,
    padding: (isExtraSmall ? '8px 16px' : '10px 20px'),
    width: (isExtraSmall ? '90px' : '98px'),
    height: (isExtraSmall ? '40px' : '44px'),
    fontSize: (isExtraSmall ? '12px' : '14px'),
    lineHeight: (isExtraSmall ? '18px' : '20px'),
  } : defaultButtonStyle;
  
  const formRowStyle = mounted ? {
    ...defaultFormRowStyle,
    height: isExtraSmall ? '40px' : '44px',
  } : defaultFormRowStyle;

  return (
    <section style={sectionStyle}>
      {/* Left side - Image */}
      <div style={imageStyle}>
        <Image
          src={emailImage}
          alt="Arfve earbuds"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 488px"
          style={{
            objectFit: 'cover',
            objectPosition: mounted && isExtraSmall ? 'center 30%' : 'center',
            opacity: imageLoading ? 0 : 1,
            transition: 'opacity 0.5s ease'
          }}
          onLoad={() => setImageLoading(false)}
          priority
        />
      </div>
      
      {/* Right side - Content */}
      <div style={rightContentStyle}>
        {/* Heading section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: mounted ? (isExtraSmall ? '12px' : isMobile ? '16px' : '28px') : '28px',
          width: '100%',
          maxWidth: '607px',
          height: 'auto'
        }}>
          <h2 
            ref={headingRef}
            className="scroll-reveal"
            style={headingStyle}
          >
            {emailHeading}
          </h2>
          
          <p 
            ref={subtextRef}
            className="scroll-reveal delay-200"
            style={headingStyle}
          >
            {emailSubtext}
          </p>
        </div>
        
        {/* Form section */}
        <div
          ref={formRef}
          className="scroll-reveal delay-300"
          style={formStyle}
        >
          <p 
            ref={descriptionRef}
            style={descriptionStyle}
          >
            Sign up with your email address, pay €1 to get our best opening offer
          </p>
          
          <div style={formRowStyle}>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              style={inputStyle}
              autoComplete="email"
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={buttonStyle}
            >
              Sign-up
            </button>
          </div>
          
          {formState === 'success' && (
            <p style={{ 
              marginTop: '8px', 
              color: '#059669',
              fontFamily: "'Poppins', sans-serif",
              fontSize: isExtraSmall ? '12px' : '14px'
            }}>
              Thank you for signing up!
            </p>
          )}
          {formState === 'error' && (
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