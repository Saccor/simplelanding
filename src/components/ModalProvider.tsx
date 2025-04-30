'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';
import PrivacyPolicyModal from './PrivacyPolicy';

// Define the context type
interface ModalContextType {
  isPrivacyPolicyOpen: boolean;
  openPrivacyPolicy: () => void;
  closePrivacyPolicy: () => void;
}

// Create the context with default values
const ModalContext = createContext<ModalContextType>({
  isPrivacyPolicyOpen: false,
  openPrivacyPolicy: () => {},
  closePrivacyPolicy: () => {},
});

// Custom hook to use the modal context
export const useModal = () => useContext(ModalContext);

// Modal Provider component
const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  // Functions to control modal state
  const openPrivacyPolicy = useCallback(() => {
    setIsPrivacyPolicyOpen(true);
  }, []);

  const closePrivacyPolicy = useCallback(() => {
    setIsPrivacyPolicyOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isPrivacyPolicyOpen,
        openPrivacyPolicy,
        closePrivacyPolicy,
      }}
    >
      {children}
      
      {/* Render modals at the root level */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyPolicyOpen} 
        onClose={closePrivacyPolicy} 
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider; 