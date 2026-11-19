# 코웨이 정수기 렌탈 샘플 랜딩 (`/coway/`)

growthground.kr/coway 구성을 참고한 장팀장렌탈 정수기 렌탈 랜딩 샘플.

| 구간 | 출처 |
|---|---|
| 히어로·제품 카드 | goodlife.cowaymall.co.kr 카테고리별 베스트 › 정수기 5종 (2026-11-19 확인 가격) |
| 사은품 | goodlife.cowaymall.co.kr/content/eventGift (BEST 사은품 12종) |
| FAQ | growthground 동작과 동일 — 한 번에 하나만 펼침, `+` 45° 회전 |
| 맞춤형 견적 보기 | cowaymall '원하는 제품 찾기' 선택지·메모 문장 + good.cowaygoodlife.kr 톤 |
| 상담 모달 | cowaymall '제품 상담 신청서'(cta-popup-noProduct)와 같은 입력·검증 |
| 푸터 | good.cowaygoodlife.kr 사업자 정보 |

## 상담 접수 흐름

모달 제출 → `/api/counsel` (Vercel 함수, `api/counsel.js`) → goodlife.cowaymall.co.kr 상담 게시판(`bo_table=counsel`).
cowaymall 폼은 같은 세션의 1회용 쓰기 토큰이 필요해 브라우저에서 직접 보낼 수 없으므로, 함수가 사이트와 같은 순서(메인 접속 → 토큰 발급 → 제출)로 접수한다.
`CONFIG.counselEndpoint` 를 비우면 접수 대신 전화 안내만 표시한다.
