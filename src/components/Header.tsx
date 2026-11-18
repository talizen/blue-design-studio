import { useEffect, useRef } from "react"
import gsap from "gsap"
import { A } from "./assets"
import { NAV, CTA } from "./content"
import { useScrollStage } from "./motion"

/**
 * Floating nav. Over the hero it spans the content width; once the page has
 * scrolled half a viewport it darkens, and on wide screens it also halves.
 * The tablet band keeps the translucent state throughout.
 */
export function Header() {
  const ref = useRef<HTMLElement>(null)
  const compact = useScrollStage((vh) => [vh * 0.5]) > 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power3.inOut" },
    )
  }, [])

  const shell = compact
    ? "bg-[rgba(38,38,38,0.8)] backdrop-blur-[8px] md:bg-[rgba(33,34,37,0.3)] md:backdrop-blur-[10px] lg:w-1/2 lg:bg-[rgba(38,38,38,0.8)] lg:backdrop-blur-[8px]"
    : "bg-[rgba(33,34,37,0.3)] backdrop-blur-[10px]"

  return (
    <header
      ref={ref}
      data-enter="header"
      className="fixed inset-x-0 top-0 z-10 flex flex-col items-center p-6 md:px-12 md:pb-0 md:pt-12 lg:px-16"
    >
      <div className="flex w-full justify-center">
        <div
          className={`flex w-full items-center justify-between gap-6 rounded-xl py-3 pl-6 pr-3 transition-[width,background-color,backdrop-filter] duration-300 ease-[cubic-bezier(.25,.46,.45,.94)] ${shell}`}
        >
          <a href="/" className="flex shrink-0 items-center">
            <img src={A.logoMark} alt="blue." className="h-8 w-8" />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[14px] leading-5 text-[rgb(209,213,219)] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={CTA.href}
            className="flex shrink-0 items-center rounded-lg bg-[rgb(229,231,235)] px-5 py-2 text-[14px] font-medium leading-5 text-black shadow-[inset_0_2px_1px_1px_#fff]"
          >
            {CTA.label}
          </a>
        </div>
      </div>
    </header>
  )
}
