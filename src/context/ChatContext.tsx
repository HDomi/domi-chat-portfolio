import React, { useState, type ReactNode, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useAuthLimiter } from '@/hooks/useAuthLimiter'
import { useRetriever } from '@/hooks/useRetriever'
import { getPrompt } from '@/constant'
import { ChatContext } from '@/hooks/useChat'
import ReactGA from 'react-ga4'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string)
const chatModel = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash-lite' })

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { retrieveContext, loading: isSearching } = useRetriever()
  const { isLimited, remaining, incrementCount } = useAuthLimiter()

  // Track page view on mount
  useEffect(() => {
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
    }
  }, [])

  const sendMessage = async (input: string) => {
    // 1. 제한 체크
    if (isLimited) {
      alert('죄송합니다. 1일 질문 한도(20회)를 초과했습니다.\n내일 다시 방문해 주세요! 😭')
      return
    }

    if (!input.trim() || isGenerating) return

    // Track user question
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      ReactGA.event({
        category: 'Chat',
        action: 'User Question',
        label: input.substring(0, 100), // Limit label length
      })
    }

    const userMessage: IChatMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    try {
      // 2. 카운트 증가
      const success = await incrementCount()
      if (!success) {
        setIsGenerating(false)
        return
      }

      // 3. RAG: 검색
      const context = await retrieveContext(userMessage.text)

      // 4. System Prompt 생성
      const systemPrompt = getPrompt(context)

      // 5. 답변 생성
      const result = await chatModel.generateContent([systemPrompt, `질문: ${userMessage.text}`])
      const response = await result.response
      const text = response.text()

      setMessages(prev => [...prev, { role: 'model', text }])
    } catch (error) {
      console.error('Chat Error:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
      ])
    } finally {
      setIsGenerating(false)
    }
  }

  const resetChat = () => {
    setMessages([])
    setIsGenerating(false)
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        isGenerating,
        isSearching,
        sendMessage,
        resetChat,
        isLimited,
        remaining,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
