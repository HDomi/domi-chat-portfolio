declare global {
  interface IHyperMenuItem {
    icon: string
    input: string
  }
  interface IResumeChunk {
    id: string; // Firestore Doc ID
    category: string;
    content: string;
    embedding: number[]; // 벡터 데이터
    score?: number; // 유사도 점수 (계산 후 주입)
  }
  interface IChatMessage {
    role: 'user' | 'model';
    text: string;
  }

  interface IChatListProps {
    messages: IChatMessage[]
    isSearching: boolean
    isGenerating: boolean
    onHyperMenuClick: (input: string) => void
    currentModel: ModelType
  }

  type ModelType = 'Gemini' | 'Local'

  interface IChatContext {
    messages: IChatMessage[]
    isGenerating: boolean
    isSearching: boolean
    sendMessage: (input: string) => Promise<void>
    resetChat: () => void
    isLimited: boolean // Gemini Limit reached
    remaining: number
    remaining: number
    currentModel: ModelType
    stopGeneration: () => void
  }
  interface IChatInputAreaProps {
    onSend: (message: string) => void
    isLoading: boolean
    hasMessages: boolean
    isLimited?: boolean
    remaining?: number
    currentModel?: ModelType
    onStop: () => void
  }
  interface IUseChatModelReturn {
    currentModel: ModelType
    generateResponse: (
      userText: string,
      systemPrompt: string,
      usageCount: number,
      dailyLimit: number,
      onStream: (text: string, done: boolean) => void,
    ) => Promise<void>
    stopGeneration: () => void
  }
}

export {}
