# Tailwind CSS 치트시트

## 📏 레이아웃 & 포매팅 (Layout & Formatting)

| 유틸리티                                            | CSS 속성                 | 설명                    |
| :-------------------------------------------------- | :----------------------- | :---------------------- |
| `flex`                                              | `display: flex;`         | Flexbox 컨테이너        |
| `grid`                                              | `display: grid;`         | Grid 컨테이너           |
| `hidden`                                            | `display: none;`         | 요소 숨김               |
| `block`                                             | `display: block;`        | 블록 요소               |
| `inline-block`                                      | `display: inline-block;` | 인라인-블록 요소        |
| `static`, `fixed`, `absolute`, `relative`, `sticky` | `position: ...;`         | 위치 지정 (Positioning) |
| `z-0` ... `z-50`                                    | `z-index: ...;`          | 쌓임 순서 (Stack order) |

## 📦 여백 (Spacing - Padding & Margin)

_크기 단위: 1 = 0.25rem (4px)_
| 클래스 | 속성 | 예시 |
| :--- | :--- | :--- |
| `p-{n}` | 패딩 (안쪽 여백) | `p-4` (모든 방향 16px) |
| `px-{n}` | 가로 패딩 (좌/우) | `px-4` |
| `py-{n}` | 세로 패딩 (상/하) | `py-2` |
| `m-{n}` | 마진 (바깥 여백) | `m-4` |
| `mx-{n}`, `my-{n}` | 가로 마진, 세로 마진 | `mx-auto` (가로 중앙 정렬) |
| `-m-{n}` | 음수 마진 | `-mt-2` |

## 📐 플렉스박스 & 그리드 (Flexbox & Grid)

| 클래스                                      | 설명                             |
| :------------------------------------------ | :------------------------------- |
| `flex-row`, `flex-col`                      | 배치 방향 (가로/세로)            |
| `justify-start`, `center`, `end`, `between` | 주축 정렬 (Justify Content)      |
| `items-start`, `center`, `end`              | 교차축 정렬 (Align Items)        |
| `gap-{n}`                                   | 아이템 간 간격                   |
| `grid-cols-{n}`                             | 열 개수 지정 (예: `grid-cols-3`) |
| `col-span-{n}`                              | n개의 열 차지하기 (병합)         |

## 🎨 색상 & 배경 (Colors & Backgrounds)

_`{color}` 부분에 다음 색상 대입: slate, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose_
| 클래스 | 설명 |
| :--- | :--- |
| `text-{color}-{50-950}` | 텍스트 색상 (예: `text-red-500`) |
| `bg-{color}-{50-950}` | 배경 색상 |
| `border-{color}-{50-950}` | 테두리 색상 |
| `bg-opacity-{n}` | 배경 투명도 |

## 🅰️ 타이포그래피 (Typography)

| 클래스                                   | CSS 속성                   | 설명                  |
| :--------------------------------------- | :------------------------- | :-------------------- |
| `text-xs` ... `text-9xl`                 | `font-size`, `line-height` | 글자 크기             |
| `font-thin` ... `font-black`             | `font-weight`              | 글자 굵기             |
| `leading-none` ... `leading-loose`       | `line-height`              | 줄 간격 (Line height) |
| `tracking-tighter` ... `tracking-widest` | `letter-spacing`           | 자간 (Letter spacing) |
| `text-center`, `text-left`, `text-right` | `text-align`               | 텍스트 정렬           |
| `uppercase`, `lowercase`, `capitalize`   | `text-transform`           | 대소문자 변환         |
| `truncate`                               | ...                        | 말줄임표 (...) 처리   |

## 🖼️ 테두리 & 효과 (Borders & Effects)

| 클래스                             | 설명                          |
| :--------------------------------- | :---------------------------- |
| `rounded-none` ... `rounded-full`  | 테두리 둥글기 (Border Radius) |
| `border`, `border-{n}`             | 테두리 두께                   |
| `shadow-sm`, `shadow`, `shadow-lg` | 그림자 효과                   |
| `opacity-0` ... `opacity-100`      | 불투명도                      |

## ⚡ 상호작용 & 상태 (Interactivity & State)

| 접두어      | 설명               | 예시                  |
| :---------- | :----------------- | :-------------------- |
| `hover:`    | 마우스 올렸을 때   | `hover:bg-blue-700`   |
| `focus:`    | 포커스 되었을 때   | `focus:ring-2`        |
| `active:`   | 클릭하고 있을 때   | `active:bg-blue-800`  |
| `disabled:` | 비활성화 상태일 때 | `disabled:opacity-50` |
| `dark:`     | 다크 모드일 때     | `dark:bg-gray-900`    |

## 📱 반응형 분기점 (Responsive Breakpoints)

| 접두어 | 최소 너비 (Min-Width) | 사용 예시                              |
| :----- | :-------------------- | :------------------------------------- |
| `sm:`  | 640px                 | `sm:text-center` (640px 이상에서 적용) |
| `md:`  | 768px                 | `md:grid-cols-2`                       |
| `lg:`  | 1024px                | `lg:p-8`                               |
| `xl:`  | 1280px                | `xl:flex`                              |
| `2xl:` | 1536px                | `2xl:visible`                          |

---

_전체 목록은 [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)에서 확인할 수 있습니다._
