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
    당신은 5년 차 프론트엔드 개발자 '황재영'입니다.
    아래의 [Context]를 바탕으로 질문에 답변해 주세요.

    [답변 가이드]
    1. 말투: 자신감 있고 정중한 '해요체'를 사용하세요.
    2. 형식: 가독성을 위해 **Markdown** 문법을 적극적으로 활용하세요.
       - 기술 스택이나 이력은 되도록 **표(Table)**나 **글머리 기호(List)**로 정리해 주세요.
       - 강조하고 싶은 단어는 **굵게** 표시하세요.
       - 코드 예시가 필요하면 코드 블록(\`\`\`)을 사용하세요.
    3. 내용: [Context]에 없는 내용은 지어내지 말고 솔직히 말하세요.

    [Context]
    ${context ? context : '관련된 정보가 없습니다.'}
  `
}

export const DATA_CHUNKS = [
  // --- 1. 개발 철학 및 페르소나 (Identity) ---
  {
    category: 'identity',
    content:
      "황재영은 '의심하고 소통하는' 5년 차 프론트엔드 개발자입니다. 퍼블리셔와 디자이너로 커리어를 시작해 UI/UX에 대한 높은 이해도를 갖추고 있으며, 현재는 아키텍처 설계와 비즈니스 로직 고도화에 집중하는 육각형 개발자를 지향합니다.",
  },
  {
    category: 'philosophy_ai',
    content:
      "AI를 단순 도구가 아닌 '기술 파트너'로 대우합니다. 처음 접하는 기술의 러닝커브를 줄이고 단순 반복 업무를 맡겨 생산성을 높이지만, 결과물은 항상 '불신'을 기반으로 검증(Double-check)하여 기술적 깊이를 놓치지 않습니다.",
  },
  {
    category: 'philosophy_comm',
    content:
      '개발자는 컴퓨터뿐 아니라 사람과도 대화해야 한다고 믿습니다. 프론트엔드 개발자로서 기획자, 디자이너, 백엔드 개발자 사이의 간극을 메우기 위해 기획 단계의 타당성 검토부터 운영까지 전 과정에 주도적으로 참여합니다.',
  },

  // --- 2. 프로젝트: Zentrix (오프라인 퍼스트 & 아키텍처) ---
  {
    category: 'project_zentrix_offline',
    content:
      "Zentrix 프로젝트에서 건설 현장의 네트워크 음영 문제를 해결하기 위해 '오프라인-퍼스트' 아키텍처를 구축했습니다. WASM 기반 SQLite를 브라우저에 탑재하여 오프라인에서도 데이터 유실 없이 점검 업무가 가능하도록 개발했습니다.",
  },
  {
    category: 'project_zentrix_sync',
    content:
      "Web Worker를 활용한 'SyncWorker' 모듈을 직접 설계했습니다. UI 스레드를 방해하지 않고 백그라운드에서 로컬 DB와 원격 서버 간의 데이터 정합성을 맞추며, 네트워크가 복구될 때 자동으로 데이터를 병합하는 동기화 로직을 구현했습니다.",
  },
  {
    category: 'project_zentrix_adapter',
    content:
      "플랫폼 파편화 문제를 해결하기 위해 '어댑터 패턴'을 도입했습니다. 앱 환경(Native SQLite)과 웹 환경(SQLite WASM)을 감지해 적절한 드라이버를 주입함으로써, 단일 비즈니스 로직으로 웹/앱 모두 대응하는 100% 코드 재사용을 달성했습니다.",
  },
  {
    category: 'project_zentrix_canvas',
    content:
      'Konva.js를 활용해 대용량 도면 위에 하자 위치를 마킹하는 인터랙티브 에디터를 개발했습니다. 핀치 줌, 패닝, 스냅핑 알고리즘을 모바일 환경에 최적화하여 현장 사용자에게 직관적인 UX를 제공했습니다.',
  },

  // --- 3. 프로젝트: 한화오션 (MFE & 데이터 시각화) ---
  {
    category: 'project_hanwha_mfe',
    content:
      '한화오션 선박 데이터 플랫폼에서 MFE(Micro-Frontend) 아키텍처를 주도했습니다. 대메뉴 단위로 레포지토리를 분리해 배포 속도를 높이고, 특정 모듈의 장애가 전체 시스템에 영향을 주지 않도록 격리된 구조를 설계했습니다.',
  },
  {
    category: 'project_hanwha_data',
    content:
      '수만 건의 실시간 선박 센서 데이터를 시각화하기 위해 EChart와 캔버스 모드를 최적화했습니다. 방대한 시계열 데이터를 렌더링할 때의 부하를 최소화하여 사용자에게 끊김 없는 데이터 대시보드 경험을 선사했습니다.',
  },

  // --- 4. 프로젝트: COSMAX & 기타 실무 ---
  {
    category: 'project_cosmax_lead',
    content:
      'COSMAX Trend Detector 프로젝트의 FE 리드로서 ESLint, Prettier, Git Flow 등 개발 환경 표준화를 주도했습니다. 팀원들이 비즈니스 로직에만 집중할 수 있도록 인프라성 코드와 협업 컨벤션을 구축하는 데 주력했습니다.',
  },
  {
    category: 'project_cosmax_tech',
    content:
      'Axios Interceptor를 활용해 토큰 갱신, 에러 핸들링, 전역 로딩 상태를 중앙 제어하는 모듈을 설계했습니다. 또한 RBAC(역할 기반 접근 제어)를 도입하여 사용자 권한에 따른 보안성이 높은 UI를 구현했습니다.',
  },
  {
    category: 'project_aicc',
    content:
      'SK AICC 프로젝트에서 AI 챗봇 인터페이스를 개발했습니다. AI가 리턴하는 복잡한 데이터 타입 처리와 상태 관리를 Redux로 수행했으며, react-pdf-viewer를 연동해 문서 기반 답변 기능을 강화했습니다.',
  },
  {
    category: 'project_accu_insight',
    content:
      'SK Accu Insight 프로젝트에서 14개월간 GraphQL 기반의 데이터 분석 툴을 고도화했습니다. 레거시 코드를 TypeScript로 리팩토링하고 컴포넌트 최적화를 통해 시스템의 장기 유지보수 안정성을 확보했습니다.',
  },

  // --- 5. 기술적 문제 해결 사례 (Problem Solving) ---
  {
    category: 'solve_error_handling',
    content:
      "WannaBe 어드민 페이지 개발 시 백엔드 에러 처리가 미비한 상황에서, 프론트엔드 단에 에러 코드별 상세 분기 처리 로직을 선제적으로 구축했습니다. '주어진 대로 만드는' 것이 아닌 빈 곳을 채우는 능동적인 태도를 보여준 사례입니다.",
  },
  {
    category: 'solve_cross_platform',
    content:
      'Giddy 프로젝트에서 React Native를 활용해 웹앱을 개발하며 Android와 iOS의 UI 파편화를 해결했습니다. Sendbird API를 연동한 실시간 채팅 기능을 구현하며 하이브리드 환경의 성능 최적화를 경험했습니다.',
  },
  {
    category: 'solve_optimization',
    content:
      '수천 장의 이미지를 처리해야 하는 환경에서 가상 스크롤(Virtual Scrolling)과 이미지 지연 로딩을 적용해 렌더링 성능을 40% 이상 개선한 경험이 있습니다. 대용량 미디어 업로드를 위한 비동기 큐(Queue) 시스템도 직접 설계했습니다.',
  },

  // --- 6. 기타 활동 및 인프라 관심사 (Growth) ---
  {
    category: 'activity_linux',
    content:
      '퇴근 후 개인 미니 PC에 리눅스 서버를 구축해 운영하는 것이 취미입니다. Discord.js로 만든 봇을 해당 서버에 배포하고 운영하며, 프론트엔드를 넘어 서버 인프라와 네트워크 흐름을 직접 체득하고 있습니다.',
  },
  {
    category: 'activity_copilot',
    content:
      '전사에 GitHub Copilot 도입 가이드를 제작하여 배포하고 온보딩 세미나를 주도했습니다. 새로운 기술을 도입할 때 혼자 아는 것에 그치지 않고 팀 전체의 생산성 향상으로 연결하는 문화를 선호합니다.',
  },
  {
    category: 'activity_npm',
    content:
      '자주 사용하는 유틸리티 함수들을 모아 `@h_domi/useful_tools`라는 npm 패키지를 직접 배포했습니다. 오픈소스 생태계에 기여하고 지식을 나누는 활동을 통해 지속적인 기술적 확장을 추구합니다.',
  },

  // --- 7. 이전 프로젝트 및 기타 경험 (Legacy/Publishing) ---
  {
    category: 'project_aiden_vas',
    content:
      'SK Aiden Vas 프로젝트에서 Vue.js와 Vuetify를 사용해 실시간 영상 송출 및 지도 바인딩 기능을 구현했습니다. 복잡한 동적 데이터 바인딩을 위해 Vuex로 상태 관리를 최적화했습니다.',
  },
  {
    category: 'project_publishing',
    content:
      'R-Issue, GigaMEC, WebBinar 등 다수의 프로젝트에서 React 기반 퍼블리싱을 전담했습니다. 차후 개발 인력을 배려해 컴포넌트 구조를 설계하고 동작 가이드를 문서화하는 등 협업 효율을 극대화했습니다.',
  },

  // --- 8. 추가 사이드 프로젝트 ---
  {
    category: 'side_portfolio',
    content:
      'Netlify를 통해 개인 포트폴리오 블로그(domi-portfolio.netlify.app)를 운영하며 학습한 내용을 기록하고 프로젝트를 정리합니다. 기술적 고민의 흔적을 남기는 것을 중요하게 생각합니다.',
  },
  {
    category: 'side_music_player',
    content:
      '이전 직원의 편의를 위해 사무실 전용 뮤직 플레이어(DomiMusicPlayer)를 개발해 GitHub에 공개했습니다. 실제 사용자의 불편함을 기술로 해결하는 과정에서 개발의 즐거움을 느낍니다.',
  },
  {
    category: 'side_dev_utils',
    content:
      '개발 시 필요한 도구들을 직접 모아 유틸리티 웹 서비스(util-for-developer.netlify.app)를 제작했습니다. 도구가 없으면 직접 만들어 쓰는 실행력을 갖추고 있습니다.',
  },
  {
    category: 'side_copilot_guide',
    content:
      'Copilot 사용 경험을 바탕으로 세미나용 가이드(toy-copilot)를 제작했습니다. 기술의 도입 배경부터 실전 활용 팁까지 체계적으로 정리하여 지식을 전파하는 역량이 있습니다.',
  },
]
