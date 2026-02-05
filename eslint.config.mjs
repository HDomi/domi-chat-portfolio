import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import prettierPlugin from 'eslint-plugin-prettier'
import customPrettierConfig from './.prettierrc.mjs'

const compat = new FlatCompat()

export default [
  // 기본 JS 권장 설정
  js.configs.recommended,

  // 설정에서 제외할 파일들
  {
    ignores: [
      '.prettierrc.mjs',
      'tsconfig.json',
      'tsconfig.config.json',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/android/**',
      '**/ios/**',
      '**/.capacitor/**',
      '**/public/assets/**',
      '**/export-templates/**',
    ],
  },

  // TypeScript + Vue 기본 설정 (기존 compat.config 확장)
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/vue3-recommended',
      // Prettier는 마지막에 적용
      'prettier',
    ],
  }),

  // TypeScript 파일 설정
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
  },

  // Vue 파일 설정 (.vue 전용)
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    processor: vuePlugin.processors['.vue'],
  },

  // 공통 규칙 (JS/TS/Vue)
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 기본 포맷팅 규칙
      indent: 'off', // Prettier에 위임
      quotes: ['error', 'single'], // 작은따옴표 사용
      'comma-dangle': ['error', 'always-multiline'], // 여러 줄일 때 항상 트레일링 콤마
      'no-trailing-spaces': 'warn', // 줄 끝 공백 금지
      'no-multiple-empty-lines': ['warn', { max: 2, maxEOF: 1 }], // 연속된 빈 줄 제한

      // 코드 품질 관련 규칙
      'no-unused-vars': 'off', // 사용하지 않는 변수 경고하지 않음 (하단에서 별도 정의)
      'no-console': ['warn', { allow: ['info', 'error', 'warn', 'time', 'timeEnd'] }], // console.log() 사용 시 경고
      'no-debugger': 'warn', // debugger 구문 사용 시 경고
      'no-duplicate-imports': 'error', // 중복 import 금지
      'no-var': 'error', // var 키워드 사용 금지 (let/const 사용 권장)
      'prefer-const': 'error', // 재할당이 없는 변수는 const 사용 강제
      'no-fallthrough': 'off', // switch 문에서 fallthrough 허용

      // TypeScript 관련 규칙
      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          ignoreRestArgs: true, // rest parameters에서 any 허용
        },
      ], // any 타입 사용 시 경고
      // TypeScript의 사용하지 않는 변수 경고 (_ 무시)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_+',
          varsIgnorePattern: '^_+',
          caughtErrorsIgnorePattern: '^_+',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'warn', // @ts-expect-error 같은 TS 주석 사용 시 경고
      '@typescript-eslint/explicit-function-return-type': 'warn', // 모든 함수에 반환 타입 선언 필요
      '@typescript-eslint/typedef': [
        'warn',
        {
          arrowParameter: false, // 화살표 함수 매개변수는 추론에 의존
          parameter: false, // 일반 매개변수도 추론에 의존
          propertyDeclaration: true, // 속성 선언만 타입 명시 강제
        },
      ],
      // TypeScript의 타입 정보가 필요한 규칙은 비활성화
      '@typescript-eslint/consistent-type-imports': 'off',

      // Vue 관련 규칙
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off', // attribute 하이픈 케이스 강제 비활성화
      'vue/no-unused-components': 'warn', // 사용하지 않는 컴포넌트 경고
      'vue/no-unused-vars': 'warn', // 템플릿에서 사용하지 않는 변수 경고
      'vue/require-v-for-key': 'error', // v-for 사용 시 key 속성 필수
      'vue/valid-template-root': 'error', // 유효한 템플릿 루트 요소 검사
      'vue/valid-v-bind': 'error', // v-bind 문법 유효성 검사
      'vue/require-prop-types': 'error', // props에 타입 정의 필요
      'vue/require-default-prop': 'error', // props에 기본값 필요

      // Prettier 관련 규칙
      'prettier/prettier': ['error', customPrettierConfig],
    },
  },
]
