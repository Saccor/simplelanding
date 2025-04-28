'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
    <section className="w-full bg-white py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Image */}
          <div className="md:col-span-1">
            <div className="relative h-[320px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src={emailImage}
                alt="Arfve earbuds"
                fill
                className={`
                  object-cover
                  transition-all duration-700 ease-in-out
                  ${imageLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}
                `}
                onLoad={() => setImageLoading(false)}
                priority
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="md:col-span-1 text-left flex flex-col justify-center">
            <h4 className="text-xl font-medium mb-3">{emailHeading}</h4>
            <p className="text-gray-700 mb-8">{emailSubtext}</p>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Sign up with your email address, pay €1 to get our best opening offer
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                <div className="flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="signup-button px-6 py-2 rounded-r-md sm:mt-0 mt-2 sm:rounded-l-none rounded-l-md"
                  disabled={isSubmitting || !email}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign up'}
                </button>
              </form>
              
              {formState === 'success' && (
                <p className="mt-2 text-green-600">Thank you for signing up!</p>
              )}
              {formState === 'error' && (
                <p className="mt-2 text-red-600">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection; 