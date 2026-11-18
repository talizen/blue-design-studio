import { useEffect, useRef, useState } from "react"
import { STATS } from "./content"
import { Reveal } from "./motion"

/** Counts up to the target the first time the figure enters the viewport. */
function Counter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const run = () => {
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        setValue(Math.round(target * t))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          run()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration])

  return <span ref={ref}>{value}</span>
}

/** Three headline numbers, each paired with the story behind it. */
export function Stats() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-black px-6 py-20 md:px-8 md:py-32">
      <div className="flex w-full max-w-[1220px] flex-col items-center gap-12 overflow-hidden">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} className="flex w-full flex-col items-center gap-12" delay={i * 120}>
            {i > 0 && <div className="h-0.5 w-full bg-[rgb(234,231,224)] opacity-10" />}
            <div className="flex w-full items-start justify-center gap-4 lg:gap-8">
              <div className="flex h-16 w-[128px] shrink-0 items-center justify-center overflow-hidden font-lora text-[64px] leading-[64px] text-white md:h-20 md:text-[80px] md:leading-[80px]">
                {stat.prefix}
                <Counter target={stat.target} />
                <span>+</span>
              </div>
              <div className="flex w-full flex-col items-start gap-4 md:w-[360px]">
                <p className="font-roboto text-[18px] leading-[21.6px] text-[rgb(234,231,224)] opacity-90 md:text-[20px] md:leading-6">
                  {stat.label}
                </p>
                <p
                  className={`font-roboto font-light text-[rgba(255,255,255,0.71)] opacity-60 md:text-[16px] md:leading-[22.4px] ${stat.compactBody}`}
                >
                  {stat.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
