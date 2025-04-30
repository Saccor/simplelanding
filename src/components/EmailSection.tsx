'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';
import { toast } from 'react-toastify';
import { EMAIL_SUBMISSION_ENABLED, EMAIL_SIGNUP_ENDPOINT } from '../config/emailConfig';

interface EmailSectionProps {
  emailHeading: string;
  emailSubtext: string;
  emailImage: string;
}

// Extracted EmailForm component to reduce duplication
interface EmailFormProps {
  isClient: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string;
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  textSizes: {
    descriptionSize: string;
    descriptionLineHeight: string;
    formGap: string;
    formPadding: string;
  };
  isExtraSmall: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({
  isClient,
  isSubmitting,
  isSuccess,
  error,
  email,
  setEmail,
  handleSubmit,
  textSizes,
  isExtraSmall
}) => {
  return (
    <>
      <p 
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

      <form 
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: isExtraSmall ? 'column' : 'row',
          alignItems: isExtraSmall ? 'stretch' : 'center',
          padding: '0px',
          gap: isExtraSmall ? '10px' : '12px',
          width: '100%',
          height: 'auto'
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
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
                flex: isExtraSmall ? 'none' : 1
              }}
              autoComplete="email"
            />
            
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
                width: isExtraSmall ? '100%' : '98px',
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
      {isClient && isSuccess && (
        <p style={{ 
          marginTop: '8px', 
          color: '#059669',
          fontFamily: "'Poppins', sans-serif",
          fontSize: isExtraSmall ? '12px' : '14px'
        }}>
          Thank you for signing up!
        </p>
      )}
      {isClient && error && (
        <p style={{ 
          marginTop: '8px', 
          color: '#DC2626',
          fontFamily: "'Poppins', sans-serif",
          fontSize: isExtraSmall ? '12px' : '14px'
        }}>
          {error}
        </p>
      )}
    </>
  );
};

const EmailSection: React.FC<EmailSectionProps> = ({ 
  emailHeading, 
  emailSubtext, 
  emailImage 
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
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
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(EMAIL_SIGNUP_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setEmail('');
        setIsSuccess(true);
        toast.success('Thank you for signing up!');
        setIsSubmitting(false);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Check if device is extra small (iPhone SE size)
  const isExtraSmall = isClient && width <= breakpoints.xs;
  // Check if device is iPad (768-820 range)
  const isIpad = isClient && width >= 768 && width <= 912;

  // Calculate text sizes based on screen size
  const getTextSizes = () => {
    if (isLargeDesktop) {
      return {
        headingSize: '30px',
        headingLineHeight: '38px',
        descriptionSize: '18px',
        descriptionLineHeight: '28px',
        gap: '28px',
        formGap: '30px',
        formPadding: '20px 0px'
      };
    } else if (isDesktop) {
      return {
        headingSize: '28px',
        headingLineHeight: '36px',
        descriptionSize: '18px',
        descriptionLineHeight: '28px',
        gap: '24px',
        formGap: '28px',
        formPadding: '18px 0px'
      };
    } else if (isIpad) {
      return {
        headingSize: '26px',
        headingLineHeight: '34px',
        descriptionSize: '16px',
        descriptionLineHeight: '26px',
        gap: '22px',
        formGap: '24px',
        formPadding: '15px 0px'
      };
    } else if (isTablet) {
      return {
        headingSize: '24px',
        headingLineHeight: '32px',
        descriptionSize: '16px',
        descriptionLineHeight: '24px',
        gap: '20px',
        formGap: '20px',
        formPadding: '12px 0px'
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
        headingSize: '22px',
        headingLineHeight: '30px',
        descriptionSize: '15px',
        descriptionLineHeight: '22px',
        gap: '16px',
        formGap: '16px',
        formPadding: '10px 0px'
      };
    }
  };

  // Get text sizes
  const textSizes = isClient ? getTextSizes() : {
    headingSize: '22px',
    headingLineHeight: '30px',
    descriptionSize: '15px',
    descriptionLineHeight: '22px',
    gap: '16px',
    formGap: '16px',
    formPadding: '10px 0px'
  };
  
  // Only use desktop layout on large desktop sizes
  // For better UX on all devices, use a stacked layout for anything below large desktops
  const useDesktopLayout = isClient && isLargeDesktop && width >= 1200;

  // Calculate image height based on screen size
  const getImageHeight = () => {
    if (isLargeDesktop) return '650px';
    if (isDesktop) return '550px';
    if (isIpad) return '450px';
    if (isTablet) return '400px'; 
    if (isExtraSmall) return '280px';
    return '350px'; // Default for mobile
  };

  // Calculate content padding based on screen size
  const getContentPadding = () => {
    if (isLargeDesktop) return '60px 80px';
    if (isDesktop) return '50px 60px';
    if (isIpad) return '40px 50px';
    if (isTablet) return '32px 40px';
    if (isExtraSmall) return '24px 16px';
    return '28px 24px'; // Default for mobile
  };

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
          minHeight: '400px' // Add minimum height to prevent layout shift
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
          maxWidth: '100%'
        }}
      >
        {/* For Desktop: Absolute positioned elements (large screens only) */}
        {useDesktopLayout && (
          <>
            {/* Image - Desktop */}
            <div
              style={{
                position: 'absolute',
                width: '40%',
                maxWidth: '488px',
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
                sizes="(max-width: 1200px) 100vw, 40vw"
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
                width: '50%',
                maxWidth: '607px',
                height: 'auto',
                left: '55%',
                top: '50%',
                transform: 'translate(-25%, -50%)',
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
                  width: '100%',
                  height: 'auto',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }}
              >
                <h2 
                  ref={headingRef}
                  style={{
                    width: '100%',
                    height: 'auto',
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
                  style={{
                    width: '100%',
                    height: 'auto',
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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '20px 0px',
                  gap: '30px',
                  width: '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
                  borderRadius: '20px',
                  flex: 'none',
                  order: 1,
                  flexGrow: 0
                }}
              >
                <EmailForm
                  isClient={isClient}
                  isSubmitting={isSubmitting}
                  isSuccess={isSuccess}
                  error={error}
                  email={email}
                  setEmail={setEmail}
                  handleSubmit={handleSubmit}
                  textSizes={textSizes}
                  isExtraSmall={isExtraSmall}
                />
              </div>
            </div>
          </>
        )}
        
        {/* Mobile-first layout for all non-large desktop screens */}
        {!useDesktopLayout && (
          <div className="flex flex-col w-full">
            {/* Image - Mobile/Tablet */}
            <div
              style={{
                width: '100%',
                height: getImageHeight(),
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Image
                src={emailImage}
                alt="Arfve earbuds"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
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
            
            {/* Content - Mobile/Tablet */}
            <div
              className="w-full"
              style={{
                padding: getContentPadding(),
                display: 'flex',
                flexDirection: 'column',
                gap: isTablet || isIpad ? '36px' : '28px',
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
                  style={{
                    width: '100%',
                    height: 'auto',
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: textSizes.headingSize,
                    lineHeight: textSizes.headingLineHeight,
                    color: '#192124',
                    marginBottom: '4px'
                  }}
                >
                  {emailHeading}
                </h2>
                
                <p 
                  ref={subtextRef}
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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: textSizes.formPadding,
                  gap: textSizes.formGap,
                  filter: isTablet || isIpad || isDesktop ? 'drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.1))' : 'none',
                  borderRadius: '20px',
                  maxWidth: isTablet || isIpad || isDesktop ? '600px' : '100%',
                  margin: isTablet || isIpad || isDesktop ? '0 auto' : '0'
                }}
              >
                <EmailForm
                  isClient={isClient}
                  isSubmitting={isSubmitting}
                  isSuccess={isSuccess}
                  error={error}
                  email={email}
                  setEmail={setEmail}
                  handleSubmit={handleSubmit}
                  textSizes={textSizes}
                  isExtraSmall={isExtraSmall}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailSection; 