import { A } from "./assets"

export const NAV = [
  { label: "Services", href: "/#services" },
  { label: "Featured Work", href: "/#work" },
  { label: "Reviews", href: "/#reviews" },
]

export const CTA = { label: "Get In Touch", href: "mailto:hello@blue.studio" }

export const HERO = {
  lines: ["Imagine the moment", "between concept & reality."],
  sub: "This is the space we shape.",
  hint: "Scroll to Explore",
  place: "CHENGDU",
  timeZone: "Asia/Shanghai",
}

// One paragraph; it reflows per breakpoint.
export const STATEMENT =
  "Your ambition drives you to build what matters. Our focus is crafting the brand identity, narrative, and digital experience that makes it unforgettable."

export const TICKER_LOGOS = [A.logo5, A.logo4, A.logo3, A.logo2, A.logo1]

export const JOURNEY = {
  heading: "Where are you in your journey?",
  blurb:
    "If you’re navigating a new business unit, or a new venture entirely, or breaking into a new market",
  cards: [
    {
      title: ["Going", "Zero to One"],
      photo: A.journeyLeft,
      // Each slice hugs the edge it shares with its neighbour so the three
      // panels read as one photograph in the opening stage.
      crop: "100% 50%",
      face: "linear-gradient(165deg, rgb(199,199,199) 0%, rgb(131,131,131) 100%)",
      inset: "inset 0 2px 2px 0 rgb(255,255,255)",
      ink: "#060606",
      icon: "trend",
    },
    {
      title: ["Scale from", "Zero to N"],
      photo: A.journeyCenter,
      crop: "50% 50%",
      face: "linear-gradient(117deg, rgb(216,241,244) 0%, rgb(33,122,183) 43.18%, rgb(6,62,125) 100%)",
      inset: "inset 0 2px 2px 0 rgb(206,231,235)",
      ink: "#ffffff",
      icon: "dots",
    },
    {
      title: ["Need Quick", "Solutions"],
      photo: A.journeyRight,
      crop: "0% 50%",
      face: "linear-gradient(180deg, rgb(82,82,82) 0%, rgb(22,22,22) 100%)",
      inset: "inset 0 2px 2px 0 rgba(255,255,255,0.3)",
      ink: "#ffffff",
      icon: "wand",
    },
  ],
} as const

export const SERVICES = {
  heading: ["With", "our services"],
  sub: ["We help you achieve more at every stage", "of business growth"],
  cta: { label: "Build Your Vision With Us", href: "mailto:hello@blue.studio" },
  rows: [
    {
      no: "(01)",
      title: "Brand Strategy",
      items: [
        "Brand Positioning",
        "Logo Design",
        "Brand Guidelines",
        "PitchDecks",
        "Packaging Design",
        "Brand Revamps",
      ],
      image: A.svcBrand,
    },
    {
      no: "(02)",
      title: "Websites",
      items: [
        "Website Design & Development",
        "Web Apps & Platforms",
        "Web Revamps",
        "Conversion Rate Optimisations",
        "Search Engine Optimisation (SEO)",
        "Website Management",
      ],
      image: A.svcWebsite,
    },
    {
      no: "(03)",
      title: "Product Design",
      items: [
        "User Research & Analysis",
        "UX Audits",
        "MVP Planning & Design",
        "UI Design & Prototyping",
        "Product Management",
      ],
      image: A.svcProduct,
    },
    {
      no: "(04)",
      title: "AI-Powered Solutions",
      items: [
        "AI Applications",
        "Agentic AI Orchestration",
        "SaaS Products",
        "AI Chatbots",
        "AI Automations",
        "Intelligent Integrations",
      ],
      image: A.svcAi,
    },
    {
      no: "(05)",
      title: "Motion Design",
      items: [
        "Motion Graphics",
        "Explainer Videos",
        "Brand Launch Videos",
        "Interactive Presentations",
      ],
      image: A.svcMotion,
    },
  ],
}

export const WORKS_HEADING = {
  title: "Featured works",
  sub: "We’ve transformed bold ideas into tangible realities",
}

export const TRUSTED = {
  heading: "Trusted by Revolutionary Startups & Global Organizations",
  logos: [
    A.logo1, A.logo2, A.logoMomo, A.logoShield, A.logo3, A.logo4,
    A.logo5, A.logo1, A.logoNoon, A.logo2, A.logoNoon, A.logoBolt,
    A.logo4, A.logoBolt, A.logo3, A.logoBolt, A.logo3, A.logoNoon,
    A.logo3, A.logo4, A.logoNoon, A.logo4, A.logo3, A.logo4,
  ],
}

export const TESTIMONIALS = {
  heading: ["Hear", "from", "our partners"],
  sub: "With over 60 clients served, here's what they have to say",
  quote:
    '"Your contribution has been very valuable to us, hope you know how important you are to the team. All the ruckus in absence proved it, haha!"',
  name: "Jason Wu",
  role: "Founder & Influencer, 650k+ Followers",
  // The compact layout uses its own crops and a single wordmark.
  items: [
    { photo: A.face1, logo: A.logo2, small: A.small1, smallLogo: A.smallLogo },
    { photo: A.face2, logo: A.logo1, small: A.small2, smallLogo: A.smallLogo },
    { photo: A.face3, logo: A.logo3, small: A.small3, smallLogo: A.logo2 },
    { photo: A.face4, logo: A.logo4, small: A.small4, smallLogo: A.logo1 },
    { photo: A.face5, logo: A.logo5, small: A.small5, smallLogo: A.smallLogo },
  ],
}

export const STATS = [
  {
    prefix: "0",
    target: 8,
    label: "Years of Experience",
    body: "Our playbook for untangling complex challenges is simple: Diagnose, Build, and Scale. We've applied it to help teams of all sizes unlock growth and drive revenue.",
    compactBody: "text-[12px] leading-[16.8px]",
  },
  {
    prefix: "",
    target: 80,
    label: "Projects Delivered",
    body: "We architect and engineer robust, scalable digital solutions, guiding our clients from initial MVP to full-fledged enterprise platforms with strategic clarity and technical excellence.",
    compactBody: "text-[13px] leading-[18.2px]",
  },
  {
    prefix: "",
    target: 20,
    label: "Industries Impacted",
    body: "Our unique advantage? A cross-disciplinary mindset. We connect proven patterns from AI, fintech, gaming, and more to solve your challenges with unmatched perspective.",
    compactBody: "text-[13px] leading-[18.2px]",
  },
]

export const TEAM = {
  heading: "Get in touch with us",
  sub: "Tell us where you are — we usually reply within one business day.",
  members: [
    {
      name: "Echo",
      role: "Co-Founder, Head of Marketing",
      photo: A.echo,
      rotate: -6,
      hoverRotate: -4,
    },
    {
      name: "Lily",
      role: "Co-Founder, Head of Design",
      photo: A.lily,
      rotate: 4,
      hoverRotate: 5,
    },
  ],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" as const },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" as const },
  ],
}

export const FOOTER = {
  kicker: "This is our story.",
  headline: "Let's start writing yours.",
  cta: { label: "Get In Touch", href: "mailto:hello@blue.studio" },
  copyright: "© 2025 blue. | All Rights Reserved.",
  email: { label: "hello@blue.studio", href: "mailto:hello@blue.studio" },
  links: [
    { label: "Services", href: "/#services" },
    { label: "Featured Work", href: "/#work" },
    { label: "Testimonials", href: "/#reviews" },
  ],
}
