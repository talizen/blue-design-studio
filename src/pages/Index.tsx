import { useRef } from "react"
import { listContents } from "../lib/talizen/cms"
import type { InferGetServerSidePropsType } from "../lib/talizen/types"
import type { Works } from "../types/cms"
import { FeaturedWorks, type WorkItem } from "../components/FeaturedWorks"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Journey } from "../components/Journey"
import { Services } from "../components/Services"
import { SiteFooter } from "../components/SiteFooter"
import { SmoothScroll } from "../components/motion"
import { Statement } from "../components/Statement"
import { Stats } from "../components/Stats"
import { TeamContact } from "../components/TeamContact"
import { Testimonials } from "../components/Testimonials"
import { TrustedLogos } from "../components/TrustedLogos"

export async function getServerSideProps() {
  const content = await listContents<Works>("works", { limit: 20, offset: 0 })
  const works: WorkItem[] = (content?.list ?? []).map((item) => {
    const cover = item.body?.cover as unknown
    return {
      title: item.body?.title ?? "",
      cover: typeof cover === "string" ? cover : ((cover as { url?: string })?.url ?? ""),
      tags: item.body?.tags ?? [],
    }
  })
  return { props: { works } }
}

export default function Index({ works }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const statementRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full overflow-x-clip bg-black">
      <SmoothScroll />
      <Header />
      <Hero scrubTrigger={statementRef} />
      {/* These three bands sit in one column with a 16px rhythm. */}
      <div className="flex w-full flex-col gap-4">
        <div ref={statementRef}>
          <Statement />
        </div>
        <Journey />
        <Services />
      </div>
      <FeaturedWorks items={works} />
      <TrustedLogos />
      <Testimonials />
      <Stats />
      <TeamContact />
      <SiteFooter />
    </div>
  )
}
