import { TEAM } from "./content"
import { Reveal } from "./motion"
import { IconInstagram, IconLinkedin } from "./icons"

const ICONS = { linkedin: IconLinkedin, instagram: IconInstagram }

/** Two founder cards, tilted apart and straightening slightly on hover. */
export function TeamContact() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-black px-8 pb-28 pt-[74px]">
      <Reveal className="flex w-full flex-col items-center gap-24">
        <div className="flex w-full flex-col items-center overflow-hidden">
          <h2 className="text-center font-lora text-[42px] font-bold leading-[42px] text-white md:text-[48px] md:leading-[67.2px] lg:text-[64px] lg:leading-[64px]">
            {TEAM.heading}
          </h2>
          <p className="text-center font-roboto text-[14px] font-light leading-[19.6px] text-white opacity-60 lg:text-[20px] lg:leading-7">
            {TEAM.sub}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {TEAM.members.map((m) => (
            <div
              key={m.name}
              className="group flex w-[280px] flex-col items-center gap-12 rounded-[10px] bg-[linear-gradient(180deg,rgb(31,31,31)_0%,rgb(22,22,22)_100%)] p-8 shadow-[-12px_12px_32px_0_rgba(7,0,0,0.6),-4px_4px_12px_0_rgba(0,0,0,0.5),inset_0_1px_2px_0_rgba(255,255,255,0.41)] transition-transform duration-300 ease-[cubic-bezier(.25,.46,.45,.94)]"
              style={{ transform: `rotate(${m.rotate}deg)` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translateY(-16px) rotate(${m.hoverRotate}deg)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${m.rotate}deg)`
              }}
            >
              <div className="flex w-[216px] flex-col items-center gap-4 overflow-hidden">
                <div className="h-[140px] w-[140px] overflow-hidden rounded-full">
                  <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex w-full flex-col items-center overflow-hidden">
                  <p className="font-lora text-[40px] font-light leading-[56px] text-white">{m.name}</p>
                  <p className="font-lora text-[12px] font-light leading-[16.8px] text-white opacity-40">{m.role}</p>
                </div>
              </div>
              <div className="flex w-[216px] items-center justify-center gap-4 overflow-hidden">
                {TEAM.links.map((link, i) => {
                  const Icon = ICONS[link.icon]
                  return (
                    <div key={link.label} className="flex items-center gap-4">
                      {i > 0 && <div className="h-[15px] w-px bg-white/15" />}
                      <a href={link.href} className="flex items-center gap-1" target="_blank" rel="noreferrer">
                        <Icon className="h-3 w-3 fill-white" />
                        <span className="font-roboto text-[14px] font-light leading-[16.8px] text-white opacity-40">
                          {link.label}
                        </span>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
