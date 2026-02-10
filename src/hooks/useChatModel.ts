import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getModelInfo, getPromptForGemini, getPromptForLocalModel } from '@/constant'

const GEN_AI_KEY = import.meta.env.VITE_GEMINI_API_KEY as string
const LOCAL_API_URL = import.meta.env.VITE_LOCAL_MODEL_API as string

export const useChatModel = (): IUseChatModelReturn => {
  const [currentModel, setCurrentModel] = useState<ModelType>('Gemini')
  const abortControllerRef = useState<{ current: AbortController | null }>({ current: null })[0]

  // 1. Gemini 호출 함수
  const callGemini = async (
    systemPrompt: string,
    userText: string,
    onStream: (text: string, done: boolean) => void,
    signal: AbortSignal,
  ) => {
    const genAI = new GoogleGenerativeAI(GEN_AI_KEY)
    const model = genAI.getGenerativeModel({ model: getModelInfo('Gemini', 'callPath') })

    const result = await model.generateContentStream([systemPrompt, `질문: ${userText}`])

    // let fullText = ''
    try {
      for await (const chunk of result.stream) {
        if (signal.aborted) {
          throw new DOMException('Aborted', 'AbortError')
        }
        const chunkText = chunk.text()
        // fullText += chunkText
        onStream(chunkText, false)
      }
      // console.info('Gemini Full Text:', fullText)
      onStream('', true)
    } catch (error: unknown) {
      if (error instanceof Error && (error.name === 'AbortError' || signal.aborted)) {
        console.info('Gemini generation stopped by user.')
        onStream('', true) // Stop indicator
      } else {
        throw error
      }
    }
  }

  // 2. LocalModel (Ollama) 호출 함수
  const callLocalModel = async (
    systemPrompt: string,
    userText: string,
    onStream: (text: string, done: boolean) => void,
    signal: AbortSignal,
  ) => {
    const prompt = `
      ${systemPrompt}

      **사용자 질문:**
      ${userText}
    `

    try {
      const response = await fetch(LOCAL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: getModelInfo('Gemma', 'callPath'),
          prompt: prompt,
          stream: true,
          temperature: 0,
        }),
        signal,
      })

      if (!response.body) throw new Error('Response body is null')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let buffer = '' // Partial JSON buffer

      while (!done) {
        if (signal.aborted) {
          reader.cancel()
          break
        }
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value, { stream: !done })

        buffer += chunkValue
        const lines = buffer.split('\n')

        // 마지막 라인이 완벽하지 않을 수 있으므로 buffer에 남겨둠
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.trim() === '') continue
          try {
            const json = JSON.parse(line)
            const aiText = json.response
            if (aiText) onStream(aiText, false)
            if (json.done) {
              onStream('', true)
              return
            }
          } catch (e) {
            console.error('JSON Parse Error:', e)
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.info('LocalModel generation stopped by user.')
      } else {
        throw error
      }
    } finally {
      // 스트림이 끝났거나 에러가 났을 때 강제 종료 신호
      onStream('', true)
    }
  }

  // 3. 메인 함수 (Hybrid Strategy)
  const generateResponse = async (
    userText: string,
    context: string,
    usageCount: number,
    dailyLimit: number,
    onStream: (text: string, done: boolean) => void,
  ) => {
    // 전략: 기본적으로 쿼터 미만이면 Gemini, 아니면 LocalModel
    // 하지만 Gemini가 실패하면 LocalModel Fallback

    const isGemini = usageCount < dailyLimit

    // 3. System Prompt 생성
    const systemPrompt = isGemini ? getPromptForGemini(context) : getPromptForLocalModel(context)
    const preferModel = isGemini ? 'Gemini' : 'Local'
    setCurrentModel(preferModel)

    // AbortController 초기화
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      if (preferModel === 'Gemini') {
        try {
          await callGemini(systemPrompt, userText, onStream, signal)
        } catch (geminiError: unknown) {
          const isAborted =
            geminiError instanceof Error && (geminiError.name === 'AbortError' || signal.aborted)

          if (isAborted) {
            return // 정지된 경우 fallback 하지 않음
          }
          console.error('Gemini Error:', geminiError)
          setCurrentModel('Local') // 뱃지 변경
          onStream('\n(Gemini 연결 실패로 로컬 모델이 답변합니다...)\n', false)

          // Fallback 시에도 signal 전달 (사용자가 중간에 멈출 수 있으므로)
          // 단, 이미 aborted된 상태라면 실행하지 않아야 함.
          if (!signal.aborted) {
            await callLocalModel(systemPrompt, userText, onStream, signal)
          }
        }
      } else {
        await callLocalModel(systemPrompt, userText, onStream, signal)
      }
    } catch (finalError) {
      console.error('All models failed:', finalError)
      throw finalError
    } finally {
      abortControllerRef.current = null
    }
  }

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }

  return { currentModel, generateResponse, stopGeneration }
}
