"use client"

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { sendMessage } from '@/utils/api';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatMessage extends Message {
  timestamp: string;  // 添加时间戳字段
}

interface ChatProps {
  initialMessage?: string;
}

export default function Chat({ initialMessage }: ChatProps) {
  const { languageData, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: languageData.prompt,
      language: currentLanguage,
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      role: 'assistant',
      content: languageData.welcome,
      language: currentLanguage,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageProcessed = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const processInitialMessage = async () => {
      if (initialMessage && !initialMessageProcessed.current) {
        initialMessageProcessed.current = true;
        const userMessage: ChatMessage = {
          role: 'user',
          content: initialMessage,
          language: currentLanguage,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
          const response = await sendMessage([...messages, userMessage]);
          const assistantMessage: ChatMessage = {
            ...response.choices[0].message,
            language: currentLanguage,
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
          console.error('Failed to send initial message:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    processInitialMessage();
  }, [initialMessage, messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      language: currentLanguage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 重置系统消息以使用当前语言
      const currentMessages = messages.slice(1); // 移除旧的系统消息
      const systemMessage: ChatMessage = {
        role: 'system',
        content: languageData.prompt,
        language: currentLanguage,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      const response = await sendMessage([systemMessage, ...currentMessages, userMessage]);
      const assistantMessage: ChatMessage = {
        ...response.choices[0].message,
        language: currentLanguage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: currentLanguage === 'zh-CN' ? 
          '抱歉，消息发送失败了。请稍后再试 😥' : 
          'Sorry, message sending failed. Please try again later 😥',
        language: currentLanguage,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 更新思考状态的渲染函数
  const renderThinkingMessage = () => {
    if (!isLoading) return null;
    
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm shadow-md">
            🌸
          </div>
        </div>
        <div className="group relative flex flex-col items-start">
          <div className="max-w-[85%] break-words rounded-2xl px-4 py-3 bg-white dark:bg-gray-700 mr-12 shadow-sm border border-accent-peach/30">
            <p className="text-gray-800 dark:text-gray-200 flex items-center">
              <span className="mr-2">{languageData.ui.thinking}</span>
              <span className="flex space-x-1">
                <span className="animate-bounce delay-0">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.slice(1).map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm shadow-md">
                  🌸
                </div>
              </div>
            )}
            <div
              className={`group relative flex flex-col ${
                message.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] break-words rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white ml-12 shadow-md'
                    : 'bg-white dark:bg-gray-700 mr-12 shadow-sm border border-accent-peach/30'
                }`}
              >
                <p className={`whitespace-pre-wrap ${
                  message.role === 'user' 
                    ? 'text-white' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {message.content}
                </p>
              </div>
              <div className={`text-xs text-gray-500 mt-1 ${
                message.role === 'user' ? 'mr-1' : 'ml-1'
              }`}>
                {message.timestamp}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8">
                <div className="w-full h-full rounded-full bg-accent-lavender flex items-center justify-center text-primary text-sm shadow-sm">
                  💝
                </div>
              </div>
            )}
          </div>
        ))}
        {renderThinkingMessage()}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={languageData.ui.inputPlaceholder}
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? languageData.ui.sending : languageData.ui.send}
          </button>
        </div>
      </form>
    </div>
  );
} 