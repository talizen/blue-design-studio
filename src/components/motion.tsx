import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

let pluginReady = false
function ensurePlugin() {
  if (!pluginReady) {
    gsap.registerPlugin(ScrollTrigger)
    pluginReady = true
  }
}

/** Lenis smooth scroll, kept in step with ScrollTrigger. Mount once per page. */
export function SmoothScroll() {
  useEffect(() => {
    ensurePlugin()
    const lenis = new Lenis()
    lenis.on("scroll", ScrollTrigger.update)
    let frame = 0
    const tick = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    document.documentElement.classList.add("lenis")
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      document.documentElement.classList.remove("lenis")
    }
  }, [])
  return null
}

/**
 * Splits a string into per-character spans so motion can run per glyph. Words
 * stay glued together, so the paragraph breaks at spaces.
 */
export function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, pi) =>
        /^\s+$/.test(part) ? (
          <span className="ch" key={pi}>
            {part}
          </span>
        ) : (
          <span className="inline-block whitespace-nowrap" key={pi}>
            {Array.from(part).map((c, i) => (
              <span className="ch" key={i}>
                {c}
              </span>
            ))}
          </span>
        ),
      )}
    </>
  )
}

type CharsRevealOptions = {
  blur?: number
  translateY?: number
  stagger?: number
  duration?: number
  delay?: number
  once?: boolean
  start?: string
}

/**
 * Per-character enter: characters start blurred, offset and transparent, then
 * resolve with a stagger once the block reaches the viewport.
 */
export function useCharsReveal(
  ref: RefObject<HTMLElement | null>,
  {
    blur = 16,
    translateY = 10,
    stagger = 0.04,
    duration = 0.3,
    delay = 0,
    once = false,
    start = "top bottom",
  }: CharsRevealOptions = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    ensurePlugin()
    const chars = el.querySelectorAll<HTMLElement>(".ch")
    if (!chars.length) return
    const from = { opacity: 0, filter: `blur(${blur}px)`, y: translateY }
    const to = { opacity: 1, filter: "blur(0px)", y: 0 }
    gsap.set(chars, from)
    const play = () => gsap.to(chars, { ...to, duration, delay, stagger, ease: "none", overwrite: true })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: play,
      onEnterBack: once ? undefined : play,
    })
    return () => {
      trigger.kill()
      gsap.killTweensOf(chars)
    }
  }, [ref, blur, translateY, stagger, duration, delay, once, start])
}

/**
 * Per-character scrub: characters brighten one after another as the trigger
 * block travels through the viewport.
 */
export function useCharsScrub(
  ref: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  { fromOpacity = 0.3, stagger = 0.1, duration = 0.3, start = "top bottom", end = "bottom bottom" } = {},
) {
  useEffect(() => {
    const el = ref.current
    const trigger = triggerRef.current
    if (!el || !trigger) return
    ensurePlugin()
    const chars = el.querySelectorAll<HTMLElement>(".ch")
    if (!chars.length) return
    const tween = gsap.fromTo(
      chars,
      { opacity: fromOpacity },
      {
        opacity: 1,
        duration,
        stagger,
        ease: "none",
        scrollTrigger: { trigger, start, end, scrub: 1 },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [ref, triggerRef, fromOpacity, stagger, duration, start, end])
}

type ScrubVars = gsap.TweenVars

/** Scroll-linked tween between two states, smoothed like GSAP `scrub: 1`. */
export function useScrub(
  ref: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  from: ScrubVars,
  to: ScrubVars,
  { start = "top bottom", end = "bottom bottom", minWidth = 0 } = {},
) {
  const wide = useMinWidth(minWidth)
  useEffect(() => {
    const el = ref.current
    const trigger = triggerRef.current
    if (!el || !trigger) return
    if (!wide) {
      gsap.set(el, to)
      return () => {
        gsap.killTweensOf(el)
      }
    }
    ensurePlugin()
    const tween = gsap.fromTo(el, from, {
      ...to,
      ease: "none",
      scrollTrigger: { trigger, start, end, scrub: 1 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, triggerRef, start, end, wide])
}

/** True once the viewport is at least `min` wide; re-evaluated on resize. */
export function useMinWidth(min: number) {
  const [wide, setWide] = useState(min === 0)
  useEffect(() => {
    if (min === 0) return
    const check = () => setWide(window.innerWidth >= min)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [min])
  return wide
}

type AppearOptions = {
  from?: ScrubVars
  duration?: number
  delay?: number
  ease?: string
  start?: string
}

/** One-shot enter animation when the element first reaches the viewport. */
export function useAppear(
  ref: RefObject<HTMLElement | null>,
  { from = { opacity: 0, y: -50 }, duration = 0.5, delay = 0, ease = "power3.inOut", start = "top bottom" }: AppearOptions = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    ensurePlugin()
    const keys = Object.keys(from)
    const to: ScrubVars = { duration, delay, ease, overwrite: true }
    for (const k of keys) to[k] = k === "opacity" ? 1 : 0
    gsap.set(el, from)
    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => gsap.to(el, to),
    })
    return () => {
      trigger.kill()
      gsap.killTweensOf(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, duration, delay, ease, start])
}

/**
 * Scroll-position switch for scroll-driven variants. `at` is re-read on resize so viewport-relative thresholds hold.
 */
export function useScrollStage(at: (viewportHeight: number) => number[]) {
  const [stage, setStage] = useState(0)
  const atRef = useRef(at)
  atRef.current = at
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const marks = atRef.current(window.innerHeight)
      const y = window.scrollY
      let next = 0
      for (let i = 0; i < marks.length; i++) if (y >= marks[i]) next = i + 1
      setStage((prev) => (prev === next ? prev : next))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return stage
}

type RevealProps = {
  children?: ReactNode
  /** Vertical offset the element rises from, in px. */
  y?: number
  /** Horizontal offset the element slides in from, in px. */
  x?: number
  /** Scale the element enters from. */
  scale?: number
  /** Transition duration in ms. */
  duration?: number
  /** Transition delay in ms. */
  delay?: number
  /** Replay on every entry instead of only the first. */
  once?: boolean
  className?: string
}

/**
 * Scroll-into-view reveal: content fades and rises into place the first time
 * it enters the viewport. Built on IntersectionObserver so it also plays inside
 * the editor canvas, where window-scroll triggers (ScrollTrigger/Lenis) may not
 * fire.
 */
export function Reveal({
  children,
  y = 32,
  x = 0,
  scale = 1,
  duration = 700,
  delay = 0,
  once = true,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setShown(true)
          if (once) io.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown
      ? "translate3d(0, 0, 0) scale(1)"
      : `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    willChange: "opacity, transform",
  }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
