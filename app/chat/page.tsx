"use client"

import { Suspense } from 'react'
import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'

// 将页面组件设为默认导出
export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar showLogin={false} />
      <main className="pt-16 h-screen">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">加载中...</p>
            </div>
          </div>
        }>
          <ClientChat />
        </Suspense>
      </main>
    </div>
  )
}

// 创建一个单独的客户端组件来处理 URL 参数
function ClientChat() {
  const searchParams = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : new URLSearchParams();
  
  const initialMessage = searchParams.get('message')

  return (
    <div className="h-full max-w-4xl mx-auto">
      <Chat initialMessage={initialMessage || undefined} />
    </div>
  )
} 