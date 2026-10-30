// 랜딩 푸터: DoodleCrewFooter 에 이 페이지의 글·색·사업자 정보를 넣어 #footerRoot 에 붙인다.
// 사업자 정보·운영자는 index.html 의 window.SITE_BUSINESS 에서 읽는다 (코드 수정 없이 기입).
// 빌드: npm run build:footer → assets/footer.js
import * as React from "react"
import { createRoot } from "react-dom/client"
import DoodleCrewFooter, { type CrewMember, type FooterColumn } from "./ui/doodle-crew-footer"

type Business = {
  상호?: string
  대표자?: string
  사업자등록번호?: string
  통신판매업신고?: string
  주소?: string
  전화?: string
  이메일?: string
  개인정보보호책임자?: string
}

declare global {
  interface Window {
    SITE_BUSINESS?: Business
    openInquiry?: () => void
  }
}

const ORDER: (keyof Business)[] = ["상호", "대표자", "사업자등록번호", "통신판매업신고", "주소", "전화", "이메일", "개인정보보호책임자"]
const LABEL: Record<keyof Business, string> = {
  상호: "상호",
  대표자: "대표",
  사업자등록번호: "사업자등록번호",
  통신판매업신고: "통신판매업 신고",
  주소: "주소",
  전화: "전화",
  이메일: "이메일",
  개인정보보호책임자: "개인정보 보호책임자",
}

const CREW: CrewMember[] = [
  { kind: "purifier", letter: 0, seat: "front", offset: -0.36, name: "정수기", says: "약정 끝났으면 혜택부터 확인!" },
  { kind: "humidifier", letter: 1, seat: "top", offset: 0, name: "가습기", says: "촉촉하게 소개만 해 주세요~" },
  { kind: "aircleaner", letter: 2, seat: "behind", offset: 0, name: "공기청정기", says: "가입비 0원, 공기처럼 가볍게." },
  { kind: "foodwaste", letter: 3, seat: "top", offset: 0.05, name: "음식물처리기", says: "모집 수당? 그런 건 없어요." },
  { kind: "drop", letter: 4, seat: "front", offset: 0.42, name: "물방울", says: "상담 신청은 무료예요!" },
]

function SiteFooter() {
  const biz = window.SITE_BUSINESS || {}
  const filled = ORDER.filter((k) => String(biz[k] || "").trim())
  const bizLinks = filled.length
    ? filled.map((k) => ({ label: `${LABEL[k]} ${String(biz[k]).trim()}` }))
    : [{ label: "사업자 정보 미기입 — index.html 의 SITE_BUSINESS 에 입력" }]

  const columns: FooterColumn[] = [
    { title: "둘러보기", links: [{ label: "하는 일", href: "#what" }, { label: "수입 계산", href: "#calc" }, { label: "활동 후기", href: "#reviews" }, { label: "자주 묻는 질문", href: "#faq" }] },
    { title: "공식 안내", links: [{ label: "공식대리점 안내", href: "https://good.cowaygoodlife.kr/" }, { label: "개인정보처리방침", href: "https://good.cowaygoodlife.kr/privacy" }, { label: "이용약관", href: "https://good.cowaygoodlife.kr/terms" }] },
    { title: "사업자 정보", links: bizLinks },
  ]

  return (
    <DoodleCrewFooter
      wordmark="장팀장렌탈"
      brand={biz.상호?.trim() || "장팀장렌탈"}
      logoSrc="assets/logo.png"
      blurb="코웨이 더좋은 공식대리점 활동자가 운영하는 안내 페이지이며, 코웨이 본사가 운영하는 페이지가 아닙니다."
      tagline=""
      columns={columns}
      actions={[]}
      copyright={`© 2026 ${biz.상호?.trim() || "장팀장렌탈"}. 수수료·수입은 개인마다 다르며 보장되지 않습니다.`}
      legal={[]}
      socials={[]}
      crew={CREW}
      doodles={["drop", "bubble", "sparkle", "drop", "star", "bubble", "drop", "heart"]}
      doodleCount={10}
      preset="paper"
      palette={{ background: "#F7F8FB", ink: "#1B1C1F", accent: "#4154FF" }}
      fontFamily={'"Pretendard Variable", Pretendard, "Apple SD Gothic Neo", sans-serif'}
      serifFamily={'"Pretendard Variable", Pretendard, "Apple SD Gothic Neo", sans-serif'}
      tracking={-0.03}
      backToTop={false}
      height="640px"
    />
  )
}

const el = document.getElementById("footerRoot")
if (el) createRoot(el).render(<SiteFooter />)
