import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ProjectsGrid } from "@/components/projects-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Amresh Chaurasiya",
  description: "A collection of scalable backend systems, AI-powered applications, and developer infrastructure built by Amresh Chaurasiya.",
  openGraph: {
    title: "Projects — Amresh Chaurasiya",
    description: "A collection of scalable backend systems, AI-powered applications, and developer infrastructure built by Amresh Chaurasiya.",
    url: "https://amreshdev.me/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <SiteNav />

      <div className="projects-page-header">
        <Link href="/" className="projects-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </Link>
        <h1 className="projects-page-title">Projects</h1>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem", marginBottom: "2rem", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
        <p>
          I build scalable backend systems, AI-powered applications, and reliable developer infrastructure.
          Below are some of my featured systems and applications focusing on performance, robust architecture, and real-world utility.
        </p>
      </div>

      <ProjectsGrid />

          </main>
  );
}
