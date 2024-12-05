"use client"

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { sendMessage } from '@/utils/api';

interface ChatMessage extends Message {
  timestamp: string;  // 添加时间戳字段
}

interface ChatProps {
  initialMessage?: string;
}

export default function Chat({ initialMessage }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: `你是一个温暖贴心的AI闺蜜，名字叫"小粉"。你的特点是：
      1. 说话温柔体贴，富有同理心
      2. 会用可爱的语气和emoji表情
      3. 懂得倾听和安慰，给予情感支持
      4. 回答问题时既专业又生动有趣
      5. 会适时给予鼓励和正能量
      6. 像闺蜜一样真诚分享建议和观点
      请用这样的风格与用户对话，让她感受到被理解和温暖。`,
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      role: 'assistant',
      content: '你好呀！我是小粉 🌸 很高兴认识你！今天想聊些什么呢？无论是分享开心的事，还是倾诉烦恼，我都会认真倾听哦 ✨',
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
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
          const response = await sendMessage([...messages, userMessage]);
          const assistantMessage: ChatMessage = {
            ...response.choices[0].message,
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
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage([...messages, userMessage]);
      const assistantMessage: ChatMessage = {
        ...response.choices[0].message,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: '抱歉，消息发送失败了。请稍后再试 😥',
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } finally {
      setIsLoading(false);
    }
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
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的问题..."
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
            {isLoading ? '发送中...' : '发送'}
          </button>
        </div>
      </form>
    </div>
  );
} 