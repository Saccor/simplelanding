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
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
  
  // Refs for scroll animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Calculate text sizes based on screen size
  const getTextSizes = () => {
    if (isLargeDesktop || isDesktop) {
      return {
        headingSize: '30px',
        headingLineHeight: '38px',
        descriptionSize: '18px',
        descriptionLineHeight: '28px',
        gap: '28px',
        formGap: '30px',
        formPadding: '20px 0px'
      };
    } else if (isTablet) {
      return {
        headingSize: '28px',
        headingLineHeight: '36px',
        descriptionSize: '16px',
        descriptionLineHeight: '24px',
        gap: '20px',
        formGap: '24px',
        formPadding: '15px 0px'
      };
    } else if (isExtraSmall) {
      return {
        headingSize: '20px',
        headingLineHeight: '28px',
        descriptionSize: '14px',
        descriptionLineHeight: '20px',
        gap: '12px',
        formGap: '12px',
        formPadding: '0px'
      };
    } else {
      return {
        headingSize: '24px',
        headingLineHeight: '32px',
        descriptionSize: '16px',
        descriptionLineHeight: '24px',
        gap: '16px',
        formGap: '16px',
        formPadding: '10px 0px'
      };
    }
  };

  // Get text sizes
  const textSizes = mounted ? getTextSizes() : {
    headingSize: '30px',
    headingLineHeight: '38px',
    descriptionSize: '18px',
    descriptionLineHeight: '28px',
    gap: '28px',
    formGap: '30px',
    formPadding: '20px 0px'
  };

  // Only use desktop layout on desktop sizes
  const useDesktopLayout = mounted && (isDesktop || isLargeDesktop);

  return (
    <section 
      ref={sectionRef}
      className="w-full flex justify-center bg-[#F3F3F3]"
      style={{
        zIndex: 2,
        order: 2,
        alignSelf: 'stretch',
        flexGrow: 0
      }}
    >
      <div 
        className="w-full max-w-[1440px] relative"
        style={{
          height: useDesktopLayout ? '650px' : 'auto'
        }}
      >
        {/* For Desktop: Absolute positioned elements */}
        {useDesktopLayout && (
          <>
            {/* Image - Desktop */}
            <div
              style={{
                position: 'absolute',
                width: '488px',
                height: '650px',
                left: '0px',
                top: '0px',
                overflow: 'hidden'
              }}
            >
              <Image
                src={emailImage}
                alt="Arfve earbuds"
                fill
                sizes="488px"
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
            
            {/* Content - Desktop */}
            <div
              style={{
                position: 'absolute',
                left: isLargeDesktop ? '653.99px' : width > 1200 ? '610px' : '580px',
                top: '135.5px',
                width: isLargeDesktop ? '607px' : '580px',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '42px'
              }}
            >
              {/* Heading Container */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: textSizes.gap,
                  width: '100%'
                }}
              >
                <h2 
                  ref={headingRef}
                  className="scroll-reveal"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: textSizes.headingSize,
                    lineHeight: textSizes.headingLineHeight,
                    color: '#192124'
                  }}
                >
                  {emailHeading}
                </h2>
                
                <p 
                  ref={subtextRef}
                  className="scroll-reveal delay-200"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: textSizes.headingSize,
                    lineHeight: textSizes.headingLineHeight,
                    color: '#192124'
                  }}
                >
                  {emailSubtext}
                </p>
              </div>
              
              {/* Form Container */}
              <div
                ref={formRef}
                className="scroll-reveal delay-300"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: textSizes.formPadding,
                  gap: textSizes.formGap,
                  width: '421.79px',
                  filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
                  borderRadius: '20px'
                }}
              >
                <p 
                  ref={descriptionRef}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: textSizes.descriptionSize,
                    lineHeight: textSizes.descriptionLineHeight,
                    color: '#192124',
                    width: '100%'
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
                    height: '44px'
                  }}
                >
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
                      padding: '10px 20px',
                      gap: '10px',
                      width: '311.79px',
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
                      flex: 1
                    }}
                    autoComplete="email"
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
                      fontFamily: "'Poppins', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
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
                    fontSize: '14px'
                  }}>
                    Thank you for signing up!
                  </p>
                )}
                {mounted && formState === 'error' && (
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
          </>
        )}
        
        {/* For Mobile and Tablet: Stacked layout */}
        {!useDesktopLayout && (
          <div className="flex flex-col w-full">
            {/* Image - Mobile */}
            <div
              style={{
                width: '100%',
                height: isExtraSmall ? '320px' : isTablet ? '400px' : '380px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Image
                src={emailImage}
                alt="Arfve earbuds"
                fill
                sizes="100vw"
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
            
            {/* Content - Mobile */}
            <div
              className="w-full"
              style={{
                padding: isExtraSmall ? '24px 20px' : isTablet ? '40px 24px' : '32px 24px',
                gap: isExtraSmall ? '24px' : '42px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Heading Container */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: textSizes.gap,
                  width: '100%'
                }}
              >
                <h2 
                  ref={headingRef}
                  className="scroll-reveal"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: textSizes.headingSize,
                    lineHeight: textSizes.headingLineHeight,
                    color: '#192124'
                  }}
                >
                  {emailHeading}
                </h2>
                
                <p 
                  ref={subtextRef}
                  className="scroll-reveal delay-200"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: textSizes.headingSize,
                    lineHeight: textSizes.headingLineHeight,
                    color: '#192124'
                  }}
                >
                  {emailSubtext}
                </p>
              </div>
              
              {/* Form Container */}
              <div
                ref={formRef}
                className="scroll-reveal delay-300 w-full"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: textSizes.formPadding,
                  gap: textSizes.formGap,
                  filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
                  borderRadius: '20px'
                }}
              >
                <p 
                  ref={descriptionRef}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: textSizes.descriptionSize,
                    lineHeight: textSizes.descriptionLineHeight,
                    color: '#192124',
                    width: '100%'
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
                    height: isExtraSmall ? '40px' : '44px'
                  }}
                >
                  <input
                    type="email"
                    id="email-mobile"
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
                      flex: 1
                    }}
                    autoComplete="email"
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
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailSection; 