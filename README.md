# jang

장팀장렌탈 — 렌탈 소개 부업(코웨이 더좋은 공식대리점 세컨드잡) 안내 랜딩페이지.

## 구성

| 경로 | 내용 |
|---|---|
| `index.html` | 랜딩페이지 본문 (정적 HTML 한 장 · 스타일·스크립트 포함) |
| `assets/` | 로고, 히어로 인물 이미지, 빌드된 `footer.js` · `hero-parallax.js` |
| `components/ui/` | 원본 컴포넌트 (`doodle-crew-footer.tsx` — 가전 그림 추가, `parallax-scrolling.tsx` — 보관용) |
| `components/site-footer.tsx` | 푸터 설정 (글·색·캐릭터·사업자 정보 연결) |
| `components/hero-parallax.ts` | 히어로 패럴랙스 (GSAP ScrollTrigger + Lenis) |
| `기획서.md` · `PRD.md` · `DESIGN.md` | 기획 · 요구사항 · 디자인 기준 |

## 실행

`index.html` 을 브라우저로 열면 된다. 정적 호스팅(Vercel·Netlify·GitHub Pages)에 폴더째 올리면 배포된다.

## 빌드 (푸터·히어로 스크립트를 고쳤을 때만)

```bash
npm install
npm run build        # = build:footer + build:hero → assets/*.js
```

## 운영 설정 (`index.html`)

- `CONFIG.refCode` — 공식대리점 추천 코드
- `CONFIG.inquiryEndpoint` / `CONFIG.smsNumber` — 문의 접수 창구 (CORS 허용 필요)
- `CONFIG.kakaoUrl` — 카카오 채널 (비우면 버튼 숨김)
- `window.SITE_BUSINESS` — 푸터 사업자 정보
- `REVIEWS` — 후기 (지금은 예시 · 실제 후기로 바꾸면 `sample: false`)
