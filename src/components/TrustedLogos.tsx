import { TRUSTED } from "./content"
import { Reveal } from "./motion"

/**
 * Six-column client wall; every tile is a flat near-black plate. The compact
 * layout keeps six fixed columns and lets the wall run past the gutter.
 */
export function TrustedLogos() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-black px-6 pb-20 pt-[72px] md:px-8 md:pb-32">
      <Reveal className="flex w-full max-w-[1220px] flex-col items-center gap-16 overflow-hidden">
        <p className="max-w-[280px] text-center font-roboto text-[20px] font-light leading-7 text-white">
          {TRUSTED.heading}
        </p>
        <div className="grid w-full gap-4 [grid-template-columns:repeat(6,50px)] md:[grid-template-columns:repeat(6,1fr)]">
          {TRUSTED.logos.map((logo, i) => (
            <div key={i} className="flex aspect-[3/2] items-center justify-center overflow-hidden bg-[rgb(11,10,11)]">
              <img src={logo} alt="" className="h-full w-full object-contain opacity-60" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
