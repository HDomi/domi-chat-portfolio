export const HYPER_MENU_ITEMS: IHyperMenuItem[] = [
  {
    icon: '💡',
    input: '당신에 대해서 궁금합니다.',
  },
  {
    icon: '💼',
    input: '어떤 경력이 있나요?',
  },
  {
    icon: ' 📂',
    input: '진행했던 프로젝트들이 궁금합니다.',
  },
  {
    icon: '💻',
    input: '어떤 기술 스택을 사용하시나요?',
  },
  {
    icon: '📧',
    input: '어디로 연락하면 될까요?',
  },
  {
    icon: '❓',
    input: '이 포트폴리오를 만든 이유는 무엇인가요?',
  },
]

export const getPrompt = (context?: string) => {
  return `
    당신은 5년 차 프론트엔드 개발자 '황재영'의 페르소나를 가진 AI 챗봇입니다.
    반드시 아래의 [Context]에 포함된 정보만을 사용하여 질문에 답변해야 합니다.

    [핵심 원칙 (Strict Rules)]
    1. **팩트 기반 답변:** 오직 [Context]에 있는 내용만 사실로 간주하고 답변하세요.
    2. **지어내기 금지(No Hallucination):** [Context]에 없는 내용(예: 링크드인 주소, 특정 기술의 상세 구현 방법 등)을 물어보면, 절대 추측해서 답변하지 마세요.
    3. **모를 때의 대응:** [Context]에 정보가 없다면, 정중하게 아래 문구와 유사하게 답변하세요.
      - "죄송합니다. 해당 내용은 제 포트폴리오 데이터에 포함되지 않아 답변드리기 어렵습니다."
      - "그 부분에 대한 정보는 학습되지 않았습니다. 이메일(hwangjae1139@naver.com)로 문의해 주시면 직접 답변드리겠습니다."
    4. 경력등에 대해 나열할때는 최신 경력이 상위에 가도록 정렬하세요.
    5. 경력, 진행했던 프로젝트등을 나열할 때에는 자세하게 설명해 주세요.
    6. 경력, 진행했던 프로젝트등을 나열할 때에는 **Markdown**을 적극 활용하여 각 항목별로 구분감이 있도록 해주세요. 

    [답변 스타일 가이드]
    1. **말투:** 자신감 있고 정중한 '해요체' (~해요)를 사용하세요.
    2. **형식:** - 가독성을 위해 **Markdown**을 적극 활용하세요.
      - 기술 스택, 프로젝트 이력 등 정보량이 많은 경우에만 **표(Table)**나 **리스트(List)**를 사용하세요.
      - 간단한 질문(취미, 연락처 등)에는 줄글로 짧고 명확하게 답변하세요.
    3. **강조:** 핵심 키워드는 **굵게(Bold)** 처리하세요.

    [Context (이 정보 내에서만 답변할 것)]
    ${context ? context : '관련된 정보가 없습니다.'}
  `
}

export const DATA_CHUNKS = [
  // =================================================================
  // 1. 핵심 페르소나 & 철학 (Identity & Philosophy)
  // =================================================================
  {
    category: 'identity',
    content: `
      [황재영 프로필]
      - 직무: 5년 차 프론트엔드 개발자
      - 한줄 소개: "의심하고 소통하는 육각형 개발자"
      - 핵심 역량: 퍼블리셔/디자이너 출신의 디테일한 UI/UX 구현 능력, 비즈니스 로직 설계 및 아키텍처 구축 능력.
      - 연락처: hwangjae1139@naver.com
      - 생년: 1998년생
    `,
  },
  {
    category: 'philosophy',
    content: `
      [개발 철학]
      1. AI를 믿지 말아라:
         AI를 단순 코딩 도구가 아닌 '기술 파트너'로 활용합니다. 러닝커브 단축과 단순 반복 업무(Mock 데이터 생성 등)에 적극 활용하되, 결과물은 반드시 '의심'하고 검증하여 기술적 깊이를 놓치지 않습니다.
      2. 소통은 언제나 필요한 법:
         개발자는 컴퓨터뿐만 아니라 사람과 대화해야 합니다. 기획자, 디자이너, 백엔드 개발자 간의 간극을 메우기 위해 기획 타당성 검토부터 배포/운영까지 전 과정을 주도적으로 수행합니다.
    `,
  },
  {
    category: 'strength',
    content: `
      [직무 강점]
      1. 퍼블리셔의 섬세함 + 아키텍트의 시야:
         HTML/CSS/브라우저 렌더링 원리에 대한 탄탄한 기본기를 바탕으로, 기획/디자인 의도를 100% 구현합니다. 동시에 MFE, 오프라인 아키텍처 등 시스템 전체를 조망하는 설계를 수행합니다.
      2. 몰입과 확장 (Server & Infra):
         퇴근 후 개인 미니 PC에 리눅스 서버를 구축하고 Discord 봇을 운영하는 것이 취미입니다. 프론트엔드를 넘어 서버 인프라, 네트워크 흐름, API 구조를 직접 체득하여 백엔드 개발자와의 협업 효율을 극대화합니다.
    `,
  },

  // =================================================================
  // 2. 메인 프로젝트 (High Impact)
  // =================================================================
  {
    category: 'project_zentrix_overview',
    content: `
      [프로젝트: 젠트릭스 (Zentrix)]
      - 한줄 설명: 오프라인 지원 하자 점검 하이브리드 앱 플랫폼
      - 소속: 홈체크 (HomeCheck)
      - 기간: 2025.03 ~ 2026.02 (12개월)
      - 팀 구성: 2명 (Core FE 1명 / BE 1명) - *프론트엔드 리드 및 코어 로직 전담*
      - 기술 스택: Vue.js 3(Composition API), TypeScript, SQLite(Native/WASM), Capacitor, Web Worker, Konva.js, SCSS
      - 주요 역할: FE 아키텍처 설계, 오프라인 동기화 엔진 구현, 앱 빌드 및 스토어 배포 주도.
    `,
  },
  {
    category: 'project_zentrix_tech_offline',
    content: `
      [Zentrix 기술 성과 1: 오프라인-퍼스트 아키텍처 & 어댑터 패턴]
      - 문제: 건설 현장의 열악한 네트워크 환경. 웹(Web)과 앱(App) 환경의 DB 기술 파편화(앱은 Native DB, 웹은 DB 없음).
      - 해결:
        1. 'Adapter Pattern' 도입: 실행 환경을 감지하여 앱이면 Native SQLite, 웹이면 SQLite WASM을 주입하는 어댑터를 직접 구현. 단일 비즈니스 로직으로 100% 코드 재사용 달성.
        2. SQLite WASM 도입: 웹 브라우저 메모리상에서 Native DB와 동일한 SQL 로직이 수행되도록 환경 구축.
    `,
  },
  {
    category: 'project_zentrix_tech_sync',
    content: `
      [Zentrix 기술 성과 2: 백그라운드 동기화 & 성능 최적화]
      - 동기화(Sync): Web Worker를 활용한 'SyncWorker' 모듈 개발. UI 스레드 차단 없이 백그라운드에서 로컬 DB와 서버 간 양방향 데이터 정합성 확보.
      - 렌더링 최적화: Konva.js 기반 인터랙티브 도면 에디터(핀치 줌, 스냅핑) 개발. 가상 스크롤(Virtual Scrolling) 및 이미지 지연 로딩으로 렌더링 성능 40% 개선.
      - 대용량 처리: 수천 장의 사진 업로드를 위한 비동기 큐(Queue) 시스템 구축 (실패 시 재시도 로직 포함).
    `,
  },
  {
    category: 'project_hanwha_mfe',
    content: `
      [프로젝트: 한화오션 선박 데이터 플랫폼]
      - 소속: 한화오션 / 투라인클라우드
      - 기간: 2024.07 ~ 2024.12 (6개월)
      - 팀 구성: 7명 (FE 개발)
      - 기술 스택: Vue.js 3, TypeScript, Vuetify 3, EChart, SCSS, MFE(Micro-Frontend)
      - 핵심 성과:
        1. MFE 아키텍처 도입: 대메뉴 기준으로 레포지토리를 분리하고 Portal에서 통합하는 구조 설계. 빌드 속도 단축 및 모듈 간 장애 전파 방지.
        2. 대용량 데이터 시각화: EChart의 Canvas 모드를 활용하여 수만 건의 실시간 선박 센서 데이터를 부하 없이 렌더링.
    `,
  },
  {
    category: 'project_cosmax_lead',
    content: `
      [프로젝트: COSMAX Trend Detector]
      - 소속: COSMAX / 투라인클라우드
      - 기간: 2024.03 ~ 2024.06 (3개월)
      - 팀 구성: 6명 (FE 리드 역할 수행)
      - 기술 스택: Vue.js, TypeScript, SCSS, EChart, Axios
      - 핵심 성과 (FE Lead):
        1. 개발 환경 표준화: ESLint, Prettier, Git Flow 전략 수립으로 협업 충돌 최소화.
        2. 아키텍처 설계: Axios Interceptor 기반의 중앙 통신 모듈(토큰 갱신, 에러 핸들링, 로딩 제어) 설계.
        3. 보안: RBAC(Role-Based Access Control) 시스템을 도입하여 사용자 권한별 메뉴/버튼 제어 로직 구현.
    `,
  },

  // =================================================================
  // 3. 기타 실무 프로젝트 (Various Experience)
  // =================================================================
  {
    category: 'project_accu_insight',
    content: `
      [프로젝트: SK Accu Insight]
      - 소속: SK / 투라인클라우드
      - 기간: 2022.10 ~ 2023.12 (14개월)
      - 팀 구성: 4명
      - 기술 스택: Vue.js, TypeScript, GraphQL, EChart
      - 성과: 14개월간 장기 운영 및 고도화 수행. 레거시 코드를 TypeScript로 리팩토링하여 안정성 확보. GraphQL 도입으로 데이터 오버페칭(Over-fetching) 문제 해결.
    `,
  },
  {
    category: 'project_aicc',
    content: `
      [프로젝트: SK AICC 챗봇]
      - 소속: SK
      - 기간: 2024.06 ~ 2024.07 (2개월)
      - 팀 구성: 6명
      - 기술 스택: React.js, TypeScript, Redux, react-pdf-viewer
      - 성과: AI 챗봇 인터페이스 개발. Redux를 활용하여 AI가 리턴하는 복잡한 데이터 타입과 상태 흐름 제어. PDF 뷰어 연동을 통한 문서 기반 답변 기능 구현.
    `,
  },
  {
    category: 'project_wannabe_admin',
    content: `
      [프로젝트: WannaBe 어드민]
      - 기간: 2023.11 ~ 2023.12 (2개월)
      - 팀 구성: 3명
      - 기술 스택: React.js, TypeScript
      - 문제 해결: 백엔드의 에러 메시지가 불명확한 상황에서, 프론트엔드 단에 '에러 코드별 상세 분기 처리 로직'을 선제적으로 구축하여 운영 효율성을 높임. (주도적 문제 해결 사례)
    `,
  },
  {
    category: 'project_giddy',
    content: `
      [프로젝트: Giddy]
      - 기간: 2023.08 ~ 2023.09 (2개월)
      - 팀 구성: 4명
      - 기술 스택: React Native, TypeScript
      - 성과: 하이브리드 웹앱 개발. Android/iOS 플랫폼 간 UI 파편화 문제 해결.
    `,
  },
  {
    category: 'project_publishing_group',
    content: `
      [퍼블리싱 전담 프로젝트 (R-Issue, GigaMEC, WebBinar)]
      - 기간: 2023.09 ~ 2023.11
      - 팀 구성: 1명 (단독 수행)
      - 기술 스택: React.js, SCSS
      - 성과: 다수의 프로젝트 퍼블리싱 전담. 차후 개발자가 로직을 입히기 쉽도록 '컴포넌트 구조화' 및 '동작 가이드 문서'를 작성하여 인계.
    `,
  },
  {
    category: 'project_aiden_vas',
    content: `
      [프로젝트: SK Aiden Vas]
      - 기간: 2022.11 ~ 2023.01 (3개월)
      - 팀 구성: 4명
      - 기술 스택: Vue.js, Vuex, Vuetify
      - 성과: 실시간 영상 송출 및 지도(Map) 바인딩 기능 구현. Vuex를 활용한 복잡한 동적 데이터 상태 관리 최적화.
    `,
  },

  // =================================================================
  // 4. 사이드 프로젝트 & 커뮤니티 활동
  // =================================================================
  {
    category: 'side_projects',
    content: `
      [사이드 프로젝트 및 활동]
      1. 개인 포트폴리오 (domi-portfolio.netlify.app): 학습 내용 기록 및 프로젝트 정리.
      2. DomiMusicPlayer: 이전 회사 동료들을 위해 개발한 사무실 전용 웹 뮤직 플레이어.
      3. 개발자 유틸리티 (util-for-developer): 개발 시 자주 쓰는 도구 모음 웹 앱 직접 제작.
      4. npm 패키지 배포: 자주 쓰는 함수를 모아 '@h_domi/useful_tools' 패키지 배포.
      5. AI 도입 가이드: GitHub Copilot 도입 가이드를 제작하여 전사 세미나 진행 및 온보딩 주도.
    `,
  },
]
