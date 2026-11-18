import { useRef } from "react"
import { A } from "./assets"
import { JOURNEY } from "./content"
import { IconDots, IconTrend, IconWand } from "./icons"
import { useScrollStage, useScrub } from "./motion"

const ICONS = { trend: IconTrend, dots: IconDots, wand: IconWand }

/** Per-stage geometry for the three panels, in the card grid's own 1066px space. */
const PLACEMENT = [
  // stage 0 — the three panels butt together into one photograph
  [
    { left: 33, top: 0, rotate: 0 },
    { left: 366, top: 0, rotate: 0 },
    { left: 699, top: 0, rotate: 0 },
  ],
  // stage 1 — they separate to the edges
  [
    { left: 0, top: 0, rotate: 0 },
    { left: 366, top: 0, rotate: 0 },
    { left: 732, top: 0, rotate: 0 },
  ],
  // stage 2 — the outer two tilt and the set flips to its printed side
  [
    { left: 30, top: 30, rotate: -15 },
    { left: 366, top: 0, rotate: 0 },
    { left: 702, top: 30, rotate: 10 },
  ],
]

const OUTER_RADIUS = ["24px 0 0 24px", "0px", "0 24px 24px 0"]
/** The compact layout ships the printed side only, fanned out as a sticky stack. */
const STACK_ROTATE = [-15, 0, 10]

type Card = (typeof JOURNEY.cards)[number]

function PrintedFace({ card, className }: { card: Card; className?: string }) {
  const Icon = ICONS[card.icon]
  return (
    <div
      className={`flex flex-col items-center justify-between gap-4 overflow-hidden rounded-3xl px-8 py-6 ${className ?? ""}`}
      style={{
        backgroundImage: card.face,
        boxShadow: `0 24px 65px 0 rgb(0,0,0), ${card.inset}`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${A.grainCard})`, backgroundSize: "10%" }}
      />
      <div className="relative flex w-full flex-1 items-center justify-start">
        <Icon className="h-[38px] w-[38px]" />
      </div>
      <div className="relative flex w-full flex-col items-center justify-center">
        {card.title.map((line) => (
          <h2 key={line} className="font-lora text-[32px] font-bold leading-[44.8px]" style={{ color: card.ink }}>
            {line}
          </h2>
        ))}
      </div>
      <div className="relative flex w-full flex-1 items-center justify-center">
        <p className="text-[11px] leading-[13.2px]" style={{ color: card.ink }}>
          {JOURNEY.blurb}
        </p>
      </div>
    </div>
  )
}

/**
 * One photograph splits into three cards, which tilt apart and flip over to
 * show where each kind of client starts. Below the desktop cut the same three
 * printed cards stack up on a sticky rail instead.
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stage = useScrollStage((vh) => {
    const top = sectionRef.current ? sectionRef.current.offsetTop : 0
    return [top + vh * 0.7, top + vh * 1.4]
  })

  useScrub(scaleRef, markerRef, { scale: 1.2 }, { scale: 1 }, { start: "top top", end: "bottom top", minWidth: 1200 })
  useScrub(headingRef, markerRef, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, { start: "top top", end: "bottom top", minWidth: 1200 })

  return (
    <section ref={sectionRef} className="relative w-full bg-black lg:h-[340vh]">
      <div
        className="absolute inset-0 overflow-hidden opacity-10"
        style={{ backgroundImage: `url(${A.dotPattern})`, backgroundSize: "48px" }}
      />
      <div ref={markerRef} className="pointer-events-none absolute left-0 top-0 h-[70vh] w-px" />

      <div className="relative z-[4] flex w-full flex-col items-center px-6 pb-24 pt-[124px] md:px-24 lg:sticky lg:top-0 lg:h-screen lg:min-h-screen lg:justify-center lg:overflow-hidden">
        <div className="flex w-full flex-1 flex-col items-center gap-[320px] lg:justify-center lg:gap-16">
          <div ref={headingRef} className="sticky top-[112px] w-full lg:static">
            <p className="text-center font-lora text-[36px] leading-[43.2px] text-white">{JOURNEY.heading}</p>
          </div>

          <div ref={scaleRef} className="flex w-full flex-col items-center">
            <div className="relative hidden h-[464px] w-[1066px] lg:block">
              {JOURNEY.cards.map((card, i) => {
                const place = PLACEMENT[stage][i]
                return (
                  <div
                    key={i}
                    className="absolute h-[464px] w-[334px] transition-[left,top,transform] duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]"
                    style={{ left: place.left, top: place.top, transform: `rotate(${place.rotate}deg)` }}
                  >
                    <div
                      className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)] [transform-style:preserve-3d]"
                      style={{ transform: `perspective(1200px) rotateY(${stage === 2 ? -180 : 0}deg)` }}
                    >
                      <div
                        className="absolute inset-0 overflow-hidden transition-[border-radius] duration-500 [backface-visibility:hidden]"
                        style={{ borderRadius: stage === 0 ? OUTER_RADIUS[i] : "24px" }}
                      >
                        <img
                          src={card.photo}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{ objectPosition: card.crop }}
                        />
                      </div>
                      <PrintedFace card={card} className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]" />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex w-full flex-col items-center gap-[200px] lg:hidden">
              {JOURNEY.cards.map((card, i) => (
                <div
                  key={i}
                  className="sticky top-[272px]"
                  style={{ transform: `rotate(${STACK_ROTATE[i]}deg)` }}
                >
                  <PrintedFace card={card} className="relative h-[400px] w-[280px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
