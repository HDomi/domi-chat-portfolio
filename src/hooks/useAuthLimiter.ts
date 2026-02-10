import { useState, useEffect } from 'react'
import { auth, db } from '@/firebase'
import { signInAnonymously } from 'firebase/auth'
import { doc, getDoc, runTransaction } from 'firebase/firestore'

export const DAILY_LIMIT = 15 // 하루 15회 (Gemini), 이후 LocalModel

export const useAuthLimiter = () => {
  const [isLimited, setIsLimited] = useState(false)
  const [count, setCount] = useState(0)
  const [userUid, setUserUid] = useState<string | null>(null)

  // 오늘 날짜 (YYYY-MM-DD)
  const getTodayStr = () => new Date().toISOString().split('T')[0]

  useEffect(() => {
    const checkLimit = async (uid: string) => {
      const today = getTodayStr()
      const docRef = doc(db, 'daily_limits', today, 'users', uid)
      try {
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const currentCount = docSnap.data().count || 0
          setCount(currentCount)
          // NOTE: 여기서는 limit 체크만 하고, 실제 모델 전환 로직은 ChatContext 등에서 처리
          if (currentCount >= DAILY_LIMIT) setIsLimited(true)
        }
      } catch (error) {
        console.error('Check Limit Error:', error)
      }
    }

    // 1. 사이트 접속 시 '익명 로그인' 시도
    const initAuth = async () => {
      try {
        const userCredential = await signInAnonymously(auth)
        const uid = userCredential.user.uid
        setUserUid(uid)
        checkLimit(uid)
      } catch (error) {
        console.error('Auth Error:', error)
      }
    }
    initAuth()
  }, [])

  // 3. 카운트 증가 (질문 전송 시 호출)
  const increaseCount = async (): Promise<boolean> => {
    if (!userUid) return false
    const today = getTodayStr()
    const docRef = doc(db, 'daily_limits', today, 'users', userUid)

    try {
      const newCount = await runTransaction(db, async transaction => {
        const sfDoc = await transaction.get(docRef)

        if (!sfDoc.exists()) {
          transaction.set(docRef, { count: 1 })
          return 1
        }

        const currentCount = sfDoc.data().count
        // 여기서는 카운트만 증가시키고, 제한 여부는 호출부에서 결정하거나
        const nextCount = currentCount + 1
        transaction.update(docRef, { count: nextCount })
        return nextCount
      })

      setCount(newCount)
      return true
    } catch (e) {
      console.error('Transaction failed: ', e)
      return false
    }
  }

  const remaining = Math.max(0, DAILY_LIMIT - count)

  return { isLimited, remaining, incrementCount: increaseCount, count, DAILY_LIMIT }
}
