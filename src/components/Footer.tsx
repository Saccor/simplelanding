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
  const isMobile = width < breakpoints.md;

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

  // Mobile footer styling 
  if (isMobile) {
    return (
      <section className="w-full bg-white shadow-sm flex justify-center">
        <div className="w-full flex justify-center">
          <footer id="footer-section" className="w-full py-4">
            <div className="flex flex-col items-center gap-4 w-full px-4">
              {/* Logo */}
              <Image
                src="/arfve-logo-dark.svg"
                alt="Arfve"
                width={logoSize.width}
                height={logoSize.height}
                priority
                className="object-contain"
              />

              {/* Policy links & Copyright in a row */}
              <div className={`flex flex-row items-center justify-center flex-wrap ${fontSize} font-['Poppins'] gap-3`}>
                <button onClick={handlePrivacyPolicyClick} className="hover:opacity-80">
                  Privacy policy
                </button>
                <button onClick={handleCookieSettings} className="hover:opacity-80">
                  Cookie settings
                </button>
                <span>© 2025 Arfve</span>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                <Link href="https://www.youtube.com/@arfve" target="_blank" rel="noopener" className="hover:opacity-80">
                  {/* YouTube SVG */}
                  <svg width={iconSize} height={Math.floor(iconSize * 0.7)} viewBox="0 0 30 21" fill="none">
                    <path d="M29.3737 3.25407C29.1998 2.63104 28.8681 2.0634 28.4108 1.60602C27.9534 1.14864 27.3857 0.81698 26.7627 0.643102C24.4243 0.0166195 15.0133 0.0166193 15.0133 0.0166193C15.0133 0.0166193 5.62611 0.00411489 3.26398 0.643102C2.64095 0.81698 2.07332 1.14864 1.61593 1.60602C1.15855 2.0634 0.826891 2.63104 0.653013 3.25407C0.209749 5.6481 -0.00878259 8.07832 0.000270091 10.513C-0.00707122 12.9385 0.211453 15.3595 0.653013 17.7445C0.826891 18.3675 1.15855 18.9351 1.61593 19.3925C2.07332 19.8499 2.64095 20.1815 3.26398 20.3554C5.59985 20.9832 15.0133 20.9832 15.0133 20.9832C15.0133 20.9832 24.3993 20.9832 26.7627 20.3554C27.3857 20.1815 27.9534 19.8499 28.4108 19.3925C28.8681 18.9351 29.1998 18.3675 29.3737 17.7445C29.806 15.3586 30.0153 12.9377 29.9989 10.513C30.017 8.07918 29.8077 5.64897 29.3737 3.25407ZM12.0097 15.0034V6.00884L19.8426 10.513L12.0097 15.0034Z" fill="black"/>
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/arfve_legacy/" target="_blank" rel="noopener" className="hover:opacity-80">
                  {/* Instagram SVG */}
                  <svg width={iconSize} height={iconSize} viewBox="0 0 30 31" fill="none">
                    <path d="M15 0.5C10.925 0.5 10.4163 0.51875 8.81625 0.59C7.21875 0.665 6.13125 0.91625 5.175 1.2875C4.18875 1.67 3.35125 2.18375 2.5175 3.0175C1.68375 3.85125 1.16875 4.6875 0.7875 5.675C0.41625 6.63125 0.16375 7.71875 0.09 9.31625C0.015 10.9163 0 11.425 0 15.5C0 19.575 0.01875 20.0837 0.09 21.6838C0.165 23.28 0.41625 24.3688 0.7875 25.325C1.16411 26.3261 1.7545 27.233 2.5175 27.9825C3.2666 28.746 4.17362 29.3365 5.175 29.7125C6.1325 30.0825 7.22 30.3363 8.81625 30.41C10.4163 30.485 10.925 30.5 15 30.5C19.075 30.5 19.5837 30.4813 21.1838 30.41C22.78 30.335 23.8688 30.0825 24.825 29.7125C25.8258 29.3354 26.7326 28.7451 27.4825 27.9825C28.2463 27.2336 28.8368 26.3265 29.2125 25.325C29.5825 24.3688 29.8363 23.28 29.91 21.6838C29.985 20.0837 30 19.575 30 15.5C30 11.425 29.9813 10.9163 29.91 9.31625C29.835 7.72 29.5825 6.63 29.2125 5.675C28.8357 4.67402 28.2453 3.76716 27.4825 3.0175C26.7339 2.2533 25.8268 1.66274 24.825 1.2875C23.8688 0.91625 22.78 0.66375 21.1838 0.59C19.5837 0.515 19.075 0.5 15 0.5ZM15 3.2C19.0037 3.2 19.4813 3.22 21.0625 3.28875C22.525 3.3575 23.3187 3.6 23.8462 3.8075C24.5487 4.07875 25.0462 4.40375 25.5737 4.9275C26.0975 5.4525 26.4225 5.95125 26.6937 6.65375C26.8987 7.18125 27.1437 7.975 27.21 9.4375C27.2812 11.02 27.2975 11.495 27.2975 15.5C27.2975 19.505 27.2787 19.9813 27.205 21.5625C27.1287 23.025 26.885 23.8187 26.6788 24.3462C26.4347 24.9972 26.0512 25.5868 25.555 26.0737C25.0702 26.5704 24.4809 26.9529 23.83 27.1937C23.305 27.3987 22.4988 27.6437 21.0363 27.71C19.4438 27.7812 18.975 27.7975 14.9625 27.7975C10.9488 27.7975 10.48 27.7787 8.88875 27.705C7.425 27.6287 6.61875 27.385 6.09375 27.1788C5.44238 26.9377 4.85335 26.5537 4.37 26.055C3.86823 25.5734 3.48339 24.9833 3.245 24.33C3.03875 23.805 2.79625 22.9988 2.72 21.5363C2.66375 19.9613 2.64375 19.475 2.64375 15.4812C2.64375 11.4862 2.66375 10.9987 2.72 9.405C2.79625 7.9425 3.03875 7.1375 3.245 6.6125C3.5075 5.9 3.84375 5.4125 4.37 4.88625C4.89375 4.3625 5.3825 4.025 6.09375 3.76375C6.61875 3.55625 7.4075 3.3125 8.87 3.2375C10.4637 3.18125 10.9325 3.1625 14.9438 3.1625L15 3.2ZM15 7.7975C13.9885 7.7975 12.9869 7.99673 12.0524 8.38382C11.1179 8.7709 10.2688 9.33827 9.55351 10.0535C8.83827 10.7688 8.2709 11.6179 7.88382 12.5524C7.49673 13.4869 7.2975 14.4885 7.2975 15.5C7.2975 16.5115 7.49673 17.5131 7.88382 18.4476C8.2709 19.3821 8.83827 20.2312 9.55351 20.9465C10.2688 21.6617 11.1179 22.2291 12.0524 22.6162C12.9869 23.0033 13.9885 23.2025 15 23.2025C17.0428 23.2025 19.002 22.391 20.4465 20.9465C21.891 19.502 22.7025 17.5428 22.7025 15.5C22.7025 13.4572 21.891 11.498 20.4465 10.0535C19.002 8.60901 17.0428 7.7975 15 7.7975ZM15 20.5C12.2375 20.5 10 18.2625 10 15.5C10 12.7375 12.2375 10.5 15 10.5C17.7625 10.5 20 12.7375 20 15.5C20 18.2625 17.7625 20.5 15 20.5ZM24.8075 7.49375C24.7901 7.95953 24.5929 8.40045 24.2572 8.72384C23.9216 9.04723 23.4736 9.22791 23.0075 9.22791C22.5414 9.22791 22.0934 9.04723 21.7578 8.72384C21.4221 8.40045 21.2249 7.95953 21.2075 7.49375C21.2075 7.01636 21.3971 6.55852 21.7347 6.22096C22.0723 5.88339 22.5301 5.69375 23.0075 5.69375C23.4849 5.69375 23.9427 5.88339 24.2803 6.22096C24.6179 6.55852 24.8075 7.01636 24.8075 7.49375Z" fill="black"/>
                  </svg>
                </Link>
                <Link href="https://linkedin.com/company/arfve" target="_blank" rel="noopener" className="hover:opacity-80">
                  {/* LinkedIn SVG */}
                  <svg width={iconSize} height={iconSize} viewBox="0 0 30 31" fill="none">
                    <path d="M25.5588 26.065H21.1162V19.1038C21.1162 17.4438 21.0825 15.3075 18.8013 15.3075C16.485 15.3075 16.1313 17.1138 16.1313 18.9813V26.065H11.6887V11.75H15.9563V13.7013H16.0138C16.61 12.5763 18.06 11.3888 20.2262 11.3888C24.7275 11.3888 25.56 14.3513 25.56 18.2075L25.5588 26.065ZM6.67125 9.79125C6.33235 9.79142 5.99674 9.72474 5.68363 9.59505C5.37053 9.46536 5.08607 9.27519 4.84655 9.03543C4.60702 8.79568 4.41713 8.51104 4.28774 8.19781C4.15835 7.88458 4.09201 7.5489 4.0925 7.21C4.09275 6.69972 4.2443 6.20098 4.528 5.77684C4.8117 5.3527 5.2148 5.02221 5.68633 4.82716C6.15786 4.63212 6.67664 4.58128 7.17706 4.68107C7.67748 4.78086 8.13707 5.0268 8.49772 5.3878C8.85836 5.74879 9.10386 6.20862 9.20317 6.70914C9.30248 7.20966 9.25113 7.72839 9.05563 8.19973C8.86013 8.67107 8.52925 9.07385 8.10483 9.35714C7.68042 9.64042 7.18153 9.7915 6.67125 9.79125ZM8.89875 26.065H4.44375V11.75H8.89875V26.065ZM27.7812 0.5H2.21375C0.99 0.5 0 1.4675 0 2.66125V28.3387C0 29.5337 0.99 30.5 2.21375 30.5H27.7775C29 30.5 30 29.5337 30 28.3387V2.66125C30 1.4675 29 0.5 27.7775 0.5H27.7812Z" fill="black"/>
                  </svg>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </section>
    );
  }

  // Desktop footer styling - no changes to preserve exact look
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
            <div className="flex flex-col items-center px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 2xl:px-[124px] pt-[32px] pb-[24px] gap-[32px] w-full max-w-full overflow-x-auto h-[100px] mx-auto">
              <div className="
                  flex flex-row justify-between items-center footer-desktop-layout
                  w-full max-w-[1192px] h-[41px]
                  gap-[50px] sm:gap-[70px] md:gap-[90px] lg:gap-[120px] xl:gap-[180px] 2xl:gap-[300px]
                ">
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
                <div className={`flex items-center ${fontSize} font-['Poppins'] leading-6 gap-[8px] md:gap-[10px] lg:gap-[12px]`}>
                  <button onClick={handlePrivacyPolicyClick} className="whitespace-nowrap hover:opacity-80">
                    Privacy policy
                  </button>
                  <button onClick={handleCookieSettings} className="whitespace-nowrap hover:opacity-80">
                    Cookie settings
                  </button>
                  <span className="whitespace-nowrap">© 2025 Arfve</span>
                </div>

                {/* Social icons - added flex-shrink-0 */}
                <div className="flex items-center gap-[8px] sm:gap-[10px] md:gap-[12px] lg:gap-[15px] xl:gap-[20px] pr-2 sm:pr-0 flex-shrink-0">
                  <Link href="https://www.youtube.com/@arfve" target="_blank" rel="noopener" className="hover:opacity-80">
                    {/* YouTube SVG */}
                    <svg width={iconSize} height={Math.floor(iconSize * 0.7)} viewBox="0 0 30 21" fill="none">
                      <path d="M29.3737 3.25407C29.1998 2.63104 28.8681 2.0634 28.4108 1.60602C27.9534 1.14864 27.3857 0.81698 26.7627 0.643102C24.4243 0.0166195 15.0133 0.0166193 15.0133 0.0166193C15.0133 0.0166193 5.62611 0.00411489 3.26398 0.643102C2.64095 0.81698 2.07332 1.14864 1.61593 1.60602C1.15855 2.0634 0.826891 2.63104 0.653013 3.25407C0.209749 5.6481 -0.00878259 8.07832 0.000270091 10.513C-0.00707122 12.9385 0.211453 15.3595 0.653013 17.7445C0.826891 18.3675 1.15855 18.9351 1.61593 19.3925C2.07332 19.8499 2.64095 20.1815 3.26398 20.3554C5.59985 20.9832 15.0133 20.9832 15.0133 20.9832C15.0133 20.9832 24.3993 20.9832 26.7627 20.3554C27.3857 20.1815 27.9534 19.8499 28.4108 19.3925C28.8681 18.9351 29.1998 18.3675 29.3737 17.7445C29.806 15.3586 30.0153 12.9377 29.9989 10.513C30.017 8.07918 29.8077 5.64897 29.3737 3.25407ZM12.0097 15.0034V6.00884L19.8426 10.513L12.0097 15.0034Z" fill="black"/>
                    </svg>
                  </Link>
                  <Link href="https://www.instagram.com/arfve_legacy/" target="_blank" rel="noopener" className="hover:opacity-80">
                    {/* Instagram SVG */}
                    <svg width={iconSize} height={iconSize} viewBox="0 0 30 31" fill="none">
                      <path d="M15 0.5C10.925 0.5 10.4163 0.51875 8.81625 0.59C7.21875 0.665 6.13125 0.91625 5.175 1.2875C4.18875 1.67 3.35125 2.18375 2.5175 3.0175C1.68375 3.85125 1.16875 4.6875 0.7875 5.675C0.41625 6.63125 0.16375 7.71875 0.09 9.31625C0.015 10.9163 0 11.425 0 15.5C0 19.575 0.01875 20.0837 0.09 21.6838C0.165 23.28 0.41625 24.3688 0.7875 25.325C1.16411 26.3261 1.7545 27.233 2.5175 27.9825C3.2666 28.746 4.17362 29.3365 5.175 29.7125C6.1325 30.0825 7.22 30.3363 8.81625 30.41C10.4163 30.485 10.925 30.5 15 30.5C19.075 30.5 19.5837 30.4813 21.1838 30.41C22.78 30.335 23.8688 30.0825 24.825 29.7125C25.8258 29.3354 26.7326 28.7451 27.4825 27.9825C28.2463 27.2336 28.8368 26.3265 29.2125 25.325C29.5825 24.3688 29.8363 23.28 29.91 21.6838C29.985 20.0837 30 19.575 30 15.5C30 11.425 29.9813 10.9163 29.91 9.31625C29.835 7.72 29.5825 6.63 29.2125 5.675C28.8357 4.67402 28.2453 3.76716 27.4825 3.0175C26.7339 2.2533 25.8268 1.66274 24.825 1.2875C23.8688 0.91625 22.78 0.66375 21.1838 0.59C19.5837 0.515 19.075 0.5 15 0.5ZM15 3.2C19.0037 3.2 19.4813 3.22 21.0625 3.28875C22.525 3.3575 23.3187 3.6 23.8462 3.8075C24.5487 4.07875 25.0462 4.40375 25.5737 4.9275C26.0975 5.4525 26.4225 5.95125 26.6937 6.65375C26.8987 7.18125 27.1437 7.975 27.21 9.4375C27.2812 11.02 27.2975 11.495 27.2975 15.5C27.2975 19.505 27.2787 19.9813 27.205 21.5625C27.1287 23.025 26.885 23.8187 26.6788 24.3462C26.4347 24.9972 26.0512 25.5868 25.555 26.0737C25.0702 26.5704 24.4809 26.9529 23.83 27.1937C23.305 27.3987 22.4988 27.6437 21.0363 27.71C19.4438 27.7812 18.975 27.7975 14.9625 27.7975C10.9488 27.7975 10.48 27.7787 8.88875 27.705C7.425 27.6287 6.61875 27.385 6.09375 27.1788C5.44238 26.9377 4.85335 26.5537 4.37 26.055C3.86823 25.5734 3.48339 24.9833 3.245 24.33C3.03875 23.805 2.79625 22.9988 2.72 21.5363C2.66375 19.9613 2.64375 19.475 2.64375 15.4812C2.64375 11.4862 2.66375 10.9987 2.72 9.405C2.79625 7.9425 3.03875 7.1375 3.245 6.6125C3.5075 5.9 3.84375 5.4125 4.37 4.88625C4.89375 4.3625 5.3825 4.025 6.09375 3.76375C6.61875 3.55625 7.4075 3.3125 8.87 3.2375C10.4637 3.18125 10.9325 3.1625 14.9438 3.1625L15 3.2ZM15 7.7975C13.9885 7.7975 12.9869 7.99673 12.0524 8.38382C11.1179 8.7709 10.2688 9.33827 9.55351 10.0535C8.83827 10.7688 8.2709 11.6179 7.88382 12.5524C7.49673 13.4869 7.2975 14.4885 7.2975 15.5C7.2975 16.5115 7.49673 17.5131 7.88382 18.4476C8.2709 19.3821 8.83827 20.2312 9.55351 20.9465C10.2688 21.6617 11.1179 22.2291 12.0524 22.6162C12.9869 23.0033 13.9885 23.2025 15 23.2025C17.0428 23.2025 19.002 22.391 20.4465 20.9465C21.891 19.502 22.7025 17.5428 22.7025 15.5C22.7025 13.4572 21.891 11.498 20.4465 10.0535C19.002 8.60901 17.0428 7.7975 15 7.7975ZM15 20.5C12.2375 20.5 10 18.2625 10 15.5C10 12.7375 12.2375 10.5 15 10.5C17.7625 10.5 20 12.7375 20 15.5C20 18.2625 17.7625 20.5 15 20.5ZM24.8075 7.49375C24.7901 7.95953 24.5929 8.40045 24.2572 8.72384C23.9216 9.04723 23.4736 9.22791 23.0075 9.22791C22.5414 9.22791 22.0934 9.04723 21.7578 8.72384C21.4221 8.40045 21.2249 7.95953 21.2075 7.49375C21.2075 7.01636 21.3971 6.55852 21.7347 6.22096C22.0723 5.88339 22.5301 5.69375 23.0075 5.69375C23.4849 5.69375 23.9427 5.88339 24.2803 6.22096C24.6179 6.55852 24.8075 7.01636 24.8075 7.49375Z" fill="black"/>
                    </svg>
                  </Link>
                  <Link href="https://linkedin.com/company/arfve" target="_blank" rel="noopener" className="hover:opacity-80">
                    {/* LinkedIn SVG */}
                    <svg width={iconSize} height={iconSize} viewBox="0 0 30 31" fill="none">
                      <path d="M25.5588 26.065H21.1162V19.1038C21.1162 17.4438 21.0825 15.3075 18.8013 15.3075C16.485 15.3075 16.1313 17.1138 16.1313 18.9813V26.065H11.6887V11.75H15.9563V13.7013H16.0138C16.61 12.5763 18.06 11.3888 20.2262 11.3888C24.7275 11.3888 25.56 14.3513 25.56 18.2075L25.5588 26.065ZM6.67125 9.79125C6.33235 9.79142 5.99674 9.72474 5.68363 9.59505C5.37053 9.46536 5.08607 9.27519 4.84655 9.03543C4.60702 8.79568 4.41713 8.51104 4.28774 8.19781C4.15835 7.88458 4.09201 7.5489 4.0925 7.21C4.09275 6.69972 4.2443 6.20098 4.528 5.77684C4.8117 5.3527 5.2148 5.02221 5.68633 4.82716C6.15786 4.63212 6.67664 4.58128 7.17706 4.68107C7.67748 4.78086 8.13707 5.0268 8.49772 5.3878C8.85836 5.74879 9.10386 6.20862 9.20317 6.70914C9.30248 7.20966 9.25113 7.72839 9.05563 8.19973C8.86013 8.67107 8.52925 9.07385 8.10483 9.35714C7.68042 9.64042 7.18153 9.7915 6.67125 9.79125ZM8.89875 26.065H4.44375V11.75H8.89875V26.065ZM27.7812 0.5H2.21375C0.99 0.5 0 1.4675 0 2.66125V28.3387C0 29.5337 0.99 30.5 2.21375 30.5H27.7775C29 30.5 30 29.5337 30 28.3387V2.66125C30 1.4675 29 0.5 27.7775 0.5H27.7812Z" fill="black"/>
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
