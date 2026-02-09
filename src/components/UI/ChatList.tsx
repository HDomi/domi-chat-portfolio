import { useRef, useEffect } from 'react'
import { HYPER_MENU_ITEMS } from '@/constant'
import MarkdownRenderer from '../MarkdownRenderer'

const ChatList = ({ messages, isSearching, isGenerating, onHyperMenuClick }: IChatListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isSearching, isGenerating])

  return (
    <div className="flex-1 overflow-y-auto mb-4 md:mb-6 space-y-4 md:space-y-6 p-3 md:p-4 scrollbar-hide">
      {messages.length === 0 ? (
        <div className="w-full min-h-full flex flex-col items-center justify-start md:justify-center space-y-6 md:space-y-8 animate-fade-in-up px-2 py-10 md:py-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white/90 leading-tight">
            안녕하세요!
            <br />
            <span className="text-blue-400">황재영</span>의 포트폴리오 챗봇입니다.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full max-w-lg">
            {HYPER_MENU_ITEMS.map(item => (
              <button
                key={item.input}
                onClick={() => onHyperMenuClick(item.input)}
                className="flex items-center gap-3 p-3 text-left bg-[#2a2b2e]/50 hover:bg-[#3a3b3e] border border-gray-700 hover:border-blue-500/50 rounded-xl transition-all duration-200 group active:scale-[0.98]"
              >
                <span className="text-lg md:text-xl group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="text-xs md:text-sm text-gray-200 group-hover:text-white font-medium">
                  {item.input}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 md:px-5 md:py-3.5 text-sm md:text-base leading-relaxed break-words shadow-md ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-md'
                    : 'bg-[#2a2b2e] text-gray-100 border border-gray-700 rounded-2xl rounded-tl-md'
                }`}
              >
                {msg.role === 'model' ? <MarkdownRenderer content={msg.text} /> : msg.text}
              </div>
            </div>
          ))}

          {(isSearching || isGenerating) && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-[#2a2b2e] px-4 py-2 rounded-2xl text-xs text-gray-400 border border-gray-700 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                {isSearching ? '이력서 데이터를 검색하는 중...' : '답변을 생성하는 중...'}
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatList
