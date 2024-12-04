import { Suspense } from 'react'
import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'

// 移除 "use client" 指令，使其成为服务器组件
export default function ChatPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
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
          <div className="h-full max-w-4xl mx-auto">
            <Chat initialMessage={searchParams.message} />
          </div>
        </Suspense>
      </main>
    </div>
  )
} 