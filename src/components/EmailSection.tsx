'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import useScrollObserver from '../hooks/useScrollObserver';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';
import { toast } from 'react-toastify';
import { EMAIL_SUBMISSION_ENABLED, EMAIL_SIGNUP_ENDPOINT } from '../config/emailConfig';

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
  const { width, isMobile, isTablet, isDesktop, isLargeDesktop } = useWindowSize();
  const [isClient, setIsClient] = useState(false);
  
  // Check if code is running on client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Refs for scroll animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Submitting email to Formspree...');
      }
      
      // Prepare data for Formspree
      // Note: Formspree accepts form data directly with the email as a field
      const formData = {
        email,
        source: 'website_signup',
        signup_date: new Date().toISOString()
      };
      
      // Call Formspree endpoint directly
      const response = await fetch(EMAIL_SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      // Formspree returns a 200 status for successful submissions
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to subscribe');
      }
      
      const data = await response.json();
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Successfully submitted to Formspree:', data);
      }
      
      setFormState('success');
      toast.success('Thank you for signing up!');
      setEmail('');
    } catch (error: any) {
      console.error('Error submitting email:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
      setFormState('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormState('idle'), 5000); // Reset after 5 seconds
    }
  };

  // Check if device is extra small (iPhone SE size)
  const isExtraSmall = isClient && width <= breakpoints.xs;

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
  const textSizes = isClient ? getTextSizes() : {
    headingSize: '30px',
    headingLineHeight: '38px',
    descriptionSize: '18px',
    descriptionLineHeight: '28px',
    gap: '28px',
    formGap: '30px',
    formPadding: '20px 0px'
  };
  
  // Only use desktop layout on desktop sizes
  // IMPORTANT: This was causing hydration mismatch - we need to default to the same layout on server and client
  // Then update client-side only after hydration
  const useDesktopLayout = isClient && (isDesktop || isLargeDesktop);

  // If not client-side rendered yet, don't show any content to prevent hydration mismatch
  if (!isClient) {
    return (
      <section 
        ref={sectionRef}
        className="w-full flex justify-center bg-[#F3F3F3]"
        style={{
          zIndex: 2,
          order: 2,
          alignSelf: 'stretch',
          flexGrow: 0,
          minHeight: '650px' // Add minimum height to prevent layout shift
        }}
      >
        {/* Loading state */}
      </section>
    );
  }

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
        className="w-full relative mx-auto"
        style={{
          height: useDesktopLayout ? '650px' : 'auto',
          maxWidth: '1440px'
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
                loading="eager"
                priority
                quality={90}
              />
            </div>
            
            {/* Content - Desktop */}
            <div
              style={{
                position: 'absolute',
                width: '607px',
                height: '354px',
                left: '653.99px',
                top: '135.5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
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
                  gap: '28px',
                  width: '607px',
                  height: '142px',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }}
              >
                <h2 
                  ref={headingRef}
                  className="scroll-reveal"
                  style={{
                    width: '607px',
                    height: '76px',
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '30px',
                    lineHeight: '38px',
                    color: '#192124',
                    flex: 'none',
                    order: 0,
                    alignSelf: 'stretch',
                    flexGrow: 0
                  }}
                >
                  {emailHeading}
                </h2>
                
                <p 
                  ref={subtextRef}
                  className="scroll-reveal delay-200"
                  style={{
                    width: '607px',
                    height: '38px',
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '30px',
                    lineHeight: '38px',
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
              
              {/* Form Container */}
              <div
                ref={formRef}
                className="scroll-reveal delay-300"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '20px 0px',
                  gap: '30px',
                  width: '421.79px',
                  height: '170px',
                  filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
                  borderRadius: '20px',
                  flex: 'none',
                  order: 1,
                  flexGrow: 0
                }}
              >
                <p 
                  ref={descriptionRef}
                  style={{
                    width: '421.79px',
                    height: '56px',
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '28px',
                    color: '#192124',
                    flex: 'none',
                    order: 0,
                    alignSelf: 'stretch',
                    flexGrow: 0
                  }}
                >
                  Sign up with your email address, pay €1 to get our best opening offer
                </p>
                
                {/* Form with Formspree integration */}
                <form 
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '12px',
                    width: '421.79px',
                    height: '44px',
                    flex: 'none',
                    order: 1,
                    alignSelf: 'stretch',
                    flexGrow: 0
                  }}
                >
                  {!EMAIL_SUBMISSION_ENABLED ? (
                    <p style={{ color: '#DC2626', fontSize: '14px' }}>
                      Email submission is currently disabled.
                    </p>
                  ) : (
                    <>
                      <input
                        type="email"
                        id="email"
                        name="email" // Important: Formspree uses the name attribute
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required // Add required attribute for HTML5 validation
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
                          flex: 'none',
                          order: 0,
                          flexGrow: 1
                        }}
                        autoComplete="email"
                      />
                      
                      {/* Hidden fields for additional data */}
                      <input type="hidden" name="source" value="website_signup" />
                      <input type="hidden" name="signup_date" value={new Date().toISOString()} />
                      
                      <button
                        type="submit"
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
                          flex: 'none',
                          order: 1,
                          flexGrow: 0,
                          cursor: 'pointer'
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Sign-up'}
                      </button>
                    </>
                  )}
                </form>
                
                {/* Success/Error Messages */}
                {isClient && formState === 'success' && (
                  <p style={{ 
                    marginTop: '8px', 
                    color: '#059669',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '14px'
                  }}>
                    Thank you for signing up!
                  </p>
                )}
                {isClient && formState === 'error' && (
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
                loading="eager"
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

                {/* Form with Formspree integration - Mobile */}
                <form 
                  onSubmit={handleSubmit}
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
                  {!EMAIL_SUBMISSION_ENABLED ? (
                    <p style={{ color: '#DC2626', fontSize: '14px' }}>
                      Email submission is currently disabled.
                    </p>
                  ) : (
                    <>
                      <input
                        type="email"
                        id="email-mobile"
                        name="email" // Important: Formspree uses the name attribute
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required // Add required attribute for HTML5 validation
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
                      
                      {/* Hidden fields for additional data */}
                      <input type="hidden" name="source" value="website_signup" />
                      <input type="hidden" name="signup_date" value={new Date().toISOString()} />
                      
                      <button
                        type="submit"
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
                        {isSubmitting ? 'Sending...' : 'Sign-up'}
                      </button>
                    </>
                  )}
                </form>
                
                {/* Success/Error Messages */}
                {isClient && formState === 'success' && (
                  <p style={{ 
                    marginTop: '8px', 
                    color: '#059669',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: isExtraSmall ? '12px' : '14px'
                  }}>
                    Thank you for signing up!
                  </p>
                )}
                {isClient && formState === 'error' && (
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