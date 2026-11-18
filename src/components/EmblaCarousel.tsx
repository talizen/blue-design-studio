import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import type { EmblaCarouselType, EmblaPluginType } from "embla-carousel"
import { A } from "./assets"

type EmblaCarouselProps = {
  slides: ReactNode[]
  slideClassName?: string
  align?: "start" | "center" | "end"
  loop?: boolean
  autoplayDelay?: number
  dots?: boolean
  prevLabel?: string
  nextLabel?: string
  className?: string
}

/**
 * Embla carousel. Embla is a project importMap dependency, so it is loaded via
 * dynamic `import()` inside useEffect — never statically in the SSR module
 * graph. SSR renders the slide shell; the client hydrates the scroller.
 */
export default function EmblaCarousel({
  slides,
  slideClassName = "flex-[0_0_100%]",
  align = "center",
  loop = true,
  autoplayDelay = 4000,
  dots = false,
  prevLabel = "Previous",
  nextLabel = "Next",
  className = "",
}: EmblaCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<EmblaCarouselType | null>(null)
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let embla: EmblaCarouselType | null = null
    let cancelled = false

    Promise.all([import("embla-carousel"), import("embla-carousel-autoplay")]).then(
      ([emblaModule, autoplayModule]) => {
        if (cancelled) return
        const useAutoplay =
          autoplayDelay > 0 &&
          !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        const plugins: EmblaPluginType[] = useAutoplay
          ? [autoplayModule.default({ delay: autoplayDelay, stopOnInteraction: true })]
          : []
        embla = emblaModule.default(
          container,
          { loop, align, containScroll: "trimSnaps" },
          plugins,
        )
        apiRef.current = embla

        const onSelect = () => {
          setSelected(embla!.selectedScrollSnap())
          setSnapCount(embla!.scrollSnapList().length)
        }
        onSelect()
        embla.on("select", onSelect)
        embla.on("reInit", onSelect)
      },
    )

    return () => {
      cancelled = true
      embla?.destroy()
      apiRef.current = null
    }
  }, [loop, align, autoplayDelay])

  const scrollPrev = useCallback(() => apiRef.current?.scrollPrev(), [])
  const scrollNext = useCallback(() => apiRef.current?.scrollNext(), [])
  const scrollTo = useCallback((i: number) => apiRef.current?.scrollTo(i), [])

  return (
    <div className={`relative w-full ${className}`} aria-roledescription="carousel">
      <div ref={containerRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className={`min-w-0 ${slideClassName}`} aria-roledescription="slide">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={scrollPrev}
            className="absolute left-[10px] top-1/2 z-10 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15"
          >
            <img src={A.arrowLeft} alt="" className="h-10 w-10 object-contain" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={scrollNext}
            className="absolute right-[10px] top-1/2 z-10 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15"
          >
            <img src={A.arrowRight} alt="" className="h-10 w-10 object-contain" />
          </button>

          {dots && snapCount > 1 && (
            <div className="absolute inset-x-0 -bottom-8 z-10 flex items-center justify-center gap-2">
              {Array.from({ length: snapCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`inline-block h-2 w-2 rounded-full bg-white ${i === selected ? "opacity-100" : "opacity-20"}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
