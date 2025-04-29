'use client';

import Script from 'next/script';
import { MAILERLITE_ACCOUNT_ID, USE_EMBEDDED_FORM } from '../config/mailerLite';

/**
 * This component loads the necessary MailerLite scripts in the document head.
 * Include this component in your layout to enable MailerLite forms across your application.
 */
export default function MailerLiteHeadScript() {
  // Only render scripts if the account ID is available and embedded form is enabled
  if (!MAILERLITE_ACCOUNT_ID || !USE_EMBEDDED_FORM) {
    return null;
  }
  
  return (
    <Script id="mailerlite-universal-script" strategy="afterInteractive">
      {`
        (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
        .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
        n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
        (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
        ml('account', '${MAILERLITE_ACCOUNT_ID}');
      `}
    </Script>
  );
} 