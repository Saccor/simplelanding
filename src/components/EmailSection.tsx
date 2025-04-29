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

  // Get right content style based on screen size
  const getRightContentStyle = () => {
    if (isExtraSmall) {
      // Extra small screens like iPhone SE need specialized layout
      return {
        position: 'relative' as const,
        width: '94%', 
        maxWidth: '607px',
        height: 'auto',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start' as const,
        padding: '0px',
        gap: '16px', // Reduced gap for small screens
      };
    } else if (isMobile) {
      return {
        position: 'relative' as const,
        width: '90%',
        maxWidth: '607px',
        height: 'auto',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start' as const,
        padding: '0px',
        gap: '24px',
      };
    } else if (isTablet) {
      return {
        position: 'relative' as const,
        width: '80%',
        maxWidth: '607px',
        height: 'auto',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start' as const,
        padding: '0px',
        gap: '32px',
      };
    }
    
    // Desktop default
    return {
      position: 'relative' as const,
      width: '607px',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      padding: '0px',
      gap: '42px',
      maxWidth: 'calc(100% - 30px)',
    };
  };

  // Get image container style based on screen size
  const getImageStyle = () => {
    if (isExtraSmall) {
      return {
        position: 'relative' as const,
        width: '100%',
        height: '340px',
        overflow: 'hidden' as const,
      };
    } else if (isMobile) {
      return {
        position: 'relative' as const,
        width: '100%',
        height: '300px',
        overflow: 'hidden' as const,
      };
    }
    
    // Tablet and Desktop default
    return {
      position: 'relative' as const,
      width: '100%',
      height: '650px',
      overflow: 'hidden' as const,
    };
  };

  // Get section container dimensions based on screen size
  const getSectionStyle = () => {
    return {
      width: '100%',
      maxWidth: '1440px',
      background: '#F3F3F3',
      position: 'relative' as const,
      flexGrow: 0,
      zIndex: 2,
      margin: '0 auto',
      overflow: 'hidden' as const,
      display: 'flex' as const,
      flexDirection: isMobile || isExtraSmall ? 'column' as const : 'row' as const,
    };
  };

  // Get form element styles based on screen size
  const getFormStyle = () => {
    // Use percentage-based width calculation instead of fixed pixels
    const width = isExtraSmall ? '100%' : isMobile ? '100%' : '421.79px';
    const fontSize = isExtraSmall ? 14 : isMobile ? 16 : 18;
    const lineHeight = isExtraSmall ? 20 : isMobile ? 24 : 28;
    const gap = isExtraSmall ? 12 : isMobile ? 16 : 30;
    
    return {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      padding: '12px 0px',
      gap: `${gap}px`,
      width,
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
    const fontSize = isExtraSmall ? 20 : isMobile ? 24 : isTablet ? 28 : 30;
    const lineHeight = isExtraSmall ? 28 : isMobile ? 32 : isTablet ? 36 : 38;
    
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

  // Calculate styles - only if mounted to avoid hydration mismatch
  const sectionStyle = mounted ? getSectionStyle() : {
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
  
  const imageStyle = mounted ? getImageStyle() : {
    position: 'relative' as const,
    width: '100%',
    height: '650px',
    overflow: 'hidden' as const,
  };
  
  const rightContentStyle = mounted ? getRightContentStyle() : {
    position: 'relative' as const,
    width: '607px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    padding: '0px',
    gap: '42px',
    maxWidth: 'calc(100% - 30px)',
  };
  
  const formStyle = mounted ? getFormStyle() : {
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
  
  const headingStyle = mounted ? getHeadingStyle() : {
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

  return (
    <section style={sectionStyle}>
      {/* Left side - Image */}
      <div style={{
        ...imageStyle,
        flex: mounted && (isMobile || isExtraSmall) ? 'none' : '0 0 40%'
      }}>
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
      <div style={{
        ...rightContentStyle,
        flex: mounted && (isMobile || isExtraSmall) ? 'none' : '0 0 60%',
        padding: mounted && (isMobile || isExtraSmall) ? '20px 16px' : '135.5px 40px 40px 40px',
      }}>
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
            style={{ 
              width: '100%',
              height: 'auto',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: isExtraSmall ? '14px' : isMobile ? '16px' : '18px',
              lineHeight: isExtraSmall ? '20px' : isMobile ? '24px' : '28px',
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
              gap: '8px',
              width: '100%',
              height: isExtraSmall ? '40px' : '44px',
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
                padding: isExtraSmall ? '8px 16px' : '10px 20px',
                gap: '10px',
                height: isExtraSmall ? '40px' : '44px',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.48)',
                borderRadius: '28px',
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: isExtraSmall ? '12px' : '14px',
                lineHeight: isExtraSmall ? '18px' : '20px',
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
                padding: isExtraSmall ? '8px 16px' : '10px 20px',
                gap: '10px',
                width: isExtraSmall ? '90px' : '98px',
                height: isExtraSmall ? '40px' : '44px',
                background: '#B4694A',
                borderRadius: '55px',
                border: 'none',
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: isExtraSmall ? '12px' : '14px',
                lineHeight: isExtraSmall ? '18px' : '20px',
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