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
  }

  interface IChatContext {
    messages: IChatMessage[]
    isGenerating: boolean
    isSearching: boolean
    sendMessage: (input: string) => Promise<void>
    resetChat: () => void
    isLimited: boolean
    remaining: number
  }
}

export {}
