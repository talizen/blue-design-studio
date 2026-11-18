import { useRef } from "react"
import { A } from "./assets"
import { STATEMENT, TICKER_LOGOS } from "./content"
import { Chars, useCharsScrub } from "./motion"

/** Infinite logo rail, masked at both edges and paused on hover. */
function LogoTicker() {
  const group = (
    <div className="flex shrink-0 items-center pr-10">
      {TICKER_LOGOS.map((logo, i) => (
        <div key={i} className="mr-10 flex h-[100px] w-[200px] shrink-0 items-center justify-center">
          <img src={logo} alt="" className="h-full w-full object-contain" />
        </div>
      ))}
    </div>
  )
  return (
    <div className="ticker-mask group h-[100px] w-full overflow-hidden opacity-70">
      <div className="ticker-track h-full group-hover:[animation-play-state:paused]">
        {group}
        {group}
        {group}
      </div>
    </div>
  )
}

/**
 * Pinned statement: the sentence brightens character by character as the
 * section scrolls, with the client rail parked at the bottom of the frame.
 */
export function Statement() {
  const markerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useCharsScrub(textRef, markerRef, {
    fromOpacity: 0.3,
    stagger: 0.1,
    duration: 0.3,
    start: "top bottom",
    end: "bottom bottom",
  })

  return (
    <section className="relative h-[240vh] w-full bg-black">
      <div ref={markerRef} className="pointer-events-none absolute left-1/2 top-[60vh] h-[180vh] w-px" />
      <div className="sticky top-0 mx-auto flex h-screen w-full max-w-[1728px] items-center justify-center">
        <div
          className="absolute inset-0 overflow-hidden opacity-10"
          style={{ backgroundImage: `url(${A.dotPattern})`, backgroundSize: "48px" }}
        />
        <div className="relative flex h-full min-h-[90vh] w-full max-w-[1440px] flex-col items-center justify-between overflow-hidden px-4 pb-16 md:px-24">
          <div className="flex flex-1 items-center justify-center pb-4">
            <h2
              ref={textRef}
              className="w-full text-center font-lora text-[30px] font-bold leading-[34px] text-white md:text-[48px] md:leading-[67.2px] lg:text-[64px] lg:leading-[64px]"
            >
              <Chars text={STATEMENT} />
            </h2>
          </div>
          <LogoTicker />
        </div>
      </div>
    </section>
  )
}
