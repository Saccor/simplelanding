'use client';

import React, { useEffect, useRef } from 'react';

interface MailerLiteFormProps {
  formId: string; // Your MailerLite form ID
  className?: string;
}

/**
 * Component that displays an embedded MailerLite form
 * This requires the MailerLiteScripts component to be included in your app
 */
export default function MailerLiteForm({ formId, className = '' }: MailerLiteFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure we're on client-side and the MailerLite script has loaded
    if (typeof window === 'undefined' || !window.ml) {
      console.warn('MailerLite script not loaded. Make sure MailerLiteScripts component is included.');
      return;
    }

    // Reset the form container to ensure clean state
    if (formContainerRef.current) {
      formContainerRef.current.innerHTML = '';
    }

    // Create an embedded form div
    const formDiv = document.createElement('div');
    formDiv.className = 'ml-embedded';
    formDiv.dataset.form = formId;

    // Append to the form container
    if (formContainerRef.current) {
      formContainerRef.current.appendChild(formDiv);
    }

    // Tell MailerLite to embed forms
    if (window.ml) {
      window.ml('embedForms');
    }

    return () => {
      // Clean up if needed
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
    };
  }, [formId]);

  return (
    <div ref={formContainerRef} className={className}></div>
  );
}

// Add window.ml type definition for TypeScript
declare global {
  interface Window {
    ml: any;
  }
} 