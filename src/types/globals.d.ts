// Global type definitions

interface Window {
  gtag: (
    command: string,
    action: string | Date,
    config?: Record<string, any>
  ) => void;
  dataLayer: any[];
} 