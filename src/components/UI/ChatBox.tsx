// src/components/ChatBot.tsx
import React, { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useRetriever } from '../hooks/useRetriever'
import { ChatMessage } from '../types'

// 대화 생성 모델은 1.5-flash나 2.0-flash 사용 (속도/성능 고려)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string)
const chatModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const ChatBot: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { retrieveContext, loading: isSearching } = useRetriever()

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isGenerating, isSearching])

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return

    const userMessage: ChatMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsGenerating(true)

    try {
      // 1. RAG: 관련 지식 검색
      const context = await retrieveContext(userMessage.text)

      // 2. 시스템 프롬프트 구성
      const systemPrompt = `
        당신은 5년 차 프론트엔드 개발자 '황재영'입니다.
        아래의 [Context]를 바탕으로 질문에 답변해 주세요.

        [답변 가이드]
        1. 말투: 자신감 있고 정중한 '해요체'를 사용하세요.
        2. 내용: 기술적인 질문에는 구체적인 경험(프로젝트명, 기술 스택)을 들어 설명하세요.
        3. 정직함: [Context]에 없는 내용은 지어내지 말고, "그 부분은 이력서에 나와있지 않아 답변드리기 어렵습니다."라고 솔직히 말하세요.
        4. 간결함: 핵심 위주로 답변하세요.

        [Context (참고 자료)]
        ${context ? context : '관련된 정보가 없습니다.'}
      `

      // 3. AI 답변 생성
      const result = await chatModel.generateContent([systemPrompt, `질문: ${userMessage.text}`])

      const response = await result.response
      const text = response.text()

      setMessages(prev => [...prev, { role: 'model', text }])
    } catch (error) {
      console.error('Chat Error:', error)
      setMessages(prev => [
        ...prev,
        { role: 'model', text: '죄송합니다. 일시적인 오류가 발생했습니다.' },
      ])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return // 한글 조합 중 엔터 방지
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md border rounded-lg shadow-lg bg-white">
      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* 로딩 인디케이터 */}
        {(isSearching || isGenerating) && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-100 px-4 py-2 rounded-lg text-xs text-gray-500">
              {isSearching ? '이력서 검색 중... 🔍' : '답변 작성 중... ✍️'}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="border-t p-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Zentrix 프로젝트에 대해 물어보세요"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isGenerating}
        />
        <button
          onClick={handleSend}
          disabled={isGenerating || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          전송
        </button>
      </div>
    </div>
  )
}

export default ChatBot
