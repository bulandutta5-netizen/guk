'use client';

import React, { createContext, useContext, useState } from 'react';
import type { Currency } from '@/types/property';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'INR',
  toggleCurrency: () => {},
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  const toggleCurrency = () => {
    setCurrencyState(prev => prev === 'INR' ? 'USD' : 'INR');
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
