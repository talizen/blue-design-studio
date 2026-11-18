import { useRef } from "react"
import { A } from "./assets"
import { FOOTER } from "./content"
import { Chars, useCharsReveal } from "./motion"

/** Closing frame: sunset photograph, the invitation, and the utility bar. */
export function SiteFooter() {
  const kickerRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLParagraphElement>(null)

  useCharsReveal(kickerRef, { blur: 16, translateY: -10, stagger: 0.01, duration: 0.3 })
  useCharsReveal(headlineRef, { blur: 16, translateY: 10, stagger: 0.04, duration: 0.3 })

  return (
    <section className="relative flex w-full items-center justify-center bg-black p-4 md:h-[95vh] md:p-8">
      <div className="relative flex h-full w-full max-w-[1728px] items-center justify-center overflow-hidden rounded-2xl bg-[rgb(43,0,0)] p-8">
        <img src={A.footerPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.9)_100%)]" />
        <div
          className="absolute inset-0 bg-repeat opacity-10"
          style={{ backgroundImage: `url(${A.grainFooter})` }}
        />

        {/* Card column: content block, 16px, then the utility bar. */}
        <div className="relative flex h-full w-full flex-col items-center gap-4">
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-10 py-52 md:py-0">
            <div className="flex w-full flex-col items-center">
              <p
                ref={kickerRef}
                className="font-roboto text-[28px] font-light leading-[33.6px] text-[rgb(241,231,181)]"
              >
                <Chars text={FOOTER.kicker} />
              </p>
              <p
                ref={headlineRef}
                className="text-center font-lora text-[36px] leading-[36px] text-[rgb(241,231,181)] md:text-[54px] md:leading-[54px]"
              >
                <Chars text={FOOTER.headline} />
              </p>
            </div>
            <a
              href={FOOTER.cta.href}
              className="flex items-center rounded-lg bg-[rgb(229,231,235)] px-5 py-2 text-[14px] font-medium leading-5 text-black shadow-[inset_0_2px_1px_1px_#fff]"
            >
              {FOOTER.cta.label}
            </a>
          </div>

          <div className="flex w-full flex-col items-center gap-3 border-t border-[rgba(241,231,181,0.15)] pt-4 md:flex-row md:justify-between md:gap-4">
            <div className="flex flex-1 items-center justify-start">
              <p className="font-roboto text-[16px] font-light leading-[19.2px] text-[rgb(241,231,181)]">
                {FOOTER.copyright}
              </p>
            </div>
            <a href={FOOTER.email.href} className="flex flex-1 items-center justify-center">
              <p className="font-roboto text-[16px] font-light leading-[19.2px] text-[rgb(241,231,181)]">
                {FOOTER.email.label}
              </p>
            </a>
            <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
              {FOOTER.links.map((link) => (
                <a key={link.label} href={link.href}>
                  <p className="font-roboto text-[16px] font-light leading-[19.2px] text-[rgb(241,231,181)]">
                    {link.label}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
