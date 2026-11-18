import { useRef } from "react"
import { WORKS_HEADING } from "./content"
import { useScrub } from "./motion"
import EmblaCarousel from "./EmblaCarousel"

export type WorkItem = { title: string; cover: string; tags: string[] }

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 overflow-hidden">
      <div className="w-full overflow-hidden rounded-xl">
        <img src={item.cover} alt={item.title} className="aspect-[458.656/318.484] w-full object-cover" />
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-4 overflow-hidden">
        <p className="font-roboto text-[14px] font-light leading-[19.6px] text-white lg:text-[20px] lg:leading-7">
          {item.title}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center justify-center rounded-[41px] border border-[rgba(234,231,224,0.4)] px-3 py-1.5"
            >
              <span className="font-roboto text-[14px] font-light leading-[16.8px] text-white opacity-60">{tag}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Embla-driven three-up carousel. */
function WorksCarousel({ items }: { items: WorkItem[] }) {
  const slides = items.map((item, i) => <WorkCard key={i} item={item} />)

  return (
    <EmblaCarousel
      slides={slides}
      slideClassName="flex-[0_0_33.333%] px-2"
      align="center"
      loop
      autoplayDelay={4000}
      prevLabel="Previous work"
      nextLabel="Next work"
      className="pb-5"
    />
  )
}

/**
 * Pinned case-study reel. The title lands from three times its size while the
 * carousel rises into place underneath it; below the desktop cut the same
 * entries simply stack into a list.
 */
export function FeaturedWorks({ items }: { items: WorkItem[] }) {
  const mTitleFade = useRef<HTMLDivElement>(null)
  const mTitleScale = useRef<HTMLDivElement>(null)
  const mSub = useRef<HTMLDivElement>(null)
  const mCarousel = useRef<HTMLDivElement>(null)

  const titleFadeRef = useRef<HTMLDivElement>(null)
  const titleScaleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // The compact layout is a plain list; the scrubs only run once the reel is pinned.
  const pinned = { minWidth: 810 }
  useScrub(titleFadeRef, mTitleFade, { opacity: 0 }, { opacity: 1 }, pinned)
  useScrub(titleScaleRef, mTitleScale, { scale: 3, y: 126 }, { scale: 1, y: 0 }, pinned)
  useScrub(subRef, mSub, { opacity: 0, y: 34 }, { opacity: 0.6, y: 0 }, pinned)
  useScrub(carouselRef, mCarousel, { opacity: 0, y: 420 }, { opacity: 1, y: 0 }, pinned)

  return (
    <section id="work" className="relative w-full bg-black px-6 pt-20 md:h-[200vh] md:px-8">
      {/* Invisible rails that drive the scrub timings. */}
      <div ref={mTitleFade} className="pointer-events-none absolute left-0 top-[15%] h-[20%] w-px" />
      <div ref={mTitleScale} className="pointer-events-none absolute left-0 top-[50%] h-[48.5%] w-px" />
      <div ref={mCarousel} className="pointer-events-none absolute left-0 top-[51.7%] h-[45%] w-px" />
      <div ref={mSub} className="pointer-events-none absolute left-0 top-[89.5%] h-[9%] w-px" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-16 md:sticky md:top-0 md:h-screen">
        <div className="flex w-full flex-col items-center">
          <div ref={titleFadeRef} className="w-full">
            <h2
              ref={titleScaleRef}
              className="w-full text-center font-lora text-[42px] font-bold leading-[42px] text-white md:text-[48px] md:leading-[67.2px] lg:text-[64px] lg:leading-[64px]"
            >
              {WORKS_HEADING.title}
            </h2>
          </div>
          <div ref={subRef}>
            <p className="text-center font-roboto text-[14px] font-light leading-[19.6px] text-white lg:text-[20px] lg:leading-7">
              {WORKS_HEADING.sub}
            </p>
          </div>
        </div>

        <div ref={carouselRef} className="w-full">
          <div className="hidden md:block">
            <WorksCarousel items={items} />
          </div>
          <div className="flex w-full flex-col gap-4 md:hidden">
            {items.map((item, i) => (
              <WorkCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
