"use client"

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SimpleLandingProps {
  // Hero Section Props
  videoUrl?: string;
  mobileVideoUrl?: string;
  
  // Text Section Props
  mainHeading?: string;
  subHeading?: string;
  
  // Email Section Props
  emailHeading?: string;
  emailSubtext?: string;
  emailImage?: string;
  
  // Video Controls Props
  initialMuted?: boolean;
  onMuteChange?: (isMuted: boolean) => void;
}

export default function SimpleLanding({
  videoUrl = "/HeroVideo 1.mp4",
  mobileVideoUrl,
  mainHeading = "WE'RE BUILDING TECHNOLOGY",
  subHeading = "THAT'S MORE THAN SMART",
  emailHeading = "We're shaping a sustainable future for audio devices.",
  emailSubtext = "More to come - stay tuned",
  emailImage = "/Arfve6.jpg",
  initialMuted = true,
  onMuteChange
}: SimpleLandingProps) {
  // Hero Section State
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero Section Effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoading(false);
      video.play().catch(error => {
        console.error('Video autoplay failed:', error);
        setIsVideoLoading(false);
      });
    };

    const handleError = (error: Event) => {
      console.error('Video error:', error);
      setIsVideoLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError as EventListener);
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError as EventListener);
    };
  }, []);

  // Update video muted state when initialMuted prop changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = initialMuted;
      setIsMuted(initialMuted);
    }
  }, [initialMuted]);

  // Hero Section Handlers
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // Notify parent component if callback provided
      if (onMuteChange) {
        onMuteChange(newMutedState);
      }
    }
  };

  // Email Section Handlers
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
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 absolute top-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-gray-400 text-xs uppercase tracking-wider">Homepage</div>
          <div className="text-right">
            <button 
              className="text-white w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
              {!isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="22" y1="9" x2="16" y2="15"></line>
                  <line x1="16" y1="9" x2="22" y2="15"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="w-full bg-black">
        <div className="relative w-full" style={{ height: 'calc(100vh - 80px)', minHeight: '520px', maxHeight: '90vh' }}>
          {/* Video */}
          <div className="absolute inset-0 w-full overflow-hidden">
            <video
              ref={videoRef}
              className={`
                absolute inset-0 w-full h-full
                object-cover object-center
                transition-opacity duration-700
                ${isVideoLoading ? 'opacity-0' : 'opacity-100'}
              `}
              playsInline
              muted={isMuted}
              loop
              autoPlay
              preload="auto"
            >
              <source 
                src={mobileVideoUrl || videoUrl} 
                type="video/mp4" 
                media="(max-width: 768px)"
              />
              <source 
                src={videoUrl} 
                type="video/mp4" 
                media="(min-width: 769px)"
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Loading Spinner */}
            {isVideoLoading && (
              <div className="absolute inset-0 w-full bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* Overlay for better visibility */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Logo in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl text-white font-medium z-10">arfve</h1>
            </div>

            {/* Video Controls */}
            <button
              onClick={toggleMute}
              className="absolute bottom-6 right-6 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-20"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <Image
                  src="/volume-off.svg"
                  alt="Unmute"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              ) : (
                <Image
                  src="/volume-on.svg"
                  alt="Mute"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide animate-fade-in-up">{mainHeading}</h2>
          {subHeading && (
            <h3 className="text-2xl md:text-3xl font-bold mb-16 tracking-wide animate-fade-in-up">{subHeading}</h3>
          )}
          
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

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-medium">arfve</h1>
          </div>
          <div className="flex flex-col md:flex-row text-xs text-gray-500 gap-4 md:gap-8">
            <Link href="#" className="hover:text-gray-900 transition-colors">Privacy policy</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Cookie settings</Link>
            <span>© 2025 Arfve</span>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" aria-label="YouTube" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
} 