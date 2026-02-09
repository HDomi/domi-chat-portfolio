// src/hooks/useRetriever.ts
import { useState } from 'react'
import { db } from '@/firebase' // firebase 설정 파일 import
import { collection, getDocs } from 'firebase/firestore'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { cosineSimilarity } from '@/utils'

// 환경변수 타입 단언
const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string
const genAI = new GoogleGenerativeAI(apiKey)

export const useRetriever = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const embeddingModel = genAI.getGenerativeModel({
    model: 'models/gemini-embedding-001',
  })

  const retrieveContext = async (query: string): Promise<string> => {
    setLoading(true)
    try {
      // 1. 사용자 질문 임베딩 (Vectorization)
      const queryResult = await embeddingModel.embedContent(query)
      const queryEmbedding = queryResult.embedding.values

      // 2. Firestore 데이터 전체 로드
      // (데이터가 수천 건 미만일 땐 클라이언트 필터링이 가장 빠르고 비용 효율적입니다)
      const querySnapshot = await getDocs(collection(db, 'resume_chunks'))

      const chunks: IResumeChunk[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<IResumeChunk, 'id'>),
      }))

      // 3. 코사인 유사도 계산
      const scoredChunks = chunks.map(chunk => ({
        ...chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
      }))

      // 4. 유사도 정렬 및 Top-K 추출 (상위 3개)
      const topChunks = scoredChunks.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 10)

      console.log(
        '[메시지]: 유사도 검색 결과',
        topChunks.map(c => `${c.category} (${c.score?.toFixed(11)})`),
      )

      // 5. 프롬프트에 주입할 텍스트 생성
      return topChunks.map(c => c.content).join('\n\n')
    } catch (error) {
      console.error('[메시지]: 텍스트 서칭 실패', error)
      return ''
    } finally {
      setLoading(false)
    }
  }

  return { retrieveContext, loading }
}
