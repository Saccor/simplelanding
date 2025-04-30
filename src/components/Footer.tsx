// components/Footer.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from './ModalProvider';
import { Cookies } from 'react-cookie-consent';
import useWindowSize, { breakpoints } from '../hooks/useWindowSize';

export default function Footer() {
  const { openPrivacyPolicy } = useModal();
  const { width, isNanoScreen } = useWindowSize();
  const isExtraSmall = width <= breakpoints.xs;

  // load Poppins
  useEffect(() => {
    if (!document.getElementById('poppins-font-footer')) {
      const link = document.createElement('link');
      link.id = 'poppins-font-footer';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openPrivacyPolicy();
  };
  const handleCookieSettings = () => {
    Cookies.remove('cookieConsent');
    window.location.reload();
  };

  const getLogoSize = () => {
    if (isNanoScreen) return { width: 40, height: 14 };
    if (isExtraSmall) return { width: 90, height: 31 };
    return { width: 118.15, height: 41 };
  };
  const getFontSize = () => {
    if (isNanoScreen) return 'text-[6px]';
    if (isExtraSmall) return 'text-xs';
    return 'text-base';
  };
  const getIconSize = () => {
    if (isNanoScreen) return 8;
    if (isExtraSmall) return 20;
    return 30;
  };

  const logoSize = getLogoSize();
  const fontSize = getFontSize();
  const iconSize = getIconSize();

  return (
    <section className="w-full bg-white shadow-sm flex justify-center">
      <div className="w-full flex justify-center">
        <footer id="footer-section" className="w-full">
          {isNanoScreen ? (
            <div className="flex flex-col items-center justify-center gap-1 py-1 w-full">
              {/* Logo */}
              <div className="flex justify-center">
                <Image
                  src="/arfve-logo-dark.svg"
                  alt="Arfve"
                  width={logoSize.width}
                  height={logoSize.height}
                  priority
                  className="object-contain"
                />
              </div>
              {/* stacked policy & © */}
              <div className={`flex flex-col items-center ${fontSize} font-['Poppins'] leading-tight gap-1`}>
                <button onClick={handlePrivacyPolicyClick} className="hover:opacity-80">Privacy</button>
                <button onClick={handleCookieSettings} className="hover:opacity-80">Cookies</button>
                <span>© 2025</span>
              </div>
              {/* social icons */}
              <div className="flex items-center gap-1">
                {/* ...youtube, instagram, linkedin SVGs as before */}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-[124px] pt-[32px] pb-[24px] gap-[32px] w-full max-w-full overflow-x-auto h-[100px] mx-auto">
              <div className="flex flex-row justify-between items-center min-w-[1192px] h-[41px] gap-[300px]">
                {/* Logo */}
                <Image
                  src="/arfve-logo-dark.svg"
                  alt="Arfve"
                  width={logoSize.width}
                  height={logoSize.height}
                  priority
                  className="object-contain"
                />

                {/* Policy links */}
                <div className={`flex items-center ${fontSize} font-['Poppins'] leading-6 gap-[12px]`}>
                  <button onClick={handlePrivacyPolicyClick} className="whitespace-nowrap hover:opacity-80">
                    Privacy policy
                  </button>
                  <button onClick={handleCookieSettings} className="whitespace-nowrap hover:opacity-80">
                    Cookie settings
                  </button>
                  <span className="whitespace-nowrap">© 2025 Arfve</span>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-[20px]">
                  <Link href="https://www.youtube.com/@arfve" target="_blank" rel="noopener" className="hover:opacity-80">
                    {/* YouTube SVG */}
                    <svg width={iconSize} height={Math.floor(iconSize * 0.7)} viewBox="0 0 30 21" fill="none">
                      <path d="M29.3737 3.25419C29.1998 2.63117 28.8681 2.06353 28.4108 1.60614C27.9534 1.14876 27.3857 0.817102 26.7627 0.643224C24.4243 0.0167416 15.0133 0.0167414 15.0133 0.0167414C15.0133 0.0167414 5.62611 0.00423696 3.26398 0.643224C2.64095 0.817102 2.07332 1.14876 1.61593 1.60614C1.15855 2.06353 0.826891 2.63117 0.653013 3.25419C0.209749 5.64822 -0.00878259 8.07844 0.000270091 10.5131C-0.00707122 12.9387 0.211453 15.3596 0.653013 17.7446C0.826891 18.3676 1.15855 18.9352 1.61593 19.3926C2.07332 19.85 2.64095 20.1817 3.26398 20.3555C5.59985 20.9833 15.0133 20.9833 15.0133 20.9833C15.0133 20.9833 24.3993 20.9833 26.7627 20.3555C27.3857 20.1817 27.9534 19.85 28.4108 19.3926C28.8681 18.9352 29.1998 18.3676 29.3737 17.7446C29.806 15.3587 30.0153 12.9378 29.9989 10.5131C30.017 8.0793 29.8077 5.64909 29.3737 3.25419ZM12.0097 15.0036V6.00897L19.8426 10.5131L12.0097 15.0036Z" fill="black"/>
                    </svg>
                  </Link>
                  <Link href="https://www.instagram.com/arfve_legacy/" target="_blank" rel="noopener" className="hover:opacity-80">
                    {/* Instagram SVG */}
                    <svg width={iconSize} height={iconSize} viewBox="0 0 30 31" fill="none">
                      <path d="M15 0.5C10.925 0.5 10.4163 0.51875 8.81625 0.59C7.21875 0.665 6.13125 0.91625 5.175 1.2875C4.18875 1.67 3.35125 2.18375 2.5175 3.0175C1.68375 3.85125 1.16875 4.6875 0.7875 5.675C0.41625 6.63125 0.16375 7.71875 0.09 9.31625C0.015 10.9163 0 11.425 0 15.5C0 19.575 0.01875 20.0837 0.09 21.6838C0.165 23.28 0.41625 24.3688 0.7875 25.325C1.16411 26.3261 1.7545 27.233 2.5175 27.9825C3.2666 28.746 4.17362 29.3365 5.175 29.7125C6.1325 30.0825 7.22 30.3363 8.81625 30.41C10.4163 30.485 10.925 30.5 15 30.5C19.075 30.5 19.5837 30.4813 21.1838 30.41C22.78 30.335 23.8688 30.0825 24.825 29.7125C25.8258 29.3354 26.7326 28.7451 27.4825 27.9825C28.2463 27.2336 28.8368 26.3265 29.2125 25.325C29.5825 24.3688 29.8363 23.28 29.91 21.6838C29.985 20.0837 30 19.575 30 15.5C30 11.425 29.9813 10.9163 29.91 9.31625C29.835 7.72 29.5825 6.63 29.2125 5.675C28.8357 4.67402 28.2453 3.76716 27.4825 3.0175C26.7339 2.2533 25.8268 1.66274 24.825 1.2875C23.8688 0.91625 22.78 0.66375 21.1838 0.59C19.5837 0.515 19.075 0.5 15 0.5Z" fill="black"/>
                    </svg>
                  </Link>
                  <Link href="https://linkedin.com/company/arfve" target="_blank" rel="noopener" className="hover:opacity-80">
                    {/* LinkedIn SVG */}
                    <svg width={iconSize} height={iconSize} viewBox="0 0 30 31" fill="none">
                      <path d="M25.5588 26.065H21.1162V19.1038C21.1162 17.4438 21.0825 15.3075 18.8013 15.3075C16.485 15.3075 16.1313 17.1138 16.1313 18.9813V26.065H11.6887V11.75H15.9563V13.7013H16.0138C16.61 12.5763 18.06 11.3888 20.2262 11.3888C24.7275 11.3888 25.56 14.3513 25.56 18.2075L25.5588 26.065Z" fill="black"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </footer>
      </div>
    </section>
  );
}
