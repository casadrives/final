import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface AppContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
  formatAmount: (amount: number) => string;
}

export const languages: Language[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'lu', name: 'Lëtzebuergesch', flag: '🇱🇺' },
];

export const currencies: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [language, setLanguage] = useState<Language>(languages[0]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat(language.code, {
      style: 'currency',
      currency: currency.code,
    }).format(amount);
  };

  return (
    <AppContext.Provider value={{
      currency,
      setCurrency,
      language,
      setLanguage,
      languages,
      formatAmount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}