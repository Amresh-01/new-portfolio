export type PR = {
  title: string;
  repo: string;
  number: number;
  url: string;
  description?: string;
  date: string;
};

export const openPRs: PR[] = [
  {
    title: "feat: add chat outline navigation strip",
    repo: "pingdotgg/t3code",
    number: 1917,
    url: "https://github.com/pingdotgg/t3code/pull/1917",
    date: "Apr 2026",
  },
  {
    title: "feat: add Trigger.dev v3 workspace with health-check task",
    repo: "PrettiFlow/prettiflow-core",
    number: 20,
    url: "https://github.com/PrettiFlow/prettiflow-core/pull/20",
    date: "Apr 2026",
  },
  {
    title: "feat: add context memory architecture with pgvector smart retrieval",
    repo: "PrettiFlow/prettiflow-core",
    number: 19,
    url: "https://github.com/PrettiFlow/prettiflow-core/pull/19",
    date: "Apr 2026",
  },
  {
    title: "feat: auto-generate document IDs in MossClient and CLI",
    repo: "usemoss/moss",
    number: 181,
    url: "https://github.com/usemoss/moss/pull/181",
    date: "Apr 2026",
  },
  {
    title: "feat: add moss-connector-dynamodb (DynamoDB source connector)",
    repo: "usemoss/moss",
    number: 180,
    url: "https://github.com/usemoss/moss/pull/180",
    date: "Apr 2026",
  },
  {
    title: "feat: Add moss-connector-postgres data connector",
    repo: "Abhijitam01/moss",
    number: 3,
    url: "https://github.com/Abhijitam01/moss/pull/3",
    date: "Apr 2026",
  },
  {
    title: "feat: add moss-connector-snowflake",
    repo: "Abhijitam01/moss",
    number: 2,
    url: "https://github.com/Abhijitam01/moss/pull/2",
    date: "Apr 2026",
  },
  {
    title: "feat: auto-mount ~/.claude/ directory into sandboxes",
    repo: "gofixpoint/amika",
    number: 179,
    url: "https://github.com/gofixpoint/amika/pull/179",
    date: "Apr 2026",
  },
  {
    title: "feat: allow modifying sandbox metadata after creation",
    repo: "gofixpoint/amika",
    number: 178,
    url: "https://github.com/gofixpoint/amika/pull/178",
    date: "Apr 2026",
  },
  {
    title: "Let templates read local project files via nao.file",
    repo: "getnao/nao",
    number: 599,
    url: "https://github.com/getnao/nao/pull/599",
    date: "Apr 2026",
  },
  {
    title: "Notion easy add integration",
    repo: "getnao/nao",
    number: 598,
    url: "https://github.com/getnao/nao/pull/598",
    date: "Apr 2026",
  },
  {
    title: "From CSS to Tailwind and reusable UI",
    repo: "Abhijitam01/antimetal",
    number: 1,
    url: "https://github.com/Abhijitam01/antimetal/pull/1",
    date: "Apr 2026",
  },
  {
    title: "fix: detect wrong-platform binary in nao chat and show actionable err…",
    repo: "getnao/nao",
    number: 577,
    url: "https://github.com/getnao/nao/pull/577",
    date: "Apr 2026",
  },
  {
    title: "sk-moss-plugin",
    repo: "usemoss/moss",
    number: 134,
    url: "https://github.com/usemoss/moss/pull/134",
    date: "Apr 2026",
  },
  {
    title: "feat: add starring and folders to organize stories panel",
    repo: "getnao/nao",
    number: 559,
    url: "https://github.com/getnao/nao/pull/559",
    date: "Apr 2026",
  },
  {
    title: "feat: add file rename to storage dashboard",
    repo: "InsForge/InsForge",
    number: 1061,
    url: "https://github.com/InsForge/InsForge/pull/1061",
    date: "Apr 2026",
  },
  {
    title: "refactor(storage): split useStorage god-hook into domain-focused hooks",
    repo: "InsForge/InsForge",
    number: 1060,
    url: "https://github.com/InsForge/InsForge/pull/1060",
    date: "Apr 2026",
  },
  {
    title: "migrating from react to turbo-monorepo",
    repo: "Abhijitam01/chess",
    number: 2,
    url: "https://github.com/Abhijitam01/chess/pull/2",
    date: "Feb 2026",
  },
  {
    title: "Feature/hall of projects enhancement 11",
    repo: "thezeusproject/thezeusproject.github.io",
    number: 18,
    url: "https://github.com/thezeusproject/thezeusproject.github.io/pull/18",
    date: "Jun 2025",
  },
  {
    title: "Fix: dynamically add bottom padding when cursor nears bottom (#19)",
    repo: "farzaa/freewrite",
    number: 27,
    url: "https://github.com/farzaa/freewrite/pull/27",
    date: "Apr 2025",
  },
];

export const mergedPRs: PR[] = [
  {
    title: "feat: auto-create PR after successful test run (fixes #76)",
    repo: "Abhijitam01/expect",
    number: 1,
    url: "https://github.com/Abhijitam01/expect/pull/1",
    date: "Apr 2026",
  },
  {
    title: "feat: add Semantic Kernel plugin for Moss semantic search",
    repo: "Abhijitam01/moss",
    number: 1,
    url: "https://github.com/Abhijitam01/moss/pull/1",
    date: "Apr 2026",
  },
  {
    title: "migrating from react to turbo-monorepo",
    repo: "Abhijitam01/chess",
    number: 1,
    url: "https://github.com/Abhijitam01/chess/pull/1",
    date: "Feb 2026",
  },
  {
    title: "Analyze github repo commit history",
    repo: "Abhijitam01/Devstory",
    number: 1,
    url: "https://github.com/Abhijitam01/Devstory/pull/1",
    date: "Oct 2025",
  },
  {
    title: "Fix: centralize toc styles",
    repo: "thezeusproject/thezeusproject.github.io",
    number: 15,
    url: "https://github.com/thezeusproject/thezeusproject.github.io/pull/15",
    date: "Jun 2025",
  },
  {
    title: "Fix: Remove filler line requirement",
    repo: "thezeusproject/thezeusproject.github.io",
    number: 13,
    url: "https://github.com/thezeusproject/thezeusproject.github.io/pull/13",
    date: "Jun 2025",
  },
  {
    title: "adding the test cases",
    repo: "Abhijitam01/todoai",
    number: 2,
    url: "https://github.com/Abhijitam01/todoai/pull/2",
    date: "Jun 2025",
  },
  {
    title: "feat: add backend queue system for AI",
    repo: "Abhijitam01/todoai",
    number: 1,
    url: "https://github.com/Abhijitam01/todoai/pull/1",
    date: "Jun 2025",
  },
  {
    title: "Add CONTRIBUTION.md with guidelines for contributors",
    repo: "usesend/useSend",
    number: 147,
    url: "https://github.com/usesend/useSend/pull/147",
    date: "Apr 2025",
  },
  {
    title: "final changes",
    repo: "mlsamsit/MSCMSIT",
    number: 29,
    url: "https://github.com/mlsamsit/MSCMSIT/pull/29",
    date: "Nov 2024",
  },
];
