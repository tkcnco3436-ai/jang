// 히어로 패럴랙스 — components/ui/parallax-scrolling.tsx 의 GSAP·Lenis 타임라인을
// index.html 히어로([data-parallax-layers])에 그대로 붙인다 (이 페이지는 React 가 아닌 정적 HTML).
// 빌드: npm run build:hero → assets/hero-parallax.js
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const triggerElement = document.querySelector<HTMLElement>("[data-parallax-layers]")

if (triggerElement && !reduce) {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "0% 0%",
      end: "100% 0%",
      scrub: 0,
    },
  })

  // 원본과 같은 깊이: 1 이 가장 멀다(가장 많이 내려감), 4 는 거의 고정된 앞 레이어
  const layers = [
    { layer: "1", yPercent: 70 },
    { layer: "2", yPercent: 55 },
    { layer: "3", yPercent: 40 },
    { layer: "4", yPercent: 10 },
  ]
  layers.forEach((layerObj, idx) => {
    tl.to(
      triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
      { yPercent: layerObj.yPercent, ease: "none" },
      idx === 0 ? undefined : "<",
    )
  })

  // 부드러운 스크롤 (원본과 같음)
  const lenis = new Lenis()
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // 문의 시트·완료 모달이 열리면(body.is-locked) 스크롤을 멈춘다
  new MutationObserver(() => {
    if (document.body.classList.contains("is-locked")) lenis.stop()
    else lenis.start()
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] })

  // 페이지 안 링크(#what 등)는 Lenis 로 이동 — 고정 헤더 높이만큼 위를 비운다
  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null
    if (!a || a.hasAttribute("data-sheet")) return
    const id = a.getAttribute("href")!.slice(1)
    const target = id ? document.getElementById(id) : null
    if (!target) return
    e.preventDefault()
    const header = document.querySelector<HTMLElement>(".hd")
    lenis.scrollTo(target, { offset: -((header?.offsetHeight || 0) + 8) })
  })
}
