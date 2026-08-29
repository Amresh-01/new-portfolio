export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  readTime: string;
  tags: string[];
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-on-solana",
    title: "Building on Solana: What Nobody Tells You",
    date: "Mar 2026",
    isoDate: "2026-03-20",
    readTime: "9 min read",
    tags: ["Solana", "Rust", "Web3"],
    excerpt:
      "The account model is genuinely different. PDAs are confusing until suddenly they aren't. Here's everything I wish someone had told me before I started.",
  },
  {
    slug: "real-time-canvas",
    title: "Real-Time Collaboration is Harder Than It Looks",
    date: "Feb 2026",
    isoDate: "2026-02-14",
    readTime: "11 min read",
    tags: ["Node.js", "WebSockets", "Architecture"],
    excerpt:
      "I naively thought WebSockets would be the hard part. Turns out, keeping two users' canvases in sync without conflicts is the actual problem — and it has a beautiful solution.",
  },
  {
    slug: "fullstack-mental-model",
    title: "The Mental Model That Changed How I Think About Full-Stack",
    date: "Jan 2026",
    isoDate: "2026-01-08",
    readTime: "7 min read",
    tags: ["Engineering", "Career", "Architecture"],
    excerpt:
      "Most bugs don't live where you think they do. Once I started thinking about data shape transformations across layers, debugging got a lot faster.",
  },
  {
    slug: "nextjs-performance",
    title: "Next.js Performance: The Things That Actually Move the Needle",
    date: "Dec 2025",
    isoDate: "2025-12-05",
    readTime: "10 min read",
    tags: ["Next.js", "TypeScript", "Performance"],
    excerpt:
      "After profiling three production Next.js apps, I noticed the same patterns showing up. Most of the advice online optimizes for the wrong things.",
  },
];
