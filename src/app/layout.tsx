import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsent";
import ModalProvider from "@/components/ModalProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

// Google Analytics and Tag Manager IDs
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export const metadata: Metadata = {
  title: "Arfve - Technology That's More Than Smart",
  description: "We're shaping a sustainable future for audio devices.",
  icons: {
    icon: '/images/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Include Google Analytics and Tag Manager */}
        {(GA_MEASUREMENT_ID && GTM_ID) && (
          <GoogleAnalytics 
            GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} 
            GTM_ID={GTM_ID} 
          />
        )}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
            }}
          />
        )}
        <ModalProvider>
          {children}
          <CookieConsentBanner />
          <ToastContainer position="bottom-right" />
        </ModalProvider>
      </body>
    </html>
  );
}
