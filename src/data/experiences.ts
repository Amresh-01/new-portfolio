export type ExperienceTech = {
  label: string;
  icon?: string;
};

export type ExperienceContribution = {
  title: string;
  description: string;
  bounty?: string;
  badge?: string;
  link?: string;
  githubRepos?: string[];
  pullRequests?: { title: string; link: string }[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description?: string;
  logo: string;
  link: string;
  totalPRs?: string;
  totalBounties?: string;
  techStack: ExperienceTech[];
  contributions: ExperienceContribution[];
  badge?: string;
  highlights?: string[];
  isCurrent?: boolean;
  featured?: boolean;
  reposPrivate?: boolean;
  compensationDetailsImage?: string;
  mergedPRsRepo?: string;
  careerMergedPRs?: string;
  location?: string;
  isYc?: boolean;
};

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const experiences: Experience[] = [
  {
    company: 'Valoron Consulting',
    role: 'AI Native Full Stack Developer',
    period: 'Aug 2026 — Present',
    isCurrent: true,
    featured: true,
    logo: 'valoron.svg',
    link: '#', // Add actual link if available
    techStack: [
      { label: 'Next.js', icon: `${DEVICON}/nextjs/nextjs-original.svg` },
      { label: 'Supabase', icon: `${DEVICON}/supabase/supabase-original.svg` },
      { label: 'Postgres', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
    ],
    highlights: [
      'Building Fanito, an AI-powered social platform, across frontend, backend, data, and AI-driven product workflows',
      'Designing and implementing feed-ranking systems that combine user behavior, content signals, engagement, and author diversity',
      'Developing AI-powered features including Economic Health Score and Smart Task Assignment',
      'Engineering the platform on Supabase with PostgreSQL, authentication, APIs, and scalable architecture'
    ],
    contributions: [
      {
        title: 'Fanito Platform Architecture',
        description: 'Engineered the core backend and data workflows for Fanito using Supabase and PostgreSQL to support scalable, AI-driven features.',
        badge: 'Architecture'
      },
      {
        title: 'AI Feature Development',
        description: 'Developed and shipped production-oriented workflows for Economic Health Score and Smart Task Assignment features.',
        badge: 'AI / Product'
      },
      {
        title: 'Feed-ranking Engine',
        description: 'Implemented algorithms that integrate user behavior, content signals, and engagement to significantly improve content relevance and feed diversity.',
        badge: 'Algorithms'
      }
    ]
  },
  {
    company: 'InsForge',
    role: 'Open Source Contributor',
    period: '2026',
    isYc: true,
    logo: 'insforge.svg',
    link: 'https://github.com/InsForge',
    totalPRs: '3',
    techStack: [
      { label: 'React', icon: `${DEVICON}/react/react-original.svg` },
      { label: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg` }
    ],
    contributions: [
      {
        title: 'Platform Infrastructure and Security',
        description: 'Contributed to the InsForge codebase with key fixes for Docker configuration, database backup permissions, and multi-admin support for the self-hosted dashboard.',
        badge: 'Open Source',
        githubRepos: ['InsForge/InsForge']
      }
    ]
  },
  {
    company: 'Robocurve',
    role: 'Open Source Contributor',
    period: '2026',
    isYc: true,
    logo: 'robocurve.svg',
    link: 'https://github.com/Robocurve',
    totalPRs: '3',
    techStack: [
      { label: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg` }
    ],
    contributions: [
      {
        title: 'Core Engine and Fixes',
        description: 'Contributed production-focused fixes to inspect-robots and Yam, including config error handling, fallback logic, and docs updates.',
        badge: 'Open Source',
        githubRepos: ['robocurve/inspect-robots', 'robocurve/inspect-robots-yam']
      }
    ]
  },
  {
    company: 'API Dash',
    role: 'Open Source Contributor',
    period: '2026',
    logo: 'Apidash.svg',
    link: 'https://github.com/APIDash',
    techStack: [
      { label: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` }
    ],
    contributions: [
      {
        title: 'Platform Enhancements',
        description: 'Contributed engineering improvements to API Dash, an open-source API development and testing platform, focusing on implementating and testing maintainable changes.',
        badge: 'Open Source'
      }
    ]
  },
  {
    company: 'Twenty',
    role: 'Open Source Contributor',
    period: '2026',
    isYc: true,
    logo: 'twentyhq.svg',
    link: 'https://github.com/twentyhq/twenty',
    totalPRs: '1',
    techStack: [
      { label: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg` },
      { label: 'React', icon: `${DEVICON}/react/react-original.svg` }
    ],
    contributions: [
      {
        title: 'Core Open Source Contribution',
        description: 'Contributed to Twenty, an open-source CRM platform. Implemented fixes and improvements that were successfully merged into the core codebase.',
        badge: 'Open Source',
        githubRepos: ['twentyhq/twenty']
      }
    ]
  }
];
