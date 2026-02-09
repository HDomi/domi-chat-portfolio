import React, { useState, type ReactNode } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useRetriever } from '@/hooks/useRetriever'
import { getPrompt } from '@/constant'
import { ChatContext } from '@/hooks/useChat'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string)
const chatModel = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash-lite' })

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { retrieveContext, loading: isSearching } = useRetriever()

  const sendMessage = async (input: string) => {
    if (!input.trim() || isGenerating) return

    const userMessage: IChatMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    try {
      // 1. RAG: 검색
      const context = await retrieveContext(userMessage.text)

      // 2. System Prompt 생성
      const systemPrompt = getPrompt(context)

      // 3. 답변 생성
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
    <ChatContext.Provider value={{ messages, isGenerating, isSearching, sendMessage, resetChat }}>
      {children}
    </ChatContext.Provider>
  )
}
