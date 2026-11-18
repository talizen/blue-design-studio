import { useEffect, useRef, useState } from "react"
import { A } from "./assets"
import { TESTIMONIALS } from "./content"
import { Reveal, useMinWidth } from "./motion"
import EmblaCarousel from "./EmblaCarousel"

const WIDE_SLIDE = 672
const GUTTER = 32

type Item = (typeof TESTIMONIALS.items)[number]

/** Wide card: portrait beside the quote, with the portrait echoed behind it. */
function WideCard({ item }: { item: Item }) {
  return (
    <div className="relative flex w-full flex-wrap items-center justify-between gap-[46px] overflow-hidden rounded-2xl bg-[rgb(15,15,15)] py-8 pl-8 pr-10 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.1)]">
      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden opacity-10">
        <img src={A.quoteBackdrop} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(0,0,0)_46.59%,rgba(0,0,0,0)_87.12%)]" />
      </div>
      <div className="h-[320px] w-[320px] shrink-0 overflow-hidden rounded-xl">
        <img src={item.photo} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col items-start justify-between gap-4 overflow-hidden">
        <p className="font-roboto text-[20px] font-light leading-7 text-white opacity-70">{TESTIMONIALS.quote}</p>
        <div className="flex w-full items-end justify-between gap-4 overflow-hidden">
          <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2 overflow-hidden">
            <p className="font-roboto text-[16px] font-semibold leading-[19.2px] text-white/80">{TESTIMONIALS.name}</p>
            <p className="font-roboto text-[16px] font-light leading-[19.2px] text-white opacity-60">
              {TESTIMONIALS.role}
            </p>
          </div>
          <img src={item.logo} alt="" className="h-[25px] w-[149px] shrink-0 object-cover opacity-50" />
        </div>
      </div>
    </div>
  )
}

/** Compact card: portrait and name on one row, quote under it, wordmark below. */
function CompactCard({ item }: { item: Item }) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-12 overflow-hidden rounded-xl bg-[rgb(15,15,15)] p-3">
      <div className="flex w-full items-center justify-center gap-4 overflow-hidden">
        <div className="h-[107px] w-[105px] shrink-0 overflow-hidden rounded-lg">
          <img src={item.small} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col items-start justify-center gap-2 overflow-hidden">
          <p className="font-roboto text-[16px] font-semibold leading-[19.2px] text-white/80">{TESTIMONIALS.name}</p>
          <p className="font-roboto text-[16px] font-light leading-[19.2px] text-white opacity-60">
            {TESTIMONIALS.role}
          </p>
        </div>
      </div>
      <p className="w-full font-roboto text-[14px] font-light leading-[19.6px] text-white opacity-70">
        {TESTIMONIALS.quote}
      </p>
      <div className="flex w-full items-center justify-start border-t border-[rgba(238,238,238,0.11)] pt-3">
        <img src={item.smallLogo} alt="" className="h-10 w-[149px] object-contain opacity-50" />
      </div>
    </div>
  )
}

/** Client quotes in an Embla carousel, hydrated client-side over a static list. */
export function Testimonials() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // The wide band shows two slides per view; narrower bands show one.
  const twoUp = useMinWidth(1200)
  const items = TESTIMONIALS.items
  const wide = width >= WIDE_SLIDE + GUTTER

  const slides = items.map((item, i) => (wide ? <WideCard key={i} item={item} /> : <CompactCard key={i} item={item} />))

  return (
    <section
      id="reviews"
      className="relative flex w-full justify-center overflow-hidden bg-black px-6 pb-20 pt-20 md:px-8 md:pb-32 md:pt-28"
    >
      <Reveal className="flex w-full flex-col items-center gap-[73px]">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 overflow-hidden">
            {TESTIMONIALS.heading.map((word) => (
              <h2
                key={word}
                className="font-lora text-[42px] font-bold leading-[42px] text-white md:text-[48px] md:leading-[67.2px] lg:text-[64px] lg:leading-[64px]"
              >
                {word}
              </h2>
            ))}
          </div>
          <p className="text-center font-roboto text-[14px] font-light leading-[19.6px] text-white opacity-60 lg:text-[20px] lg:leading-7">
            {TESTIMONIALS.sub}
          </p>
        </div>

        <div ref={boxRef} className="relative w-full">
          <EmblaCarousel
            slides={slides}
            slideClassName={twoUp ? "flex-[0_0_50%] px-4" : "flex-[0_0_100%] px-4"}
            align="center"
            loop
            autoplayDelay={5000}
            dots
            prevLabel="Previous review"
            nextLabel="Next review"
          />
        </div>
      </Reveal>
    </section>
  )
}
