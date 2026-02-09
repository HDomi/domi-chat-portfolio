import { useState, useEffect } from 'react'

const MAX_DAILY_REQUESTS = 20 // 하루 최대 질문 횟수

export const useRateLimiter = () => {
  const [isLimited, setIsLimited] = useState(false)
  const [remaining, setRemaining] = useState(MAX_DAILY_REQUESTS)

  const checkLimit = () => {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const storageKey = `chat_limit_${today}`

    const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10)
    const remainingCount = Math.max(0, MAX_DAILY_REQUESTS - currentCount)

    setRemaining(remainingCount)
    setIsLimited(currentCount >= MAX_DAILY_REQUESTS)
  }

  useEffect(() => {
    checkLimit()
  }, [])

  const incrementCount = () => {
    const today = new Date().toISOString().split('T')[0]
    const storageKey = `chat_limit_${today}`
    const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10)

    if (currentCount < MAX_DAILY_REQUESTS) {
      const newCount = currentCount + 1
      localStorage.setItem(storageKey, newCount.toString())
      checkLimit() // 상태 업데이트
      return true // Count successfully incremented
    }
    return false // Limit reached, count not incremented
  }

  return { isLimited, remaining, incrementCount }
}
