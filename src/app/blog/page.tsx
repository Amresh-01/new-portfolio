import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <main>
      <SiteNav />

      <div className="blog-page-header">
        <Link href="/" className="projects-back-link">
          <ArrowLeft size={14} />
          Back
        </Link>
        <h1 className="blog-page-title">Writing</h1>
        <p className="blog-page-subtitle">
          Notes on building software, shipping products, and things I pick up along the way.
        </p>
      </div>

      <div className="blog-post-list">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-post-item-link">
            <article className="blog-post-item">
              <div className="blog-post-meta">
                <time className="blog-post-date" dateTime={post.isoDate}>
                  {post.date}
                </time>
                <div className="blog-post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="blog-post-content">
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <span className="blog-post-link">
                  Read post <ArrowUpRight size={14} />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <Footer />
    </main>
  );
}
