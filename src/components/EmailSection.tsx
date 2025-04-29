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
  const { width, isMobile, isTablet } = useWindowSize();
  
  // Refs for scroll animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  // Get right content style based on screen size
  const getRightContentStyle = () => {
    if (isMobile) {
      return {
        position: 'absolute' as const,
        width: '90%',
        maxWidth: '607px',
        height: 'auto',
        left: '50%',
        top: '320px',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start' as const,
        padding: '0px',
        gap: '42px',
      };
    } else if (isTablet) {
      return {
        position: 'absolute' as const,
        width: '80%',
        maxWidth: '607px',
        height: 'auto',
        left: '50%',
        top: '150px',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start' as const,
        padding: '0px',
        gap: '32px',
      };
    }
    
    // Desktop default
    return {
      position: 'absolute' as const,
      width: '607px',
      height: '354px',
      left: '653.99px',
      top: '135.5px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      padding: '0px',
      gap: '42px',
      maxWidth: 'calc(100% - 488px)',
      right: '0',
    };
  };

  // Get image container style based on screen size
  const getImageStyle = () => {
    if (isMobile) {
      return {
        position: 'absolute' as const,
        width: '100%',
        height: '300px',
        left: '0px',
        top: '0px',
      };
    }
    
    // Tablet and Desktop default
    return {
      position: 'absolute' as const,
      width: '488px',
      height: '650px',
      left: '0px',
      top: '0px',
      maxWidth: isTablet ? '40%' : '50%'
    };
  };

  // Get section container dimensions based on screen size
  const getSectionStyle = () => {
    const baseStyle = {
      width: '1440px',
      height: isMobile ? '800px' : '650px',
      background: '#F3F3F3',
      position: 'relative' as const,
      flexGrow: 0,
      zIndex: 2,
      maxWidth: '100%',
      margin: '0 auto'
    };
    
    return baseStyle;
  };

  // Get form element styles based on screen size
  const getFormStyle = () => {
    const baseWidth = isMobile ? width * 0.8 : 421.79;
    const fontSize = isMobile ? 16 : 18;
    const lineHeight = isMobile ? 24 : 28;
    const gap = isMobile ? 20 : 30;
    
    return {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      padding: '20px 0px',
      gap: `${gap}px`,
      width: `${baseWidth}px`,
      height: 'auto',
      filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
      borderRadius: '20px',
      maxWidth: '100%',
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
    };
  };

  // Get font size based on screen size
  const getHeadingStyle = () => {
    const fontSize = isMobile ? 24 : isTablet ? 28 : 30;
    const lineHeight = isMobile ? 32 : isTablet ? 36 : 38;
    
    return {
      width: '100%',
      height: 'auto',
      fontFamily: "'Poppins', sans-serif",
      fontStyle: 'normal' as const,
      fontWeight: 600,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      color: '#192124',
      margin: 0,
      maxWidth: '100%'
    };
  };

  // Calculate styles
  const sectionStyle = getSectionStyle();
  const imageStyle = getImageStyle();
  const rightContentStyle = getRightContentStyle();
  const formStyle = getFormStyle();
  const headingStyle = getHeadingStyle();

  return (
    <section style={sectionStyle}>
      {/* Left side - Image */}
      <div style={imageStyle}>
        <Image
          src={emailImage}
          alt="Arfve earbuds"
          fill
          style={{
            objectFit: 'cover',
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
          gap: '28px',
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
            style={{ 
              width: '100%',
              height: 'auto',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: isMobile ? '16px' : '18px',
              lineHeight: isMobile ? '24px' : '28px',
              color: '#192124',
              margin: 0,
              maxWidth: '100%'
            }}
          >
            Sign up with your email address, pay €1 to get our best opening offer
          </p>
          
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '12px',
              width: '100%',
              height: '44px',
              maxWidth: '100%'
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              style={{ 
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
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
                textAlign: 'center',
                color: '#000000',
                flexGrow: 1,
                maxWidth: 'calc(100% - 98px)'
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{ 
                display: 'flex',
                flexDirection: 'row',
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
                textAlign: 'center',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              Sign-up
            </button>
          </div>
          
          {formState === 'success' && (
            <p style={{ 
              marginTop: '8px', 
              color: '#059669',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px'
            }}>
              Thank you for signing up!
            </p>
          )}
          {formState === 'error' && (
            <p style={{ 
              marginTop: '8px', 
              color: '#DC2626',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px'
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