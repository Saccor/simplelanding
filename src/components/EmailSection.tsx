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
    <div style={{ 
      width: '100%', 
      height: '650px', 
      background: '#F3F3F3'
    }}>
      <div style={{ 
        maxWidth: '1440px', 
        height: '100%', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row'
      }}>
        {/* Left side - Image */}
        <div style={{ 
          width: '50%', 
          height: '100%', 
          position: 'relative'
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
        <div style={{ 
          width: '50%', 
          height: '100%', 
          background: 'white',
          padding: '64px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ maxWidth: '400px' }}>
            <h2 
              ref={headingRef}
              className="scroll-reveal"
              style={{ 
                fontSize: '28px',
                fontWeight: '600',
                color: '#333333',
                marginBottom: '16px',
                lineHeight: '1.3'
              }}
            >
              {emailHeading}
            </h2>
            
            <p 
              ref={subtextRef}
              className="scroll-reveal delay-200"
              style={{ 
                fontSize: '22px',
                fontWeight: '600',
                color: '#333333',
                marginBottom: '32px',
                lineHeight: '1.3'
              }}
            >
              {emailSubtext}
            </p>
            
            <p 
              ref={descriptionRef}
              className="scroll-reveal delay-300"
              style={{ 
                fontSize: '16px',
                color: '#333333',
                marginBottom: '24px'
              }}
            >
              Sign up with your email address, pay €1 to get our best opening offer
            </p>
            
            <div 
              ref={formRef}
              className="scroll-reveal delay-400"
              style={{ display: 'flex' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                style={{ 
                  flex: '1',
                  padding: '12px 16px',
                  borderRadius: '9999px',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  border: '1px solid #D1D5DB',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSubmit}
                style={{ 
                  backgroundColor: '#B75C31',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Sign-up
              </button>
            </div>
            
            {formState === 'success' && (
              <p style={{ marginTop: '8px', color: '#059669' }}>Thank you for signing up!</p>
            )}
            {formState === 'error' && (
              <p style={{ marginTop: '8px', color: '#DC2626' }}>Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSection; 