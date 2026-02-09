import { useState, type KeyboardEvent } from 'react'

interface ChatInputAreaProps {
  onSend: (message: string) => void
  isLoading: boolean
}

const ChatInputArea = ({ onSend, isLoading }: ChatInputAreaProps) => {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSend(input)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full relative shrink-0">
      <div className="flex flex-col w-full p-3 md:p-4 backdrop-blur-xl bg-[#1e1f20]/90 border border-gray-700/50 rounded-[20px] md:rounded-[24px] shadow-2xl transition-all duration-300 focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600/50">
        <textarea
          className="w-full bg-transparent resize-none outline-none text-white placeholder-gray-500 min-h-[44px] md:min-h-[50px] max-h-[120px] scrollbar-thin scrollbar-thumb-gray-600 text-sm md:text-base"
          placeholder="무엇이든 물어보세요..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
          <span className="text-[10px] md:text-xs text-gray-500 font-medium ml-1">
            Powered by Gemini 1.5
          </span>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`flex items-center justify-center px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
              !input.trim() || isLoading
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95'
            }`}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInputArea
