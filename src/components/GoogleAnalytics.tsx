'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { Cookies } from 'react-cookie-consent';



interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
  GTM_ID: string;
}

const GoogleAnalytics = ({ GA_MEASUREMENT_ID, GTM_ID }: GoogleAnalyticsProps) => {
  // Check if analytics cookies are accepted
  useEffect(() => {
    const consentCookie = Cookies.get('cookieConsent');
    if (consentCookie) {
      try {
        const cookieValue = JSON.parse(consentCookie);
        // If analytics not accepted, disable GA by setting client storage to none
        if (!cookieValue.analytics) {
          window.gtag?.('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
          });
        } else {
          window.gtag?.('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: cookieValue.marketing ? 'granted' : 'denied',
          });
        }
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager - Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* Google Analytics 4 - Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            
            // Configure default consent state
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics; 