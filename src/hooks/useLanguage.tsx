import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/lib/translations';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Apply font changes based on language
    if (lang === 'ar') {
      document.documentElement.className = document.documentElement.className.replace(/font-\w+/g, '') + ' font-arabic';
    } else {
      document.documentElement.className = document.documentElement.className.replace(/font-\w+/g, '') + ' font-sans';
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};