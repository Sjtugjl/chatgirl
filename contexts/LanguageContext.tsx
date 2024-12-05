"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { languages, LanguageCode } from '@/locales/languages';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  languageData: typeof languages[LanguageCode];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh-CN');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageCode;
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // 根据浏览器语言自动设置
      const browserLang = navigator.language;
      const matchedLang = Object.keys(languages).find(
        lang => browserLang.startsWith(lang.split('-')[0])
      ) as LanguageCode;
      setCurrentLanguage(matchedLang || 'zh-CN');
    }
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setCurrentLanguage(code);
    localStorage.setItem('language', code);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        languageData: languages[currentLanguage],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 