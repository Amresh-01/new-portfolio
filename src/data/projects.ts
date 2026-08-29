export interface ProjectLink {
  url: string;
  text: string;
  primary: boolean;
}

export interface ProjectCaseStudy {
  why: string;
  useCase: string;
  learned: string;
  stuck: string;
}

export interface ProjectArchitectureStep {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  status: string;
  statusClass: string;
  image: string;
  description: string;
  fullDescription: string;
  metrics: string[];
  architecture?: ProjectArchitectureStep[];
  techStack: string[];
  links: ProjectLink[];
  caseStudy: ProjectCaseStudy;
  launchTweetUrl?: string;
  category: "systems" | "frontend" | "web3";
}

export const projects: Project[] = [
  {
    id: "chessable",
    title: "Chessable",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/chess.png",
    description: "Multiplayer chess with sub-100ms move sync, ranked matchmaking, and engine-backed analysis. Built for players who take the game seriously.",
    fullDescription: "A full-stack chess platform engineered around low-latency real-time play. WebSockets handle live move synchronization between players, Redis manages active game state and matchmaking queues, and chess.js enforces strict server-side move validation so the game state is always authoritative. The UI is intentionally minimal — no distractions, just the board, the clock, and the analysis panel. Deployed via Docker with a Turborepo monorepo structure to keep the frontend, server, and shared logic cleanly separated.",
    metrics: ["sub-100ms move sync", "server-authoritative validation", "Redis-backed matchmaking"],
    architecture: [
      { label: "Next.js Client", detail: "Board, clocks, analysis UI" },
      { label: "WebSocket Gateway", detail: "Ordered move events + reconnects" },
      { label: "Game Service", detail: "chess.js validation and timers" },
      { label: "Redis", detail: "Active games and matchmaking queues" },
      { label: "Docker Deploy", detail: "Frontend, server, shared logic" }
    ],
    techStack: ["TypeScript", "Next.js", "WebSockets", "Redis", "chess.js", "Tailwind CSS", "Turborepo", "Docker"],
    links: [
      { url: "https://chessable.space", text: "Visit Site", primary: true },
      { url: "https://github.com/Abhijitam01/chess", text: "GitHub", primary: false }
    ],
    caseStudy: {
      why: "Chess is a perfect stress test for real-time systems — every move has to arrive in order, at low latency, with no room for ambiguity. I wanted to build something where performance wasn't an afterthought but the entire design constraint.",
      useCase: "Players join ranked queues, play live multiplayer games with move timers, and review completed games with engine-backed annotations. The platform targets serious players who want speed and clarity over gamified noise.",
      learned: "Server authority is everything in multiplayer. Trusting the client for move validation feels fine until someone sends an illegal move. Centralizing game logic on the server and treating the client as a pure view eliminated an entire class of bugs.",
      stuck: "Keeping game state synchronized across unreliable connections was the hardest problem. A player dropping mid-game, then reconnecting, needs to see the exact board state without the server replaying the entire event log. Getting the reconnect reconciliation right took several redesigns."
    },
    category: "systems",
  },
  {
    id: "pinggod",
    title: "PingGod",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/betteruptime.png",
    description: "A self-hosted uptime monitoring platform. Add URLs, get alerted when they go down, track response times, manage incidents, and share public status pages.",
    fullDescription: "PingGod is a full-stack alternative to expensive SaaS uptime monitors — self-hosted, fully owned, and built for teams who want real control over their monitoring stack. A Pusher-powered scheduler ticks every 30 seconds, enqueuing monitored URLs into a Redis stream. A dedicated worker reads the stream, pings each URL, records status and response time to PostgreSQL, and automatically opens or closes incidents on state transitions. When something goes down, alerts fire via Resend email or generic HTTP webhooks with Slack-compatible payloads. The Next.js dashboard handles everything: adding monitors, viewing response time history, managing incidents, and generating shareable public status pages. Built as a Turborepo monorepo running on Bun for fast startup and lean scripts.",
    metrics: ["30s monitor cadence", "3-failure incident hysteresis", "Redis Streams worker pipeline"],
    architecture: [
      { label: "Next.js Dashboard", detail: "Monitors, incidents, status pages" },
      { label: "Scheduler", detail: "30-second URL enqueue loop" },
      { label: "Redis Streams", detail: "Durable check queue" },
      { label: "Worker", detail: "HTTP probes and state transitions" },
      { label: "PostgreSQL", detail: "Latency history and incidents" },
      { label: "Alerts", detail: "Resend email and webhooks" }
    ],
    techStack: ["TypeScript", "Next.js 15", "Express", "Bun", "Turborepo", "PostgreSQL", "Prisma", "Redis Streams", "Zod", "JWT", "Resend", "Tailwind CSS"],
    links: [
      { url: "https://pingGod.xyz", text: "Visit Site", primary: true },
      { url: "https://github.com/Abhijitam01/betterUptime", text: "GitHub", primary: false }
    ],
    caseStudy: {
      why: "Every uptime monitoring tool worth using costs money. The free tiers are too limited and the paid tiers are priced for enterprise. I wanted to build a genuinely complete alternative — one you could self-host, own entirely, and configure exactly how you want without a monthly bill.",
      useCase: "Developers and small teams monitoring their own APIs, web apps, and services. You get the full picture: live status, response time history, automatic incident tracking, and a public status page you can share with users — without handing your uptime data to a third-party SaaS.",
      learned: "Reliability in a monitoring system is recursive — the tool that watches your uptime has to be more reliable than the things it watches. I learned how much architectural discipline goes into building a worker pipeline that handles flaky networks, slow responses, and partial failures gracefully without producing false positives.",
      stuck: "Incident state management was the subtlest problem. Deciding when a site is 'down' versus temporarily slow, when to open an incident, and when to confidently close it required building hysteresis into the state machine — a single failed ping shouldn't page anyone, but three consecutive failures definitely should. Getting that threshold logic right without making it noisy took significant iteration."
    },
    category: "systems",
  },
  {
    id: "eyeswitch",
    title: "EyeSwitch",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/eyeswitch.png",
    description: "Control your computer with your eyes. EyeSwitch uses real-time gaze tracking to replace mouse navigation with hands-free, frictionless interaction.",
    fullDescription: "EyeSwitch rethinks the fundamental assumption behind human-computer interaction — that you need a keyboard or mouse to navigate software. Using TensorFlow.js for real-time facial landmark detection and the Canvas API for rendering feedback, it tracks gaze and translates it into navigation commands with minimal perceptible latency. The system is intentionally designed to disappear: when it works well, there's no interface — just intent and response. A lightweight CLI layer handles calibration and configuration without requiring a GUI wrapper.",
    metrics: ["real-time landmark tracking", "confidence-window smoothing", "CLI calibration flow"],
    techStack: ["TypeScript", "TensorFlow.js", "Node.js", "Canvas API", "CLI"],
    links: [
      { url: "https://eyeswitch.abhijitamdubey.site", text: "Visit Site", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    launchTweetUrl: "https://x.com/abhijitam_tw",
    caseStudy: {
      why: "I kept wondering what interaction looks like when you remove the physical layer entirely. Keyboards and mice are tools we've normalized — but they're not inevitable. EyeSwitch started as a genuine question: what if the only input required was attention?",
      useCase: "Valuable for accessibility research, HCI exploration, and environments where traditional input devices are impractical or unavailable. It demonstrates that gaze-based control can feel natural and responsive — not gimmicky — when the signal processing is done right.",
      learned: "Removing friction is architecturally harder than adding features. Every added affordance — a hover state, a transition, a confirmation prompt — is friction in disguise. The entire design had to be measured by a single question: does this make the interface more invisible?",
      stuck: "Raw gaze data is noisy. The difference between intentional focus and casual glance is milliseconds of signal pattern, not absolute position. Building a smoothing layer that felt responsive without feeling jittery required extensive tuning of prediction windows and confidence thresholds."
    },
    category: "frontend",
  },
  {
    id: "sketchable",
    title: "Sketchable",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/sketchy.png",
    description: "A hand-drawn-feel canvas for wireframes, diagrams, and quick visual thinking. Fast, distraction-free, and genuinely satisfying to draw with.",
    fullDescription: "Sketchable is a browser-based drawing tool that combines the immediacy of a whiteboard with a deliberate hand-drawn aesthetic powered by Rough.js. The Canvas API rendering loop is tuned for smooth, low-latency input — shapes appear as you draw them, not after. WebSockets enable real-time multiplayer collaboration, with board state persisted to PostgreSQL so sessions survive page refreshes. The interaction model is intentionally minimal: a small toolbar, a clean canvas, and shapes that feel like they were drawn by hand rather than generated by software.",
    metrics: ["60Hz canvas render loop", "dirty-region redraws", "persistent multiplayer boards"],
    techStack: ["TypeScript", "React", "Next.js", "WebSockets", "PostgreSQL", "Rough.js", "Tailwind CSS", "Canvas API"],
    links: [
      { url: "https://sketchable.space", text: "Visit Site", primary: true },
      { url: "https://github.com/Abhijitam01/sketchy", text: "GitHub", primary: false }
    ],
    caseStudy: {
      why: "I'd used Excalidraw enough to be curious about how it actually works under the hood. Building a canvas drawing tool from scratch seemed like the fastest way to understand rendering performance, input latency, and scene management at a level you can't get from reading code.",
      useCase: "Fast wireframes, architecture diagrams, and visual brainstorming. The hand-drawn aesthetic keeps things loose and collaborative — it signals that ideas are still in flux, which removes the pressure that comes with polished diagrams.",
      learned: "Canvas performance is all about minimizing unnecessary redraws. I learned to track dirty regions, batch paint calls, and use requestAnimationFrame correctly — and how each of those decisions compounds. A 5ms unnecessary repaint feels fine until you have 50 shapes and a 60Hz loop.",
      stuck: "Hit testing — determining which shape the cursor is over — sounds trivial until shapes overlap, have transparent fills, or sit on top of each other in non-obvious z-order. Naive bounding-box iteration breaks down fast. Building a proper scene graph with per-shape hit detection was the most technically demanding part of the project."
    },
    category: "frontend",
  },
  {
    id: "solana-atlas",
    title: "Solana Atlas",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/solana-atlas.png",
    description: "An interactive Solana developer playground. Inspect accounts, trace transactions, and experiment with on-chain program logic in a live visual environment.",
    fullDescription: "Solana Atlas is a developer tool that makes the internals of Solana programs visible and explorable. Rather than piecing together behavior from fragmented RPC responses and documentation, developers can inspect account data layouts, trace instruction execution, and simulate transaction flows in a single unified interface built on Web3.js and Anchor. The tool is designed around observability — surfacing the state that matters, in the order it matters, so Solana's execution model becomes intuitive rather than opaque. Useful for developers learning Solana fundamentals and for teams auditing or debugging deployed programs.",
    metrics: ["account-layout inspection", "transaction-flow tracing", "devnet simulation loop"],
    techStack: ["TypeScript", "Solana", "Anchor", "Web3.js", "React", "Developer Tools"],
    links: [
      { url: "https://solana-atlas.xyz", text: "Visit Site", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    caseStudy: {
      why: "Solana's programming model is genuinely different — accounts are separated from programs, instructions compose unexpectedly, and the runtime is strict about compute. Most documentation explains each concept in isolation. I built Solana Atlas to show how they fit together in a single interactive flow.",
      useCase: "Developers can inspect the layout of any account, trace how an instruction mutates state, analyze transaction composition, and test program behavior against devnet before deploying to mainnet. It's equally useful for beginners building intuition and for teams debugging a misbehaving program.",
      learned: "Designing for observability changes how you think about data. It's not enough to surface the right values — you have to surface them in the right context, in the right order, with enough surrounding state that the cause-and-effect is obvious. That discipline made me a better systems thinker.",
      stuck: "Solana RPC endpoints are inconsistent about what they return and when. A transaction that confirms on-chain may still return stale data from the same RPC call seconds later. Building a reliable UI on top of eventually-consistent network state required defensive data fetching and careful handling of loading states that don't lie to the user."
    },
    category: "web3",
  },
  {
    id: "vizzy",
    title: "Vizzy",
    status: "Building",
    statusClass: "badge-building",
    image: "/projects/vizzy.png",
    description: "Drag Route, Middleware, Handler, and Response blocks onto a canvas — Vizzy wires them together and generates a real, annotated Express server as you build.",
    fullDescription: "Vizzy is a visual learning tool that makes the Express.js request lifecycle tangible. Every endpoint is a linear chain of four block types — Route, Middleware, Handler, Response — and Vizzy makes that chain literal on a ReactFlow canvas. As you connect blocks with wires, a live code panel generates annotated server.js code in real time, with comments explaining req, res, and what each block does. Hit Export and you get a ready-to-run server.js and package.json. There's also a Run mode that animates a request traveling through your route — blocks light up in sequence so you can see the flow before ever writing a line of code. The goal: a developer who has never touched Express ships a working GET endpoint in under five minutes.",
    metrics: ["under-5-minute endpoint goal", "live code generation", "4-block request model"],
    techStack: ["TypeScript", "React", "ReactFlow", "Zustand", "Vite"],
    links: [
      { url: "#", text: "Coming Soon", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    launchTweetUrl: "#",
    caseStudy: {
      why: "Express.js is simple once you understand the mental model, but most tutorials skip to the code before establishing that model. I built Vizzy to make the chain literal — route hits middleware, middleware calls next, handler builds the response. If you can see it, you can reason about it.",
      useCase: "Junior developers and bootcamp students learning backend fundamentals for the first time. Vizzy lets them build intuition by assembling, not copying — and the generated code gives them a real artifact to study, modify, and run.",
      learned: "The code output is the product, not the canvas. Beginners don't just need working code — they need code they can actually read and modify. Writing the annotated code generation logic turned out to be the hardest and most important design decision in the entire project.",
      stuck: "Keeping three pieces of state in sync — the canvas node positions, the wire connections, and the generated code output — without any of them drifting out of sync was harder than expected. Any inconsistency between what the canvas shows and what the code panel renders completely breaks the learning experience. Getting the Zustand store design right took multiple refactors."
    },
    category: "frontend",
  },
  {
    id: "photobooth",
    title: "Photobooth",
    status: "Building",
    statusClass: "badge-building",
    image: "/projects/photobooth.png",
    description: "Open the URL, take four shots, download a retro film strip. No account, no install, no friction — just your camera and the moment.",
    fullDescription: "Photobooth strips the photo booth experience down to its essence: a URL, a camera, and a film strip. Open it on any device, take four shots with your camera, and the app composites them into a classic vertical strip layout using html2canvas — ready to download and share in seconds. No signup, no cloud storage, no app required. It works as a PWA, so it installs and runs offline when needed. The entire product is defined by a single constraint: if any step requires an account or a form, the experience is already broken.",
    metrics: ["4-shot film strip", "offline-capable PWA", "zero-account flow"],
    techStack: ["TypeScript", "React", "Vite", "Tailwind CSS", "PWA", "html2canvas"],
    links: [
      { url: "#", text: "Coming Soon", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    launchTweetUrl: "#",
    caseStudy: {
      why: "I kept noticing that photo booth apps all have the same problem: they ask for something before they give you anything. An email, an account, a subscription. I wanted to build the opposite — a tool that delivers the whole value in under 30 seconds with nothing asked in return.",
      useCase: "Parties, events, friend groups, team meetups — any moment where you want a shareable memory with zero setup. The zero-friction constraint is the entire product vision: if someone has to create an account, the spontaneity that makes it fun is already gone.",
      learned: "Simplicity is an active discipline, not a default state. Removing every non-essential step means each remaining step has to be perfect — camera access, capture timing, strip layout, share interaction. When there are no features to hide behind, the experience of each individual moment becomes the product.",
      stuck: "Camera access via the MediaDevices API behaves inconsistently across browsers and devices. Safari on iOS, Chrome on Android, and desktop browsers all handle constraints, permissions, and resolution negotiation differently. Getting reliable, high-quality capture everywhere without a native SDK required careful testing and a lot of defensive constraint handling."
    },
    category: "frontend",
  },
  {
    id: "snippet-vault",
    title: "Snippet Vault",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/snippet-vault.png",
    description: "A searchable vault for the code you actually reuse. Tag by language and intent, find by meaning — not by remembering the exact file it was buried in.",
    fullDescription: "Snippet Vault is a personal code library built around fast, intent-based retrieval. Snippets are stored with CodeMirror for syntax-highlighted editing, tagged by language and use case, and indexed with SQLite full-text search so you can find them by what they do — not what they're named. Prisma handles the data layer cleanly, and Zustand keeps the UI state lightweight and predictable. The design philosophy is aggressively minimal: no folders, no nested hierarchies, no bloat — just a search bar and a vault of code that works.",
    metrics: ["SQLite full-text search", "syntax-safe CodeMirror editor", "intent-based tagging"],
    techStack: ["TypeScript", "Next.js", "Prisma", "SQLite", "CodeMirror", "Tailwind CSS", "Zustand"],
    links: [
      { url: "https://snippetvault.abhijitamdubey.site", text: "Visit Site", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    caseStudy: {
      why: "I kept rewriting the same utility functions, regex patterns, and config blocks across projects because my snippets were scattered across Notion, old repos, and Slack messages. I wanted a single, fast place to store proven code and retrieve it in seconds — not minutes.",
      useCase: "Developers store reusable logic, boilerplate patterns, and language-specific utilities, then retrieve them by intent — 'debounce hook', 'postgres upsert', 'zod email schema' — rather than by filename or exact syntax. Especially useful during fast-moving sprints and for onboarding teammates to shared patterns.",
      learned: "Search relevance is the product. A snippet manager that returns the wrong result, or returns the right result third, is worse than no tool at all. I spent more time on indexing strategy, tagging structure, and result ranking than on any other part of the system — and that's exactly the right priority.",
      stuck: "Preserving code formatting across languages was genuinely difficult. Indentation, special characters, and copy behavior interact differently depending on the language, the browser, and whether the code was pasted in or typed. Getting reliable, round-trip faithful storage and copy-to-clipboard behavior required far more edge case handling than expected."
    },
    category: "systems",
  },
  {
    id: "errika",
    title: "Errika",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/errika.png",
    description: "One command to scaffold a production-ready Turborepo + Next.js monorepo — shared UI, Tailwind, Prisma, and sensible defaults already wired up.",
    fullDescription: "Errika is an opinionated CLI scaffolding tool that eliminates the repetitive work of setting up a Turborepo monorepo from scratch. A single command generates a fully configured workspace: Next.js app, shared component library, Tailwind setup, Prisma with a base schema, TypeScript project references, and ESLint config — all pre-wired and building from the start. Templates are rendered via Handlebars, and Commander.js handles the interactive prompt flow. The tool is designed to be deterministic: run it twice with the same inputs, get the same output, no surprises.",
    metrics: ["30-second scaffold", "2-hour setup compressed", "deterministic template output"],
    techStack: ["TypeScript", "Node.js", "CLI", "Commander.js", "Handlebars"],
    links: [
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    caseStudy: {
      why: "I was setting up the same Turborepo structure for every new project — same folder layout, same shared packages, same config files copied and adjusted. The process was predictable enough to automate, so I did. Errika compresses two hours of setup into 30 seconds.",
      useCase: "Developers and teams spinning up a new Next.js monorepo for a side project, internal tool, MVP, or client engagement. It's particularly useful at hackathons where the first hour is usually wasted on boilerplate that doesn't differentiate the product.",
      learned: "Great CLI tools prioritize predictability above everything else. Users should know exactly what they're going to get before they run the command — and get exactly that every time. Clear prompts, deterministic output, and safe re-runs matter more than offering configuration flexibility that most users never need.",
      stuck: "Template evolution without breaking existing generated projects is a genuinely hard problem. When the scaffold changes, what happens to projects already generated from an older version? Handling upgrade paths, respecting user customizations, and versioning templates forced me to think about the tool's maintenance story as seriously as its initial design."
    },
    category: "systems",
  },
  {
    id: "antimetal",
    title: "Antimetal",
    status: "Live",
    statusClass: "badge-live",
    image: "/projects/antimetal.png",
    description: "An AI-powered interactive system design learning platform. Build real architectures on a visual canvas, get instant AI feedback, and learn by doing — not by reading.",
    fullDescription: "Antimetal is a hands-on system design education platform built around a React Flow canvas where learners actually draw and wire up architectures — databases, caches, load balancers, queues — rather than passively reading about them. After each design, an Anthropic Claude-powered analysis layer reviews the architecture and provides targeted feedback: what's missing, what would break under load, and what to improve. Authentication is handled via NextAuth v5, payments via DodoPayments, and the full data layer runs on PostgreSQL with Prisma. Built as a Turborepo monorepo with Framer Motion powering transitions throughout the UI. The core insight: system design interviews fail candidates who have read everything but built nothing — Antimetal closes that gap by making the canvas the teacher.",
    metrics: ["structured canvas serialization", "AI architecture critique loop", "NextAuth + payments + Postgres"],
    architecture: [
      { label: "React Flow Canvas", detail: "Learner builds architecture nodes" },
      { label: "Zustand Store", detail: "Canonical graph state" },
      { label: "Serializer", detail: "Nodes, edges, data-flow context" },
      { label: "Claude Analysis", detail: "Targeted design critique" },
      { label: "PostgreSQL", detail: "Users, attempts, subscriptions" }
    ],
    techStack: ["Next.js 15", "React", "Tailwind CSS", "Framer Motion", "React Flow", "Anthropic Claude SDK", "NextAuth v5", "Prisma", "PostgreSQL", "DodoPayments", "Zustand", "Turborepo"],
    links: [
      { url: "https://antimetal.in", text: "Visit Site", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    launchTweetUrl: "https://x.com/abhijitam_tw/status/2046471530490794275?s=20",
    caseStudy: {
      why: "System design is one of the hardest interview topics to prepare for because every resource teaches it the same way: diagrams in a PDF, theory without feedback. I wanted to build a tool where the act of designing is the lesson — draw an architecture, get told what's wrong, iterate. That loop doesn't exist anywhere else.",
      useCase: "Engineers preparing for system design interviews, developers learning distributed systems fundamentals, and teams onboarding new hires to architectural thinking. The AI feedback loop lets learners get immediate, specific critiques on their own designs rather than comparing against a static 'correct' answer.",
      learned: "AI feedback has to be grounded in what the user actually built, not what a generic prompt produces. Serializing the React Flow canvas state into a structured representation the model can reason about — nodes, edges, component types, data flows — was the most important engineering decision in the project. The quality of the feedback is entirely a function of the quality of that representation.",
      stuck: "React Flow's state model and Zustand's store needed to stay perfectly in sync — canvas moves, edge connections, and node configurations all had to reflect in the store immediately and accurately, since the store is what gets serialized for AI analysis. Any drift between what the canvas shows and what the store holds produces garbage feedback, which breaks user trust instantly."
    },
    category: "frontend",
  },
  {
    id: "loadzen",
    title: "LoadZen",
    status: "Building",
    statusClass: "badge-building",
    image: "/projects/loadzen.png",
    description: "Self-hosted load testing with real-time metrics and AI-powered diagnosis. Enter a URL, set your load parameters, and get actionable insights — not just raw numbers.",
    fullDescription: "LoadZen is a self-hosted load testing platform built for developers who want production-quality performance insights without enterprise tooling overhead. Enter a target URL, configure concurrent users and test duration, and watch live metrics stream in as k6 runs the actual load generation as a managed subprocess. When the test completes, an AI diagnosis layer interprets the results — surfacing bottlenecks, error rate patterns, and specific recommendations rather than leaving raw p95 latency numbers for you to interpret. The architecture is a pnpm monorepo: Next.js frontend with TanStack Query for server state, a Fastify API, BullMQ and Redis for the job queue, k6 spawned as a subprocess, and PostgreSQL with Drizzle ORM for test history and result persistence.",
    metrics: ["k6 subprocess runner", "BullMQ job orchestration", "p95/error-rate diagnosis"],
    architecture: [
      { label: "Next.js Console", detail: "Load params and live results" },
      { label: "Fastify API", detail: "Test creation and auth boundary" },
      { label: "BullMQ + Redis", detail: "Queued test execution" },
      { label: "k6 Runner", detail: "Managed subprocess load generation" },
      { label: "PostgreSQL", detail: "History, metrics, reports" },
      { label: "AI Diagnosis", detail: "Bottlenecks and next actions" }
    ],
    techStack: ["TypeScript", "Next.js", "Fastify", "BullMQ", "Redis", "PostgreSQL", "Drizzle ORM", "k6"],
    links: [
      { url: "#", text: "Coming Soon", primary: true },
      { url: "https://github.com/Abhijitam01", text: "GitHub", primary: false }
    ],
    launchTweetUrl: "#",
    caseStudy: {
      why: "Every load testing tool I tried was either too heavy — enterprise software requiring days of setup — or too light — a shell script that hits a URL and returns average latency. I wanted something that you could self-host in minutes and that gives you real, production-quality signal about what breaks under load and why.",
      useCase: "Developers and small engineering teams testing endpoints before a launch, after a significant deploy, or when diagnosing a performance regression in production. The AI diagnosis layer is the differentiator — instead of staring at a p95 latency chart, you get a written interpretation of what the results mean and what to investigate next.",
      learned: "Subprocess orchestration has failure modes you don't think about until they happen in production. What happens when k6 crashes mid-test? When Redis goes down during a run? When the job queue restarts while a test is active? Building resilient error handling around a child process required thinking carefully about partial failure states and what the user should see in each scenario.",
      stuck: "Cloudflare Workers seemed like the ideal deployment target — cheap, globally distributed, easy to manage. But k6 requires child_process.spawn, a Node.js primitive that doesn't exist in the Workers runtime. That constraint ruled out the serverless deployment model entirely and forced a traditional server architecture, which shaped every infrastructure decision that followed."
    },
    category: "systems",
  }
];
