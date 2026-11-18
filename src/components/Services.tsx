import { useRef, useState } from "react"
import { SERVICES } from "./content"
import { useAppear } from "./motion"

function Row({ row }: { row: (typeof SERVICES.rows)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useAppear(ref, { from: { opacity: 0, x: 50 }, duration: 1, ease: "power3.inOut" })

  return (
    <div ref={ref} className="w-full">
      <div className="flex w-full flex-col items-start gap-4 border-b border-[rgba(234,231,224,0.1)] pb-0 md:flex-row md:border-b-2 md:pb-10">
        <div className="flex w-full items-center justify-between gap-4 pb-8 md:flex-1 md:justify-start">
          <div className="flex flex-col items-start">
            <div className="text-[16px] leading-[19.2px] text-white">{row.no}</div>
            <h3 className="text-[24px] leading-[26.4px] text-white md:text-[26px] md:leading-[28.6px] lg:text-[32px] lg:leading-[35.2px]">
              {row.title}
            </h3>
          </div>
          {/* Compact layout folds each row away behind a plus toggle. */}
          <button
            type="button"
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${row.title}`}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgb(42,42,42)] opacity-80 md:hidden"
          >
            <span className="block h-0.5 w-3 bg-white" />
            <span
              className={`absolute left-2 top-[13px] block h-0.5 w-3 bg-white transition-transform duration-300 ${
                open ? "rotate-0" : "rotate-90"
              }`}
            />
          </button>
        </div>

        <div
          className={`grid w-full transition-[grid-template-rows] duration-300 md:!grid-rows-[1fr] md:flex-[2] ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex w-full flex-col items-center justify-center gap-4 pb-10 md:flex-row md:pb-0">
              <div className="flex w-full items-start justify-start md:flex-1">
                <div className="whitespace-pre font-roboto text-[16px] font-light leading-6 text-white opacity-60">
                  {row.items.join("\n")}
                </div>
              </div>
              <div className="w-full shrink-0 overflow-hidden rounded-md md:flex-1">
                <img src={row.image} alt="" className="aspect-[372/210.172] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Numbered service rows with a preview still for each discipline. */
export function Services() {
  return (
    <section id="services" className="relative flex w-full justify-center overflow-hidden bg-black">
      <div className="flex w-full max-w-[1220px] flex-col items-center gap-28 px-6 pb-20 pt-[148px] md:px-8">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-2 overflow-hidden md:gap-4">
            {SERVICES.heading.map((word) => (
              <h2
                key={word}
                className="font-lora text-[42px] font-bold leading-[42px] text-white md:text-[48px] md:leading-[67.2px] lg:text-[64px] lg:leading-[64px]"
              >
                {word}
              </h2>
            ))}
          </div>
          <div className="opacity-60">
            {SERVICES.sub.map((line) => (
              <p
                key={line}
                className="text-center font-roboto text-[14px] font-light leading-[19.6px] text-white md:text-[16px] md:leading-[22.4px] lg:text-[20px] lg:leading-7"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          {SERVICES.rows.map((row) => (
            <Row key={row.no} row={row} />
          ))}
        </div>

        <a
          href={SERVICES.cta.href}
          className="flex items-center rounded-lg bg-[rgb(229,231,235)] px-5 py-2 text-[14px] font-medium leading-5 text-black shadow-[inset_0_2px_1px_1px_#fff]"
        >
          {SERVICES.cta.label}
        </a>
      </div>
    </section>
  )
}
