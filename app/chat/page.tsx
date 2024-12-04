"use client"

import { useSearchParams } from 'next/navigation'
import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const initialMessage = searchParams.get('message')

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar showLogin={false} />
      <main className="pt-16 h-screen">
        <div className="h-full max-w-4xl mx-auto">
          <Chat initialMessage={initialMessage || undefined} />
        </div>
      </main>
    </div>
  )
} 