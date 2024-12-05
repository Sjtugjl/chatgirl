"use client"

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, LanguageCode } from '@/locales/languages';

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span>{languages[currentLanguage].flag}</span>
        <span>{languages[currentLanguage].name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-2 max-h-96 overflow-y-auto">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code as LanguageCode);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  currentLanguage === code ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 