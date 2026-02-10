import { useState, type KeyboardEvent } from 'react'
import { HYPER_MENU_ITEMS } from '@/constant'

const ChatInputArea = ({
  onSend,
  isLoading,
  hasMessages,
  // isLimited = false, // Removed unused prop
  remaining,
  currentModel = 'Gemini',
  onStop,
}: IChatInputAreaProps) => {
  const [input, setInput] = useState('')
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false)

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

  const placeholderText =
    currentModel === 'Local'
      ? '무엇이든 물어보세요... Local Gemma: 무제한'
      : `무엇이든 물어보세요... ${remaining !== undefined ? `(일일 잔여 한도: ${remaining}회)` : ''}`

  return (
    <div className="w-full relative shrink-0 flex flex-col items-center justify-center">
      {shouldShowSuggestions && (
        <div className="w-full max-w-[700px] mb-3 animate-fade-in-up">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
            {HYPER_MENU_ITEMS.map(item => (
              <button
                key={item.input}
                onClick={() => onSend(item.input)}
                className="flex items-center gap-2 px-4 py-2 bg-[#2a2b2e]/80 backdrop-blur-md border border-gray-700 hover:border-blue-500/50 hover:bg-[#3a3b3e] rounded-full text-xs md:text-sm text-gray-200 transition-all whitespace-nowrap active:scale-95 shadow-lg"
              >
                <span>{item.icon}</span>
                <span>{item.input}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex max-w-[700px] flex-col w-full p-3 md:p-4 backdrop-blur-xl bg-[#1e1f20]/90 border border-gray-700/50 rounded-[20px] md:rounded-[24px] shadow-2xl transition-all duration-300 focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600/50 relative z-20">
        <textarea
          className="w-full bg-transparent resize-none outline-none text-white placeholder-gray-500 min-h-[44px] md:min-h-[50px] max-h-[120px] scrollbar-thin scrollbar-thumb-gray-600 text-sm md:text-base disabled:text-gray-500 disabled:cursor-not-allowed"
          placeholder={placeholderText}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (hasMessages) setShouldShowSuggestions(true)
          }}
          onBlur={() => {
            setTimeout(() => setShouldShowSuggestions(false), 200)
          }}
          disabled={isLoading}
        />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
          <span className="text-[10px] md:text-xs font-medium ml-1 text-gray-500 transition-colors duration-300">
            Powered by {currentModel === 'Gemini' ? '⚡ Gemini 2.0 Flash Lite' : 'Local Gemma 2'}
          </span>
          {isLoading ? (
            <button
              onClick={onStop}
              className="flex items-center justify-center px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 bg-gray-700 hover:bg-red-600/80 text-white shadow-lg active:scale-95 group"
            >
              <span className="w-2 h-2 bg-white rounded-sm group-hover:bg-white/90" />
              <span className="ml-2">중지</span>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`flex items-center justify-center px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
                !input.trim()
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95'
              }`}
            >
              전송
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatInputArea
