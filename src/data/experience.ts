export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "AI Native Full Stack Developer",
    company: "Dubai-based startup",
    period: "May 2026 — Present",
    bullets: [
      "Owning AI-native product surfaces end-to-end: Next.js interfaces, backend workflows, prompt/data contracts, and production LLM integrations",
      "Designing developer-facing systems where observability, eval loops, and fast iteration are part of the architecture from day one",
    ],
  },
  {
    role: "Software Engineer",
    company: "Sylus.ai",
    period: "Feb 2026 — Apr 2026",
    bullets: [
      "Shipped full-stack product flows across frontend, API, database, and deployment boundaries with direct ownership from spec to release",
      "Turned ambiguous AI product requirements into typed APIs, resilient backend flows, and measurable user-facing behavior",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "CrowdFeuz",
    period: "Feb 2025 — Oct 2025",
    location: "New Delhi",
    bullets: [
      "Built the core ticketing and booking system, including payment integration, event inventory, checkout state, and admin workflows",
      "Reduced operational friction by simplifying backend booking flows and tightening the user path from event discovery to confirmed payment",
    ],
  },
];
