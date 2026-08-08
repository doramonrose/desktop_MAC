import React, { createContext, useContext, useCallback } from 'react';
import { VehicleCategory } from '../types';
import { INITIAL_SETTINGS } from '../data/initialData';

export interface QuoteModalPreset {
  vehicle_type?: VehicleCategory | string;
  vehicle_id?: string;
  package_id?: string;
  destination?: string;
  trip_type?: string;
  travel_type?: string;
  start_date?: string;
  end_date?: string;
  passengers?: number;
  pickup_location?: string;
}

interface QuoteModalContextType {
  isOpen: boolean;
  preset: QuoteModalPreset;
  prefill: QuoteModalPreset;
  openQuoteModal: (preset?: QuoteModalPreset) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

interface QuoteModalProviderProps {
  children: React.ReactNode;
  lineUrl?: string;
}

export const QuoteModalProvider: React.FC<QuoteModalProviderProps> = ({
  children,
  lineUrl = INITIAL_SETTINGS.line_url,
}) => {
  const openQuoteModal = useCallback((_preset?: QuoteModalPreset) => {
    const url = lineUrl || INITIAL_SETTINGS.line_url;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [lineUrl]);

  const closeQuoteModal = useCallback(() => {
    // no-op: quote flow now opens LINE directly
  }, []);

  return (
    <QuoteModalContext.Provider
      value={{
        isOpen: false,
        preset: {},
        prefill: {},
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
};

export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return context;
};
