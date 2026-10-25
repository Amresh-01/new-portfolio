export interface ProjectLink {
  url: string;
  text: string;
  primary: boolean;
}

export interface ArchitectureNode {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  status: "Live" | "Building" | "Prototype";
  image: string;
  description: string;
  fullDescription: string;
  category: string[];
  techStack: string[];
  links: ProjectLink[];
  architecture?: ArchitectureNode[];
  whyBuilt?: string;
  challenges?: string[];
  lessons?: string[];
  metrics?: string[]; 
}

export const projects: Project[] = [
  {
    id: "graphsight",
    title: "GraphSight Pro",
    status: "Live",
    image: "/projects/graphsight.jpg",
    description: "Multi-agent memory tracer & knowledge graph visualizer with smart lexical overlap and diff analysis.",
    fullDescription: "GraphSight Pro is an open-source observability framework for complex multi-agent architectures (LangGraph, LlamaIndex, custom orchestrators). It translates multi-step agent runs into interactive knowledge graph representations, calculating lexical similarity between retrieved knowledge and generated answers to detect hallucinations and context usage in real time.",
    category: ["AI", "Observability", "Developer Tools"],
    techStack: ["Python", "PyPI", "LangGraph", "LlamaIndex", "React", "TypeScript", "FastAPI", "Docker"],
    links: [
      { url: "https://graphsight.amreshdev.me", text: "Visit Site", primary: true },
      { url: "https://github.com/Amresh-01/Graphsight", text: "GitHub", primary: false }
    ],
    architecture: [
      { label: "01 — Agent Execution Hook", detail: "LangGraph / LlamaIndex callback & tracer" },
      { label: "02 — Run Ingest Engine", detail: "Local file/memory serialization of steps" },
      { label: "03 — Overlap Analyzer", detail: "Sublinear TF + bigram phrase similarity scoring" },
      { label: "04 — FastAPI Backend", detail: "Serving traces, runs, and graph diffs" },
      { label: "05 — Interactive Canvas", detail: "React Force Graph with score threshold filtering" }
    ],
    whyBuilt: "When building complex agents, knowing whether an agent hallucinated or genuinely used its retrieved context is nearly impossible without manual prompt debugging. I engineered GraphSight Pro to provide a clear, real-time visual knowledge graph of every decision an agent makes.",
    challenges: [
      "Designing unified tracing abstractions compatible across both LangGraph StateGraph and LlamaIndex workflows",
      "Computing real-time lexical overlap scores across large document corpora without introducing execution latency",
      "Rendering dynamic interactive DAG diffs with thousands of step nodes smoothly in the browser"
    ],
    lessons: [
      "Sublinear term frequency combined with bigram phrase extraction yields vastly superior signal for retrieved-vs-used detection than naive keyword counting.",
      "Developer tools must be plug-and-play: offering both a drop-in Python library (`pip install graphsight-pro`) and a zero-config CLI was crucial for adoption."
    ]
  },
  {
    id: "agentos",
    title: "AgentOS",
    status: "Building",
    image: "/projects/agentos.jpg", 
    description: "A self-hosted AI agent operating system for orchestrating autonomous workflows, tools, workers, and persistent memory.",
    fullDescription: "AgentOS is a robust, self-hosted platform designed to coordinate multiple specialized AI agents. Unlike simple chatbot wrappers, it operates on a Planner/Supervisor architecture, distributing tasks across dedicated worker queues while maintaining state through a unified memory layer. The system acts as the underlying infrastructure for autonomous AI workflows.",
    category: ["AI", "Backend", "Infrastructure"],
    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Celery", "Docker"],
    links: [
      { url: "https://github.com/Amresh-01", text: "GitHub", primary: true }
    ],
    architecture: [
      { label: "01 — Next.js Web App", detail: "Control panel and workflow monitoring" },
      { label: "02 — FastAPI Gateway", detail: "High-performance API boundary" },
      { label: "03 — Supervisor", detail: "State management and routing" },
      { label: "04 — Planner", detail: "Task decomposition" },
      { label: "05 — Specialized Agents", detail: "Domain-specific execution" },
      { label: "06 — Worker Queue", detail: "Celery-based distributed jobs" },
      { label: "07 — Memory Layer", detail: "pgvector semantic storage" }
    ],
    whyBuilt: "I needed a way to orchestrate complex, multi-step AI tasks that transcend a single context window. Existing frameworks were either too rigid or designed as opaque SaaS products. I built AgentOS to fully own the execution layer, memory, and observability.",
    challenges: [
      "Subprocess and distributed job failures in Celery",
      "Ensuring transactional consistency between long-running LLM calls and the database",
      "Maintaining state and memory coherence across independent agent boundaries",
      "Building a reliable observability pipeline for non-deterministic AI outputs"
    ],
    lessons: [
      "Decoupling the planning phase from execution significantly reduces hallucination cascading.",
      "Vector search alone is insufficient for memory; combining it with structured SQL metadata yields much higher retrieval precision."
    ]
  },
  {
    id: "loadforge",
    title: "LoadForge",
    status: "Building",
    image: "/projects/loadzen.png", // Using the loadzen image previously established
    description: "Self-hosted API load testing with real-time performance metrics and AI-assisted bottleneck diagnosis.",
    fullDescription: "LoadForge brings enterprise-grade load testing to a self-hosted environment. It orchestrates k6 load generators via distributed BullMQ workers, capturing live telemetry and storing it in PostgreSQL. After a run, an integrated AI layer analyzes the time-series data to diagnose bottlenecks, identifying whether the issue lies in connection pooling, DB locks, or application logic.",
    category: ["Backend", "Infrastructure", "DevOps", "AI"],
    techStack: ["TypeScript", "Next.js", "Fastify", "Redis", "BullMQ", "PostgreSQL", "Drizzle", "k6", "Docker"],
    links: [
      { url: "https://github.com/Amresh-01", text: "GitHub", primary: true }
    ],
    architecture: [
      { label: "01 — Next.js Console", detail: "Test configuration & live dashboard" },
      { label: "02 — Backend API", detail: "Fastify service for test coordination" },
      { label: "03 — Redis / Job Queue", detail: "BullMQ test scheduling" },
      { label: "04 — Worker", detail: "Job consumption & container execution" },
      { label: "05 — k6 Load Generator", detail: "Subprocess high-throughput load generation" },
      { label: "06 — PostgreSQL Metrics Store", detail: "Time-series result persistence" },
      { label: "07 — AI Diagnosis", detail: "Post-run bottleneck analysis" }
    ],
    whyBuilt: "Every load testing tool I tried was either too heavy — enterprise software requiring days of setup — or too light — a shell script that hits a URL and returns average latency. I wanted something that you could self-host in minutes and that gives you real, production-quality signal about what breaks under load and why.",
    challenges: [
      "Subprocess orchestration and preventing zombie k6 processes on worker crash",
      "Managing massive influxes of time-series data during high-throughput tests",
      "Queue recovery and state management during Redis node restarts"
    ],
    lessons: [
      "Spawning native subprocesses requires robust defensive programming around signal handling and stream piping.",
      "AI evaluation of time-series data requires summarizing metrics into statistical percentiles before prompting, rather than sending raw points."
    ]
  },
  {
    id: "pulsewatch",
    title: "PulseWatch",
    status: "Building",
    image: "/projects/betteruptime.png", 
    description: "A self-hosted uptime monitoring and incident management platform for developers and small engineering teams.",
    fullDescription: "PulseWatch is an observability platform built around a robust distributed worker pipeline. It schedules continuous URL probes, manages complex incident state transitions with hysteresis, and dispatches multi-channel alerts. The architecture guarantees high-availability polling without relying on external SaaS providers.",
    category: ["Backend", "Infrastructure", "Observability"],
    techStack: ["Next.js", "TypeScript", "Node.js", "Redis Streams", "PostgreSQL", "Prisma", "Docker", "Resend"],
    links: [
      { url: "https://github.com/Amresh-01", text: "GitHub", primary: true }
    ],
    architecture: [
      { label: "01 — Dashboard", detail: "Next.js UI for status pages and metrics" },
      { label: "02 — Scheduler", detail: "Cron-based heartbeat trigger" },
      { label: "03 — Redis Streams", detail: "Distributed, reliable job queue" },
      { label: "04 — Monitoring Workers", detail: "Global HTTP/TCP probe executors" },
      { label: "05 — PostgreSQL", detail: "Historical latency and incident logs" },
      { label: "06 — Incident Engine", detail: "State machine for failure handling" },
      { label: "07 — Alert Engine", detail: "Webhook and email dispatch" }
    ],
    whyBuilt: "Reliability monitoring shouldn't require sending internal API layouts to third-party services. I wanted to build an incident management system from first principles to deeply understand distributed job processing, state machines, and reliable alerting.",
    challenges: [
      "Building a distributed job pipeline using Redis Streams that guarantees at-least-once delivery",
      "Incident state machine hysteresis: distinguishing between a temporary network blip and a hard failure to prevent alert fatigue",
      "Handling monitoring worker node failures seamlessly"
    ],
    lessons: [
      "Reliability in a monitoring system is recursive — the tool that watches your uptime has to be more reliable than the things it watches.",
      "Redis Streams consumer groups provide an incredibly robust primitive for reliable worker pipelines compared to standard Pub/Sub."
    ]
  },
  {
    id: "graphmind",
    title: "GraphMind",
    status: "Prototype",
    image: "/projects/graphmind.jpg", // Ensure this exists or fallback
    description: "An AI-powered knowledge system that transforms unstructured documents into connected, queryable knowledge.",
    fullDescription: "GraphMind bridges the gap between raw text and structured intelligence. Rather than relying purely on vector similarity, it extracts entities and relationships to construct a queryable knowledge graph. By combining vector search with graph traversal (Hybrid Retrieval), it provides evidence-backed reasoning that is highly resistant to hallucinations.",
    category: ["AI", "Knowledge Graph"],
    techStack: ["Next.js", "FastAPI", "Python", "PostgreSQL", "pgvector", "Neo4j", "Redis", "Docker"],
    links: [
      { url: "https://github.com/Amresh-01", text: "GitHub", primary: true }
    ],
    architecture: [
      { label: "01 — Documents", detail: "Raw unstructured input ingestion" },
      { label: "02 — Parsing & Chunking", detail: "Semantic boundaries detection" },
      { label: "03 — Extraction", detail: "LLM-driven entity and relationship mapping" },
      { label: "04 — Knowledge Graph", detail: "Neo4j relational structure" },
      { label: "05 — Vector Search", detail: "pgvector semantic embeddings" },
      { label: "06 — Hybrid Retrieval", detail: "Graph + Vector scoring" },
      { label: "07 — LLM Reasoning", detail: "Synthesizing evidence-backed answers" }
    ],
    whyBuilt: "Standard RAG (Retrieval-Augmented Generation) fails on complex reasoning tasks because it lacks understanding of global relationships between concepts. I conceptualized GraphMind to solve the 'multi-hop' reasoning problem by explicitly defining relationships in a graph database.",
    challenges: [
      "Accurately extracting strict semantic triplets (Subject-Predicate-Object) from messy text",
      "Balancing latency between Neo4j graph traversal and PostgreSQL vector search",
      "Evaluating the accuracy of AI-generated answers against the original source documents"
    ],
    lessons: [
      "Hybrid retrieval (Graph + Vector) dramatically outperforms pure vector search when answering questions that require synthesizing information across multiple documents."
    ]
  },
  {
    id: "canteeno",
    title: "Canteeno",
    status: "Live",
    image: "/projects/canteeno.jpg", // Add fallback if needed
    description: "A full-stack backend application handling high-concurrency food ordering and cafeteria management.",
    fullDescription: "Canteeno is a live production system designed to process university cafeteria orders efficiently. It handles user authentication, live inventory management, transactional order processing, and real-time status updates via a decoupled API architecture.",
    category: ["Full Stack", "Backend"],
    techStack: ["Node.js", "Express", "MongoDB", "Redis", "REST APIs", "React", "Docker", "AWS"],
    links: [
      { url: "https://canteeno-peach.vercel.app/", text: "Visit Site", primary: true },
      { url: "https://github.com/Amresh-01", text: "GitHub", primary: false }
    ],
    whyBuilt: "Cafeteria lines were a massive bottleneck causing students to waste time. The goal was to build a system that could handle burst traffic during lunch hours without dropping orders or miscalculating inventory.",
    challenges: [
      "Database consistency during high-concurrency concurrent order placements",
      "Caching menu inventory in Redis while ensuring checkout validates against the source of truth",
      "Designing a robust REST API capable of serving multiple client interfaces"
    ],
    lessons: [
      "Caching is critical for read-heavy operations, but state mutation (like checkout) must always fall back to ACID transactions."
    ]
  },
  {
    id: "healthcareai",
    title: "HealthcareAI",
    status: "Live",
    image: "/projects/healthcare.jpg", 
    description: "An AI-assisted healthcare platform featuring a RAG-based MediBot, NLP symptom analysis, and XGBoost disease prediction.",
    fullDescription: "HealthcareAI bridges modern web architecture with machine learning integration. It provides a robust patient-doctor ecosystem, featuring a symptom-search module backed by NLP and an XGBoost prediction service, alongside a RAG-based MediBot to offer preliminary health insights before consultations.",
    category: ["AI", "Full Stack", "ML"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Redis", "XGBoost", "NLP", "RAG", "REST APIs"],
    links: [
      { url: "https://healhcare-ai.vercel.app/", text: "Visit Site", primary: true },
      { url: "https://github.com/Amresh-01/HealthcareAi", text: "GitHub", primary: false }
    ],
    whyBuilt: "To create an accessible entry point for patients to evaluate their symptoms and immediately route them to appropriate medical professionals within the same platform.",
    challenges: [
      "Integrating a separate ML prediction microservice with the main Node.js backend",
      "Structuring symptom search to be fast and forgiving of typos",
      "State management across complex patient booking flows"
    ],
    lessons: [
      "Decoupling the ML inference engine from the core API prevented long-running predictions from blocking standard web requests."
    ]
  },
  {
    id: "cinespot",
    title: "CineSpot",
    status: "Live",
    image: "/projects/cinespot.jpg",
    description: "An enterprise-ready 3D cinema ticket booking system featuring realistic auditorium sightline simulation and zero-double-booking guarantees.",
    fullDescription: "CineSpot is a full-stack movie ticket reservation platform built with an emphasis on real-time concurrency control, atomic seat reservation guarantees, and a realistic 3D cinema auditorium simulator built with Three.js and React Three Fiber. Customers can explore movie showtimes, view the auditorium in full 3D, and click any of the 80 physical seats to preview the exact seated vantage and sightline looking directly at the live playing movie projection.",
    category: ["Full Stack", "Backend", "3D Web", "Concurrency"],
    techStack: ["React", "TypeScript", "Three.js", "React Three Fiber", "Node.js", "Express", "PostgreSQL", "Prisma", "Docker"],
    links: [
      { url: "https://cinespot.amreshdev.me/", text: "Visit Site", primary: true },
      { url: "https://github.com/Amresh-01/Movie-ticket", text: "GitHub", primary: false }
    ],
    architecture: [
      { label: "01 — React / R3F Canvas", detail: "80 physical cushioned 3D chairs with stadium risers" },
      { label: "02 — Sightline Camera Engine", detail: "Smooth camera transitions to eye-level seat perspective" },
      { label: "03 — Express API Gateway", detail: "Stateless JWT auth and showtime collision checks" },
      { label: "04 — Concurrency Guard", detail: "PostgreSQL pessimistic locks (SELECT FOR UPDATE)" },
      { label: "05 — Deadlock Prevention", detail: "Deterministic alphabetical seatId sorting before lock" },
      { label: "06 — 5-Min Hold Worker", detail: "Automated lock expiration and release pipeline" }
    ],
    whyBuilt: "High-demand ticket reservation systems frequently suffer from race conditions where two users book the same seat simultaneously. I built CineSpot to prove zero double-booking under extreme concurrent load while providing an immersive 3D seat preview.",
    challenges: [
      "Preventing database deadlocks when multiple concurrent users attempt to hold overlapping sets of seats in differing order",
      "Rendering an 80-seat realistic 3D cinema environment with stadium lighting, dynamic video playback, and smooth 60 FPS performance",
      "Maintaining atomic 5-minute seat holds across simulated payment failures and retries"
    ],
    lessons: [
      "Sorting resource IDs deterministically before acquiring pessimistic row locks completely eliminates deadlock conditions in high-concurrency booking engines.",
      "Optimizing 3D geometry instances and materials is critical to keeping browser framerates high on mobile devices."
    ]
  }
];
