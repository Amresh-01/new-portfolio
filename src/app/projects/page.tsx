import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ProjectsGrid } from "@/components/projects-grid";
import { Footer } from "@/components/footer";

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

      <ProjectsGrid />

      <Footer />
    </main>
  );
}
