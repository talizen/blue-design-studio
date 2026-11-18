import { useEffect, useRef, useState, type RefObject } from "react"
import gsap from "gsap"
import { A } from "./assets"
import { HERO } from "./content"
import { Chars, useCharsReveal, useScrub } from "./motion"

/** Live local clock, 12-hour readout in the studio's time zone (HERO.timeZone). */
function Clock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: HERO.timeZone,
      }).format(new Date())
    setTime(format())
    const id = setInterval(() => setTime(format()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-serif-default text-base leading-6 text-white opacity-60">{time}</span>
}

/**
 * Full-viewport opening frame. The section stays pinned for the whole page so
 * the following black bands slide over it while it shrinks away.
 */
export function Hero({ scrubTrigger }: { scrubTrigger: RefObject<HTMLElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useScrub(
    cardRef,
    scrubTrigger,
    { opacity: 1, rotateX: 0, scale: 1, y: 0, transformPerspective: 1200 },
    { opacity: 0, rotateX: 8, scale: 0.8, y: 40 },
    { start: "top bottom", end: "bottom bottom" },
  )

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.in" })
  }, [])

  useCharsReveal(subRef, {
    blur: 10,
    translateY: 10,
    stagger: 0.01,
    duration: 0.5,
    delay: 0.8,
    once: true,
  })

  return (
    <section className="sticky top-0 h-screen max-h-[720px] w-full bg-black p-4 md:max-h-none md:p-6 lg:p-8">
      <div
        ref={cardRef}
        className="h-full w-full overflow-hidden rounded-2xl [transform-style:preserve-3d]"
      >
        <div
          ref={innerRef}
          data-enter="hero"
          className="relative flex h-full w-full flex-col items-start justify-center"
        >
          <img src={A.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0 bg-repeat opacity-10"
            style={{ backgroundImage: `url(${A.grainHero})`, backgroundSize: "256px" }}
          />

          <main className="relative flex w-full flex-col items-center justify-center gap-6 px-4">
            <div className="flex w-full flex-wrap items-center justify-center">
              {HERO.lines.map((line) => (
                <h1
                  key={line}
                  className="w-full text-center font-lora text-[36px] font-bold leading-[50.4px] tracking-[-1.44px] text-white md:text-[48px] md:leading-[67.2px] md:tracking-[-1.92px] lg:text-[60px] lg:leading-[84px] lg:tracking-[-2.4px]"
                >
                  {line}
                </h1>
              ))}
            </div>
            <p ref={subRef} data-chars="blur" className="text-center text-[24px] leading-7 text-white/90">
              <Chars text={HERO.sub} />
            </p>
          </main>

          <footer className="absolute inset-x-0 bottom-0 border-t border-white/15 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center justify-start">
                <Clock />
              </div>
              <div className="flex flex-1 items-center justify-center">
                <span className="text-scroll-hint text-[14px] leading-5 text-[rgba(156,163,175,0.8)]">
                  {HERO.hint}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-end">
                <span className="text-[14px] leading-5 text-[rgba(156,163,175,0.8)]">{HERO.place}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}
