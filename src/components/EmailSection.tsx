'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  
  // Refs for scroll animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Add Poppins font and handle responsive sizing
  useEffect(() => {
    // Add Poppins font
    if (!document.getElementById('poppins-font')) {
      const link = document.createElement('link');
      link.id = 'poppins-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }

    // Handle resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  // Get right content position based on screen size
  const getRightContentStyle = () => {
    if (windowWidth < 768) {
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
    }
    
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

  const rightContentStyle = getRightContentStyle();

  return (
    <section style={{
      width: '1440px',
      height: '650px',
      background: '#F3F3F3',
      position: 'relative',
      flexGrow: 0,
      zIndex: 2,
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      {/* Left side - Image */}
      <div style={{
        position: 'absolute',
        width: '488px',
        height: '650px',
        left: '0px',
        top: '0px',
        maxWidth: windowWidth < 768 ? '100%' : '50%'
      }}>
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
          width: '607px',
          height: '142px',
          maxWidth: '100%'
        }}>
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
              margin: 0,
              maxWidth: '100%'
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
              margin: 0,
              maxWidth: '100%'
            }}
          >
            {emailSubtext}
          </p>
        </div>
        
        {/* Form section */}
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
            height: 'auto',
            filter: 'drop-shadow(0px 4px 49.6px rgba(0, 0, 0, 0.1))',
            borderRadius: '20px',
            maxWidth: '100%'
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
              width: '421.79px',
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