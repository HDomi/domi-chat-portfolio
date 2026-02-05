export default {
  semi: false, // 세미콜론 사용하지 않음
  singleQuote: true, // 작은따옴표 사용
  tabWidth: 2, // 들여쓰기 간격 2칸
  useTabs: false, // 탭 대신 스페이스 사용
  trailingComma: 'all', // ES5에서 허용되는 후행 쉼표 사용
  printWidth: 100, // 한 줄 최대 길이 100자
  newlineAfterImports: true, // import 문 다음에 빈 줄 추가
  endOfLine: 'auto', // OS에 따른 개행문자 자동 설정
  arrowParens: 'avoid', // 화살표 함수 매개변수 하나일 때 괄호 생략
  bracketSpacing: true, // 객체 리터럴의 괄호 주위에 공백 추가
  vueIndentScriptAndStyle: true, // Vue 파일의 script와 style 태그 들여쓰기
  singleAttributePerLine: false, // HTML 속성을 한 줄에 여러 개 허용
  htmlWhitespaceSensitivity: 'css', // HTML 공백 처리를 CSS display 값에 따라 결정
  bracketSameLine: false, // HTML 요소 닫는 괄호 다음 줄에 배치
  quoteProps: 'as-needed', // 필요한 경우에만 객체 속성에 따옴표 사용
  operatorLinebreak: 'before', // 연산자 앞에서 줄바꿈
}
