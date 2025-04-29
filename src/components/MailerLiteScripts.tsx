'use client';

import React, { useEffect } from 'react';

interface MailerLiteScriptsProps {
  accountId: string; // Your MailerLite account ID
}

/**
 * Component that adds the MailerLite Universal Script to the page
 * This script should be included once per app, not per form
 */
export default function MailerLiteScripts({ accountId }: MailerLiteScriptsProps) {
  useEffect(() => {
    // Check if script is already loaded to avoid duplicates
    if (document.getElementById('mailerlite-universal-script')) {
      return;
    }

    // Load the MailerLite universal script
    const script = document.createElement('script');
    script.id = 'mailerlite-universal-script';
    script.innerHTML = `
      (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
      .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
      n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
      (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
      ml('account', '${accountId}');
    `;
    
    document.head.appendChild(script);

    // Clean up on unmount
    return () => {
      // We don't remove the script on unmount because other parts of the app may still need it
      // If needed, we could implement a reference counting system here
    };
  }, [accountId]);

  // This component doesn't render anything visible
  return null;
} 