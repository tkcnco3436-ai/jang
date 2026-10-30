---
name: 렌탈 소개 부업 랜딩 — 적용 디자인 기준
base: NOL (getdesign.kr/nol, last_updated 2026-10-12) — 사용자가 준 design md
mix: 쇼핑몰 랜딩 결 (상품 카드·카테고리 타일·공지 줄·하단 고정 구매바)
lang: ko
---

# 적용 디자인 기준

NOL 디자인 md 를 기준으로 삼고, 여행 도메인 어휘·흐름은 빼고 **시각 처리만** 가져온다
(NOL md `Do's and Don'ts` 마지막 항목: "차용할 것은 흰 바탕·절제된 파랑·둥근 사진 카드라는 시각 처리뿐").
아래 표의 값은 모두 NOL md 의 관측(미발행) 토큰이다. 원문 값을 바꾸지 않았다.

## 1. 색 (index.html `:root`)

| 역할 | 토큰 (NOL) | 값 | 이 페이지의 쓰임 |
|---|---|---|---|
| CTA·선택·포커스 | `primary-main` | #4154FF | 상담 신청 버튼, 헤드라인 강조어, 계산 결과, 포커스 링 |
| 호버·눌림 | `primary-presshover-strong3` | #2432AD | 1차 버튼 hover/active |
| 프라이머리 약면 | `primary-weak` / `primary-weak1` / `primary-weak2` | #F5F6FF / #DFE2FF / #B2BAFF | 배지·말풍선 배지·선택된 연락 방법·비교표 내 열 |
| 가격 긴박 | `accent-main` / `accent-weak` | #E5000F / #FEF5F5 | **"이게 소개가 되는 이유" 배지 1곳만** (혜택 차이) |
| 안심 글자 | `membership-platinum-main` | #008161 | NOL 상세의 '무료취소' 글자색 → "신청만으로 가입되지 않아요", 체크 표시 |
| 본문 | `neutral-main` | #1B1C1F | 본문·제목, 모바일 선택 탭 필 |
| 보조 | `neutral-strong1`(text-neutral-sub) / `neutral-medium` | #6E6F73 / #8B8D92 | 설명·출처·주석 |
| 선 | `neutral-weak3` / `neutral-weak2` / `neutral-weak1` | #DADBDF / #E9EAEF / #F2F3F7 | 카드·패널 1px 테두리, 구분선 |
| 연한 면 | `neutral-weak` | #F7F8FB | 공지 줄, 히어로 바탕, 단계 카드, 계산 결과, 푸터 |
| 섹션 칩 선택 | `static-black` | #000000 | FAQ 분류 칩 선택 |
| 그라디언트 | `brand-border` 90deg | #4AB0F9→#6181EA→#3549FF→#8249D8 | **1px 테두리로만** — 인사이트 배너 1곳 |

- 페이지 바탕은 흰색 고정(`body { background: #fff !important }`).
- 다크 테마 없음 — NOL md Known Gaps: 발행·지원 없음, 지어내지 않는다.
- 발행 대표색 `nol-blue` #3549FF 는 브랜드 자산이 아니므로 쓰지 않는다(서비스 UI 는 `primary-main`).

## 2. 글자

- 서체: Pretendard 하나 (jsDelivr `pretendard@v1.3.9` variable dynamic subset).
- 굵기 700/600/400 세 단계, 자간 0.
- 모바일→PC 한 단계 이상 상향 (NOL `ds-pc:` 패턴):

| 요소 | 모바일 | PC (≥1024) |
|---|---|---|
| 히어로 제목 | 24/32 bold | 40/52 bold (`headline-40-bold` 계열, 2줄이라 행간 1.3) |
| 섹션 제목 | `subtitle-18-bold` 18/22 | `headline-24-bold` 24/29 |
| 섹션 설명 | `body-13-regular-multiline` 13/20 | `subtitle-16-regular-multiline` 16/24 |
| 카드 제목 | `subtitle-18-bold` | 같음 |
| 본문 | `body-14-regular-multiline` 14/21 | 같음 |
| 배지 | `caption-11-bold` / `body-12-bold` | 같음 |
| 공지 배지 | `label-10-bold` | `body-12-bold` |

## 3. 간격·프레임

- 프레임 1320, 좌우 거터 모바일 16 / PC 40 (콘텐츠 1240).
- 섹션 사이 모바일 32+16 / PC 56+24, 섹션 제목–내용 16 / 24.
- 카드 그리드 gap 12 / PC 20.

## 4. 반경 (높이–반경 짝)

| 값 | 쓰임 |
|---|---|
| 6 | 카드 안 텍스트 배지 |
| 12 | 높이 40·44 컨트롤(작은 버튼·스테퍼·입력), 공지 줄(모바일), 숏폼 아닌 소형 면 |
| 16 | 높이 48·52 버튼, 카드, 패널, 비교표, FAQ 묶음, 숏폼 카드 이미지 |
| 20 | 모바일 히어로·모바일 상담 블록 |
| 24 | 카테고리 타일 |
| 28 | PC 히어로·PC 상담 블록 |
| capsule | 알약 배지, 탭 필, FAQ 칩, 이미지 위 카운터 |

## 5. 깊이

- 층은 1px 테두리 + 면 색 차이로만 나눈다. 카드에 그림자 없음.
- 그림자 `shadow-2`(0 0 8px 10%) 는 떠 있는 컨트롤 두 곳만: 모바일 하단 고정바, 맨 위로 버튼.
- 사진 위에는 `opacity-black-5` 1px 인셋, 카운터 알약은 `opacity-black-60`.
- 포커스: `outline 2px solid primary-main`, offset 2 (입력은 -2).
- 호버는 `(hover:hover) and (pointer:fine)` 안에서만. 이징 `cubic-bezier(.33,1,.68,1)`. reduced-motion 이면 전환 끔.

## 6. NOL 컴포넌트 → 이 페이지

| NOL 컴포넌트 | 이 페이지 |
|---|---|
| header (PC 2행 / 모바일 1행) | 로고 + 텍스트 탭 + 상담 신청(작은 1차 버튼) |
| service-tab-mobile (선택 = 검정 필) | 모바일 구역 탭 — 선택은 파랑이 아니라 `neutral-main` |
| notice-bar + badge-notice | "안내" 배지 + 가입비 0원 공지 |
| PC 히어로 1240:403 r28 / 모바일 3:2 r20 | 히어로 (사진 오른쪽, 이미지 카운터 알약 자리에 "AI로 만든 장면입니다") |
| 카테고리 타일 r24 + 말풍선 badge-new | 소개할 제품 12종, 정수기에 "많이 찾는" 말풍선 |
| card-hotel-pick / card-listing | 혜택 카드 3장 (아이콘 + 텍스트 배지 + 출처 줄) |
| card-live 240:360 | 숏폼 이야기 카드 3장 |
| section-chip / -selected | FAQ 분류 칩 |
| filter-panel (r16 · 1px weak3) | 수입 계산기 입력 패널 |
| login-gradient-banner (brand-border 1px) | "같은 정수기, 혜택은 왜 다를까요" 배너 |
| 상세 모바일 하단 고정바 (가격 + 1차 버튼) | "가입비 0원 · 상담 무료" + 상담 신청 |
| scroll-top-button | 맨 위로 |
| footer (neutral-weak 면, 12px 밑줄 링크) | 공식 링크 · 운영자 · AI 이미지 고지 |

## 7. 쇼핑몰 랜딩 결 (NOL 위에 얹은 것)

- "상품"을 **할 일·혜택**으로 바꿔 상품 목록처럼 훑게 한다: 카테고리 타일 → 혜택 카드 → 단계 → 계산기(가격 표 자리) → 후기 자리에 숏폼 → 비교표 → FAQ → 구매 버튼 자리에 상담 신청.
- 가격 블록 대신 **0원 / 없음 / 3.3%** 사실 카드 3칸을 히어로에 둔다.
- 하단 고정 구매바 = 상담 신청 바. 히어로를 지나면 나타나고 상담 칸에 오면 숨는다.

## 8. 하지 않는 것 (NOL md Don'ts 적용)

- 하단 내비·모바일 탭 선택을 파랑으로 칠하지 않는다.
- `brand-border` 를 넓은 면 채움으로 쓰지 않는다.
- 빨강은 혜택 차이 1곳 외에 쓰지 않는다 (수수료 금액을 빨강으로 과장하지 않음).
- NOL 의 '놀' 말장난·여행 어휘·멤버십 등급을 가져오지 않는다.
- 코웨이 로고·제품 사진을 넣지 않는다 (공식 이미지 사용 허락 확인 전 — PRD 오픈 이슈).
