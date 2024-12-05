'use client'

import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NavbarContent({ showLogin = true }) {
  const { languageData } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text cursor-pointer">
            AI Chat
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSelector />
        {showLogin && (
          <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {languageData.home.login}
          </button>
        )}
      </div>
    </div>
  );
} 