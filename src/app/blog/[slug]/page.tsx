import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";

const contentMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "building-on-solana": () => import("@/content/blog/building-on-solana"),
  "real-time-canvas": () => import("@/content/blog/real-time-canvas"),
  "fullstack-mental-model": () => import("@/content/blog/fullstack-mental-model"),
  "nextjs-performance": () => import("@/content/blog/nextjs-performance"),
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = blogPosts.find((p) => p.slug === slug);
  if (!meta) return {};
  return { title: meta.title, description: meta.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = blogPosts.find((p) => p.slug === slug);
  if (!meta || !contentMap[slug]) notFound();

  const { default: Content } = await contentMap[slug]();

  return (
    <main>
      <SiteNav />
      <div className="main-wrapper">
        <Link href="/blog" className="projects-back-link" style={{ display: "inline-flex", marginTop: "1.5rem" }}>
          <ArrowLeft size={14} />
          All posts
        </Link>
        <div className="blog-article-header">
          <div className="blog-article-meta">
            <time dateTime={meta.isoDate}>{meta.date}</time>
            {" · "}
            {meta.readTime}
          </div>
          <h1 className="blog-article-title">{meta.title}</h1>
          <p className="blog-article-excerpt">{meta.excerpt}</p>
          <div className="blog-post-tags">
            {meta.tags.map((t) => (
              <span key={t} className="blog-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
        <article className="blog-article-body">
          <Content />
        </article>
      </div>
      <Footer />
    </main>
  );
}
