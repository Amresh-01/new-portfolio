export type ProductStackItem = {
  label: string;
  icon?: string;
  /** Invert monochrome logos (e.g. Next.js, Vercel) on light backgrounds. */
  invert?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  status: string;
  liveUrl?: string;
  githubUrl: string;
  coverImage: string;
  stack: ProductStackItem[];
  problem: string;
  approach: string;
  outcomes: string[];
};

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const products: Product[] = [
  {
    slug: 'canteeno',
    name: 'Canteeno',
    tagline: 'High-concurrency food ordering',
    summary:
      'A full-stack backend application handling high-concurrency food ordering and cafeteria management with decoupled API architecture.',
    year: '2024',
    status: 'Live',
    liveUrl: 'https://canteeno-peach.vercel.app/',
    githubUrl: 'https://github.com/Amresh-01',
    coverImage: '/projects/canteeno.jpg',
    stack: [
      { label: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
      { label: 'Express', icon: `${DEVICON}/express/express-original.svg`, invert: true },
      { label: 'MongoDB', icon: `${DEVICON}/mongodb/mongodb-original.svg` },
      { label: 'React', icon: `${DEVICON}/react/react-original.svg` },
      { label: 'Redis', icon: `${DEVICON}/redis/redis-original.svg` }
    ],
    problem:
      'Cafeteria lines were a massive bottleneck causing students to waste time during burst traffic lunch hours.',
    approach:
      'Built a robust REST API capable of handling multiple concurrent clients, caching inventory in Redis, and executing ACID checkout transactions in MongoDB.',
    outcomes: [
      'Processed university cafeteria orders efficiently during burst traffic without dropping orders.',
      'Maintained strict database consistency during high-concurrency concurrent order placements.',
      'Managed live inventory with a Redis cache fallback to ACID transactions for state mutation.'
    ],
  },
  {
    slug: 'healthcareai',
    name: 'HealthcareAI',
    tagline: 'AI-assisted healthcare platform',
    summary:
      'Features a RAG-based MediBot, NLP symptom analysis, and XGBoost disease prediction within a unified patient-doctor ecosystem.',
    year: '2024',
    status: 'Live',
    liveUrl: 'https://healhcare-ai.vercel.app/',
    githubUrl: 'https://github.com/Amresh-01/HealthcareAi',
    coverImage: '/projects/healthcare.jpg',
    stack: [
      { label: 'React', icon: `${DEVICON}/react/react-original.svg` },
      { label: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
      { label: 'MongoDB', icon: `${DEVICON}/mongodb/mongodb-original.svg` },
      { label: 'Redis', icon: `${DEVICON}/redis/redis-original.svg` }
    ],
    problem:
      'Patients needed an accessible entry point to evaluate their symptoms and immediately route them to appropriate medical professionals within the same platform.',
    approach:
      'Integrated a separate ML prediction microservice (XGBoost/NLP) with a main Node.js backend. Provided a symptom-search module and RAG-based MediBot.',
    outcomes: [
      'Decoupled the ML inference engine from the core API, preventing long-running predictions from blocking standard web requests.',
      'Structured fast and typo-forgiving symptom search capabilities.',
      'Managed complex patient booking flow state management.'
    ],
  },
  {
    slug: 'agentos',
    name: 'AgentOS',
    tagline: 'Self-hosted AI agent operating system',
    summary:
      'A robust platform for orchestrating autonomous workflows, tools, workers, and persistent memory using a Planner/Supervisor architecture.',
    year: '2026',
    status: 'Building',
    githubUrl: 'https://github.com/Amresh-01',
    coverImage: '/projects/agentos.jpg',
    stack: [
      { label: 'Next.js', icon: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
      { label: 'Python', icon: `${DEVICON}/python/python-original.svg` },
      { label: 'FastAPI', icon: `${DEVICON}/fastapi/fastapi-original.svg` },
      { label: 'Postgres', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
      { label: 'Redis', icon: `${DEVICON}/redis/redis-original.svg` },
      { label: 'Docker', icon: `${DEVICON}/docker/docker-original.svg` }
    ],
    problem:
      'I needed a way to orchestrate complex, multi-step AI tasks that transcend a single context window. Existing frameworks were either too rigid or designed as opaque SaaS products.',
    approach:
      'I built AgentOS to fully own the execution layer, memory, and observability. It operates on a Planner/Supervisor architecture, distributing tasks across dedicated worker queues while maintaining state through a unified memory layer.',
    outcomes: [
      'Decoupled planning phase from execution significantly reduces hallucination cascading.',
      'Combined vector search with structured SQL metadata yielding much higher retrieval precision.',
      'Built a reliable observability pipeline for non-deterministic AI outputs.'
    ],
  },
  {
    slug: 'loadforge',
    name: 'LoadForge',
    tagline: 'Self-hosted API load testing',
    summary:
      'Enterprise-grade API load testing with real-time performance metrics and AI-assisted bottleneck diagnosis orchestrating k6 load generators via distributed workers.',
    year: '2026',
    status: 'Building',
    githubUrl: 'https://github.com/Amresh-01',
    coverImage: '/projects/loadforge.jpg',
    stack: [
      { label: 'Next.js', icon: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
      { label: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg` },
      { label: 'Redis', icon: `${DEVICON}/redis/redis-original.svg` },
      { label: 'Postgres', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
      { label: 'Docker', icon: `${DEVICON}/docker/docker-original.svg` }
    ],
    problem:
      'Every load testing tool I tried was either too heavy — enterprise software requiring days of setup — or too light — a shell script that hits a URL and returns average latency.',
    approach:
      'Built a platform you can self-host in minutes that gives real, production-quality signal about what breaks under load. It orchestrates k6 load generators via BullMQ workers and uses an integrated AI layer to analyze time-series data and diagnose bottlenecks.',
    outcomes: [
      'Managed massive influxes of time-series data during high-throughput tests.',
      'Implemented AI evaluation of time-series data by summarizing metrics into statistical percentiles before prompting.',
      'Built robust defensive programming for native subprocesses signal handling.'
    ],
  },
  {
    slug: 'pulsewatch',
    name: 'PulseWatch',
    tagline: 'Incident management platform',
    summary:
      'A self-hosted uptime monitoring and incident management platform for developers and small engineering teams built around a robust distributed worker pipeline.',
    year: '2026',
    status: 'Building',
    githubUrl: 'https://github.com/Amresh-01',
    coverImage: '/projects/pulsewatch.jpg',
    stack: [
      { label: 'Next.js', icon: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
      { label: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
      { label: 'Redis', icon: `${DEVICON}/redis/redis-original.svg` },
      { label: 'Postgres', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
      { label: 'Docker', icon: `${DEVICON}/docker/docker-original.svg` }
    ],
    problem:
      'Reliability monitoring shouldn\'t require sending internal API layouts to third-party services.',
    approach:
      'Built an incident management system from first principles to deeply understand distributed job processing, state machines, and reliable alerting using Redis Streams.',
    outcomes: [
      'Built a distributed job pipeline using Redis Streams that guarantees at-least-once delivery.',
      'Designed an incident state machine hysteresis to distinguish temporary network blips from hard failures.',
      'Handled global HTTP/TCP probe executors gracefully seamlessly across node failures.'
    ],
  },
  {
    slug: 'graphmind',
    name: 'GraphMind',
    tagline: 'AI-powered knowledge system',
    summary:
      'Transforms unstructured documents into connected, queryable knowledge using a Hybrid Retrieval (Graph + Vector) reasoning system.',
    year: '2025',
    status: 'Prototype',
    githubUrl: 'https://github.com/Amresh-01',
    coverImage: '/projects/graphmind.jpg',
    stack: [
      { label: 'Next.js', icon: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
      { label: 'FastAPI', icon: `${DEVICON}/fastapi/fastapi-original.svg` },
      { label: 'Python', icon: `${DEVICON}/python/python-original.svg` },
      { label: 'Postgres', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
      { label: 'Neo4j', icon: `${DEVICON}/neo4j/neo4j-original.svg` }
    ],
    problem:
      'Standard RAG (Retrieval-Augmented Generation) fails on complex reasoning tasks because it lacks understanding of global relationships between concepts.',
    approach:
      'Conceptualized a solution to the \'multi-hop\' reasoning problem by explicitly defining relationships in a graph database, combined with pgvector for Hybrid Retrieval.',
    outcomes: [
      'Successfully extracted strict semantic triplets (Subject-Predicate-Object) from messy text.',
      'Proved that Hybrid retrieval (Graph + Vector) dramatically outperforms pure vector search for multi-hop synthesis.'
    ],
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map(p => p.slug);
}
