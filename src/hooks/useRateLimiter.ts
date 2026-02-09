import { useState } from 'react'

const MAX_DAILY_REQUESTS = 20 // 하루 최대 질문 횟수

export const useRateLimiter = () => {
  // 현재 상태를 계산하는 헬퍼 함수
  const getLimitStatus = () => {
    if (typeof window === 'undefined') {
      return { count: 0, storageKey: '' }
    }
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const storageKey = `chat_limit_${today}`
    const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10)

    return { count: currentCount, storageKey }
  }

  const [isLimited, setIsLimited] = useState(() => {
    const { count } = getLimitStatus()
    return count >= MAX_DAILY_REQUESTS
  })

  const [remaining, setRemaining] = useState(() => {
    const { count } = getLimitStatus()
    return Math.max(0, MAX_DAILY_REQUESTS - count)
  })

  const checkLimit = () => {
    const { count } = getLimitStatus()
    const remainingCount = Math.max(0, MAX_DAILY_REQUESTS - count)

    setRemaining(remainingCount)
    setIsLimited(count >= MAX_DAILY_REQUESTS)
  }

  const incrementCount = () => {
    const { count, storageKey } = getLimitStatus()

    if (count < MAX_DAILY_REQUESTS) {
      const newCount = count + 1
      if (storageKey) {
        localStorage.setItem(storageKey, newCount.toString())
      }
      checkLimit() // 상태 업데이트
      return true // Count successfully incremented
    }
    return false // Limit reached, count not incremented
  }

  return { isLimited, remaining, incrementCount }
}
