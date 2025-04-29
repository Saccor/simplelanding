'use client';

import React, { useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';

// Define cookie options
interface CookieOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsentBanner: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [cookieOptions, setCookieOptions] = useState<CookieOptions>({
    necessary: true, // Always true as these are essential
    analytics: false,
    marketing: false,
  });

  // Handle cookie settings change
  const handleOptionsChange = (type: keyof CookieOptions) => {
    if (type === 'necessary') return; // Can't change necessary cookies
    setCookieOptions({
      ...cookieOptions,
      [type]: !cookieOptions[type],
    });
  };

  // Accept selected cookies
  const acceptSelected = () => {
    // Store cookie preferences
    Cookies.set('cookieConsent', JSON.stringify(cookieOptions), { expires: 365 });
    
    // Apply cookie settings
    if (cookieOptions.analytics) {
      // Enable analytics cookies (placeholder)
      console.log('Analytics cookies enabled');
    }
    if (cookieOptions.marketing) {
      // Enable marketing cookies (placeholder)
      console.log('Marketing cookies enabled');
    }
    
    setShowSettings(false);
  };

  // Accept all cookies
  const acceptAll = () => {
    const allOptions = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    // Store cookie preferences
    Cookies.set('cookieConsent', JSON.stringify(allOptions), { expires: 365 });
    
    // Apply cookie settings
    console.log('All cookies enabled');
    
    setShowSettings(false);
  };

  // Decline all optional cookies
  const declineAll = () => {
    const minimalOptions = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    // Store cookie preferences
    Cookies.set('cookieConsent', JSON.stringify(minimalOptions), { expires: 365 });
    
    // Apply cookie settings
    console.log('Only necessary cookies enabled');
    
    setShowSettings(false);
  };

  // Toggle settings panel
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        declineButtonText="Decline"
        cookieName="cookieConsent"
        style={{ 
          background: "#333",
          color: "#fff",
          zIndex: 1000,
          padding: "16px",
          alignItems: "center",
          maxWidth: "100%",
        }}
        buttonStyle={{
          background: "#a75c31",
          color: "white",
          fontSize: "14px",
          padding: "10px 15px",
          borderRadius: "4px",
        }}
        declineButtonStyle={{
          background: "transparent",
          color: "white",
          fontSize: "14px",
          padding: "10px 15px",
          borderRadius: "4px",
          border: "1px solid white",
        }}
        enableDeclineButton
        onAccept={acceptAll}
        onDecline={declineAll}
        expires={365}
      >
        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>This website uses cookies</h3>
          <p style={{ fontSize: "14px", marginBottom: "16px" }}>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
            By clicking "Accept All", you consent to our use of cookies.
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSettings();
            }}
            style={{
              background: "transparent",
              color: "white",
              textDecoration: "underline",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              padding: "0",
            }}
          >
            Cookie Settings
          </button>
        </div>

        {showSettings && (
          <div style={{ 
            marginTop: "15px", 
            padding: "15px", 
            background: "#444", 
            borderRadius: "4px",
            fontSize: "14px"
          }}>
            <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Cookie Settings</h4>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={cookieOptions.necessary}
                  disabled={true}
                  style={{ marginRight: "8px" }}
                />
                Necessary Cookies (Required)
              </label>
              <p style={{ fontSize: "12px", marginLeft: "24px", color: "#ccc" }}>
                These cookies are essential for the website to function properly.
              </p>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={cookieOptions.analytics}
                  onChange={() => handleOptionsChange('analytics')}
                  style={{ marginRight: "8px" }}
                />
                Analytics Cookies
              </label>
              <p style={{ fontSize: "12px", marginLeft: "24px", color: "#ccc" }}>
                These cookies help us understand how visitors interact with our website.
              </p>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={cookieOptions.marketing}
                  onChange={() => handleOptionsChange('marketing')}
                  style={{ marginRight: "8px" }}
                />
                Marketing Cookies
              </label>
              <p style={{ fontSize: "12px", marginLeft: "24px", color: "#ccc" }}>
                These cookies are used to track visitors across websites to display relevant advertisements.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={acceptSelected}
                style={{
                  background: "#a75c31",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </CookieConsent>
    </>
  );
};

export default CookieConsentBanner; 