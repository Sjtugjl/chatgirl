"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    // 将用户输入的内容编码后作为查询参数传递
    const encodedMessage = encodeURIComponent(input.trim())
    router.push(`/chat?message=${encodedMessage}`)
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* 顶部导航栏 */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              AI Chat
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              登录
            </button>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="pt-16 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full space-y-8 text-center">
          {/* 标题区域 */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent-lavender text-transparent bg-clip-text animate-gradient">
              遇见你的AI闺蜜小粉 🌸
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              温暖贴心的对话，分享快乐，倾听烦恼，一起成长 ✨
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
                    你好！我是你的 AI 助手，有什么我可以帮你的吗？
                  </p>
                </div>
              </div>
            </div>

            {/* 输入框 */}
            <form onSubmit={handleSubmit} className="mt-4">
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
                  开始对话
                </button>
              </div>
            </form>
          </div>

          {/* 特性展示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: '暖心陪伴',
                description: '像闺蜜一样，懂你的喜怒哀乐',
                icon: '💝',
              },
              {
                title: '贴心解答',
                description: '专业知识，生动有趣的分享',
                icon: '✨',
              },
              {
                title: '成长相伴',
                description: '一路相随，互相鼓励与支持',
                icon: '🌸',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
