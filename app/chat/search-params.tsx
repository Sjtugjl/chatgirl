'use client'

import { useSearchParams } from 'next/navigation'
import Chat from '@/components/Chat'

export default function SearchParamsComponent() {
  const searchParams = useSearchParams()
  const initialMessage = searchParams.get('message')

  return (
    <div className="h-full max-w-4xl mx-auto">
      <Chat initialMessage={initialMessage || undefined} />
    </div>
  )
} 