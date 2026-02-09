import { useChat } from '@/hooks/useChat'
import ChatList from '../components/UI/ChatList'
import ChatInputArea from '../components/UI/ChatInputArea'

const Home = () => {
  const { messages, isGenerating, isSearching, sendMessage, isLimited, remaining } = useChat()
  const hasMessages = messages.length > 0

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="flex flex-col w-full max-w-[900px] h-full relative z-10">
        <ChatList
          messages={messages}
          isSearching={isSearching}
          isGenerating={isGenerating}
          onHyperMenuClick={sendMessage}
        />

        <ChatInputArea
          onSend={sendMessage}
          isLoading={isGenerating || isSearching}
          hasMessages={hasMessages}
          isLimited={isLimited}
          remaining={remaining}
        />
      </div>
    </div>
  )
}

export default Home
