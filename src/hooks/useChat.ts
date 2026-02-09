import { createContext, useContext } from 'react'

export const ChatContext = createContext<IChatContext | undefined>(undefined)

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
