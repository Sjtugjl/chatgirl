'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeContent() {
  const { languageData } = useLanguage();
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // 使用 URLSearchParams 来正确编码消息
      const params = new URLSearchParams({ message: input.trim() });
      router.push(`/chat?${params.toString()}`);
    }
  };

  return (
    <main className="pt-16 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* 标题区域 */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent-lavender text-transparent bg-clip-text animate-gradient">
            {languageData.home.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {languageData.home.subtitle}
          </p>
        </div>

        {/* 对话框示例 */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  AI
                </div>
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                <p className="text-gray-800 dark:text-gray-200">
                  {languageData.welcome}
                </p>
              </div>
            </div>

            {/* 添加输入框和发送按钮 */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={languageData.ui.inputPlaceholder}
                  className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors"
                >
                  {languageData.ui.send}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 特点展示 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/chat"
            className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">💝</div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              {languageData.home.features.empathy}
            </h3>
          </Link>

          <Link
            href="/chat"
            className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              {languageData.home.features.professional}
            </h3>
          </Link>

          <Link
            href="/chat"
            className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              {languageData.home.features.companion}
            </h3>
          </Link>
        </div>
      </div>
    </main>
  );
} 