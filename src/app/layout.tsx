import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsent";
import ModalProvider from "@/components/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

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
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          {children}
          <CookieConsentBanner />
        </ModalProvider>
      </body>
    </html>
  );
}
