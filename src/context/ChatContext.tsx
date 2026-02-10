import React, { useState, type ReactNode, useEffect } from 'react'
import ReactGA from 'react-ga4'

import { useAuthLimiter, DAILY_LIMIT } from '@/hooks/useAuthLimiter'
import { useRetriever } from '@/hooks/useRetriever'
import { useChatModel } from '@/hooks/useChatModel'
import { ChatContext } from '@/hooks/useChat'

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { retrieveContext, loading: isSearching } = useRetriever()

  // count를 useChatModel 호출 시 사용
  const { isLimited, remaining, incrementCount, count } = useAuthLimiter()
  const { currentModel, generateResponse, stopGeneration } = useChatModel()

  // Track page view on mount
  useEffect(() => {
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
    }
  }, [])

  const sendMessage = async (input: string) => {
    // NOTE: 하이브리드 모델이므로 제한 체크(isLimited)를 해서 막지 않음.
    // 대신 count 체크를 통해 모델을 스위칭함.
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
      // 1. 카운트 증가 (Gemini 쿼터 내일 경우에만 증가)
      // 이미 10회 이상이면, LocalModel 쓰므로 카운트를 증가시키지 않음 (혹은 통계용으로 별도 처리 가능하지만 일단 유지)
      if (count < DAILY_LIMIT) {
        await incrementCount()
      }
      // 2. RAG: 검색
      const context = await retrieveContext(userMessage.text)

      // 3. 모델 답변 생성 (Gemini <-> LocalModel 자동 스위칭)
      // 빈 말풍선 추가
      setMessages(prev => [...prev, { role: 'model', text: '' }])

      await generateResponse(userMessage.text, context, count, DAILY_LIMIT, (text, done) => {
        if (text) {
          setMessages(prev => {
            const newMsgs = [...prev]
            const lastMsg = { ...newMsgs[newMsgs.length - 1] }
            if (lastMsg.role === 'model') {
              // 스트리밍 텍스트 누적
              // Note: useChatModel에서 이미 누적된 텍스트가 아닌 chunk를 준다면 여기서 누적해야 함.
              // 현재 useChatModel 구현:
              // Gemini: chunk.text() (부분 텍스트)
              // LocalModel: json.response (부분 텍스트)
              // 따라서 누적(+=) 해야 함.
              lastMsg.text += text
              newMsgs[newMsgs.length - 1] = lastMsg
            }
            return newMsgs
          })
        }
        if (done) {
          setIsGenerating(false)
        }
      })
    } catch (error) {
      console.error('Chat Error:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
      ])
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
        isLimited, // Gemini Limit reached 여부
        remaining,
        currentModel,
        stopGeneration,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
