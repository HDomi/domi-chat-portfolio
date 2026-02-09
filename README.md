# 🤖 Chat Botfolio (AI Portfolio)

**Chat Botfolio**는 사용자와 대화하며 포트폴리오 정보를 제공하는 **AI 챗봇 기반의 웹 애플리케이션**입니다.  
Google Gemini의 LLM과 Embedding 모델을 활용한 **RAG (Retrieval-Augmented Generation)** 시스템을 구축하여, 사전에 정의된 이력 데이터(Resume Chunks)를 기반으로 정확하고 맥락에 맞는 답변을 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

### **Frontend**

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, SASS (SCSS)
- **Routing**: React Router v7
- **State Management**: React Context API (`ChatContext`)
- **Animation**: CSS Keyframes (Star Field Effect), Framer Motion (Optional)

### **Backend & AI**

- **Database**: Firebase Firestore (Vector Database 역할)
- **AI Model**: Google Gemini Pro (`gemini-flash-latest`), Gemini Embeddings (`gemini-embedding-001`)
- **SDK**: `@google/generative-ai` (Official SDK), `firebase-admin` (Node.js ingestion)

---

## 🏗️ 아키텍처 및 데이터 흐름 (System Architecture)

이 프로젝트는 **Serverless RAG Architecture**를 따릅니다. 별도의 벡터 DB 서버 없이 Firestore를 활용하여 경량화된 벡터 검색을 구현했습니다.

### **1. 데이터 수집 및 임베딩 (Data Ingestion)**

> **관련 파일**: `upload-resume.mjs`, `src/constant/index.ts`

포트폴리오 데이터(경력, 기술, 자기소개 등)를 벡터화하여 DB에 저장하는 과정입니다.

1. `DATA_CHUNKS` 상수에 텍스트 데이터 정의.
2. `upload-resume.mjs` 스크립트 실행.
3. **Gemini Embedding Model**이 텍스트를 고차원 벡터(Floating Point Array)로 변환.
4. 원본 텍스트와 벡터 데이터를 **Firestore**(`resume_chunks` 컬렉션)에 저장.

### **2. RAG 검색 및 답변 생성 (Retrieval & Generation)**

> **관련 파일**: `src/hooks/useRetriever.ts`, `src/context/ChatContext.tsx`

사용자가 질문을 했을 때의 처리 과정입니다.

1. **User Query Embedding**: 사용자의 질문을 실시간으로 벡터화.
2. **Vector Search (Cosine Similarity)**:
   - Firestore에서 전체 청크를 로드 (데이터 규모가 적을 때 효율적인 클라이언트 사이드 필터링 방식 채택).
   - 사용자 질문 벡터와 문서 벡터 간의 **코사인 유사도** 계산.
   - 유사도가 가장 높은 상위 10개(`Top-K`) 문서를 추출.
3. **Context Injection**: 추출된 문서를 시스템 프롬프트에 주입.
4. **Answer Generation**: 완성된 프롬프트(`System Prompt + Context + User Question`)를 **Gemini LLM**에 전송하여 답변 생성.

---

## 📂 폴더 구조 (Directory Structure)

```bash
src/
├── components/
│   ├── Layout/       # MainHeader, RootLayout 등 레이아웃 컴포넌트
│   └── UI/           # ChatList, ChatInputArea, Modal 등 재사용 UI
├── constant/         # 포트폴리오 데이터 (DATA_CHUNKS) 및 프롬프트 템플릿
├── context/          # 전역 상태 관리 (ChatContext - 메시지 및 API 호출 상태)
├── firebase/         # Firebase 클라이언트 설정 (config.ts)
├── hooks/            # 커스텀 훅
│   ├── useChat.ts      # ChatContext 소비 훅
│   └── useRetriever.ts # RAG 검색 및 유사도 계산 로직
├── pages/            # 페이지 단위 컴포넌트 (Home)
├── styles/           # 전역 스타일 (SCSS, Tailwind)
├── utils/            # 유틸리티 함수 (cosineSimilarity 등)
└── types/            # TypeScript 타입 정의 (global.d.ts)
```

---

## 🔥 Firebase 구조 및 데이터 처리

### **Firestore Schema: `resume_chunks`**

모든 포트폴리오 데이터는 아래와 같은 구조로 저장됩니다.

| Field       | Type          | Description                                          |
| ----------- | ------------- | ---------------------------------------------------- |
| `id`        | String        | 문서 고유 ID (Auto Generated)                        |
| `category`  | String        | 데이터 카테고리 (예: `identity`, `skills`, `career`) |
| `content`   | String        | 실제 텍스트 내용                                     |
| `embedding` | Array<Number> | Gemini가 생성한 768차원 벡터 데이터                  |
| `updatedAt` | Timestamp     | 데이터 생성/수정 시간                                |

### **데이터 가공 로직**

- **벡터 연산**: `src/hooks/useRetriever.ts` 내부에서 브라우저(클라이언트)가 직접 벡터 연산을 수행합니다.
- **최적화**: 수천 건 이하의 데이터에서는 별도의 Vector DB(Pinecone 등) 없이, Firestore 데이터 전체 로드 후 로컬 연산하는 방식이 **속도와 비용 면에서 더 효율적**입니다.

---

## 🎨 UI/UX 디자인 주요 특징

1. **Space Odyssey Theme**:
   - `src/styles/background/stars.scss`를 통해 우주 공간에 떠 있는 듯한 별들의 움직임을 CSS Animation으로 구현했습니다.
2. **Interactive Chat**:
   - `ChatList`: 메시지 목록을 렌더링하며, Markdown을 지원하여 텍스트 포맷팅을 제공합니다.
   - `MainHeader`: 메뉴 토글 및 "대화 초기화" 기능을 포함하며, 모달(`ConfirmModal`)을 통해 사용자 경험을 보호합니다.
3. **Responsive Design**:
   - Tailwind CSS를 활용하여 모바일(`md:`)과 데스크탑 환경 모두에 최적화된 레이아웃을 제공합니다.

---

## 🚀 설치 및 실행 (Setup)

### 1. 환경 변수 설정 (.env)

프로젝트 루트에 `.env` 파일을 생성하고 아래 키를 입력하세요.

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. 패키지 설치

```bash
pnpm install
```

### 3. 데이터 업로딩 (초기 설정 시 1회)

로컬 데이터(`src/constant/index.ts`)를 벡터화하여 Firebase에 업로드합니다.

```bash
node upload-resume.mjs
```

_(주의: `serviceAccount.json` 파일이 루트에 있어야 하며, Firebase Admin SDK 권한이 필요합니다.)_

### 4. 개발 서버 실행

```bash
pnpm run dev
```

---

## 🤔 개인 회고: 왜 벡터 검색(Vector Search)인가?

이 프로젝트를 진행하면서 가장 깊게 고민했던 부분은 **"어떻게 하면 AI가 내 정보를 정확하게 이해하고 전달할까?"** 였습니다. 단순한 키워드 매칭으로는 사용자의 추상적인 질문(예: "너는 어떤 개발자야?")에 대답하기 어렵기 때문입니다.

### 1. 벡터(Vector)와 임베딩(Embedding)의 원리

컴퓨터는 텍스트의 '의미'를 이해하지 못합니다. 그래서 우리는 텍스트를 **숫자 배열(Vector)**로 변환하여 컴퓨터가 계산할 수 있게 만듭니다. 이를 **임베딩(Embedding)**이라고 합니다.

- **예시**:
  - `사과` -> `[0.1, 0.5]`
  - `바나나` -> `[0.1, 0.6]` (사과와 좌표가 가까움 = 과일)
  - `자동차` -> `[0.9, 0.1]` (사과와 좌표가 멂 = 관련 없음)

이 프로젝트에서는 Google Gemini Embedding 모델을 사용하여, 저의 이력서 문장들을 **768차원의 고차원 공간**에 좌표로 배치했습니다.

### 2. 코사인 유사도 (Cosine Similarity)

사용자의 질문과 가장 관련 있는 답변을 찾기 위해 **코사인 유사도** 공식을 사용했습니다. 이는 두 벡터 사이의 **각도(Angle)**를 측정하는 방식입니다.

- **유사도 1 (0°)**: 완전히 동일한 의미
- **유사도 0 (90°)**: 관계 없음
- **유사도 -1 (180°)**: 반대되는 의미

유클리드 거리(거리 측정) 대신 코사인 유사도(각도 측정)를 사용한 이유는, 문장의 길이(벡터의 크기)가 다르더라도 **방향(의미의 맥락)**이 비슷하면 유사한 내용으로 판단하기 위함입니다.

### 3. 결론: RAG 방식의 선택 이유

LLM(Gemini)에게만 의존하면, 모델이 학습하지 않은 제 최신 이력을 알 수 없어 **거짓 정보를 생성(Hallucination)**할 위험이 있습니다.
반면, **Vector Search 기반의 RAG** 방식을 도입함으로써:

- **정확성**: 제 실제 이력 데이터(Ground Truth)를 기반으로만 답변합니다.
- **유연성**: 모델을 재학습할 필요 없이, 단순히 데이터(`resume_chunks`)만 수정하면 답변 내용이 실시간으로 업데이트됩니다.

---

**Author**: Hwang Jae-young (Domi)
