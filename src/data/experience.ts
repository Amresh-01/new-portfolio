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
    company: "Valoron Consulting",
    period: "Aug 2026 — Present",
    bullets: [
    "Building Fanito, an AI-powered social platform, across frontend, backend, data, and AI-driven product workflows",
    "Designing and implementing feed-ranking systems that combine user behavior, content signals, engagement, and author diversity to improve content relevance",
    "Developing AI-powered features including Economic Health Score and Smart Task Assignment with production-oriented backend workflows",
    "Engineering the platform on Supabase with PostgreSQL, authentication, APIs, and scalable data-driven architecture",
  ],
  },
  {
    role: "Open Source Contributor",
    company: "InsForge",
    period: "2026",
    bullets: [
      "Contributed to the InsForge codebase by identifying and resolving dependency security issues in the frontend stack",
      "Upgraded react-router-dom and validated the changes through the project's type-checking and build workflows",
      "Opened and maintained a pull request focused on improving dependency health and repository stability",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Robocurve",
    period: "2026",
    bullets: [
      "Contributed production-focused fixes and improvements to Robocurve's open-source codebase",
      "Worked within an existing engineering workflow, debugging issues, implementing changes, and validating contributions through pull requests",
    ],
  },
   {
    role: "Open Source Contributor",
    company: "API Dash",
    period: "2026",
    bullets: [
      "Contributed engineering improvements to API Dash, an open-source API development and testing platform",
      "Worked within the existing codebase and contribution workflow to implement, test, and submit maintainable changes",
    ],
  },
];