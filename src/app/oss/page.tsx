import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import { fetchGithubPRs } from "@/lib/github-prs";
import { OssTabs } from "@/components/oss-tabs";

export const revalidate = 3600; 

export default async function OSSPage() {
  const GITHUB_USERNAME = "Amresh-01"; 
  
  let openPRs = await fetchGithubPRs(GITHUB_USERNAME, "open");
  let mergedPRs = await fetchGithubPRs(GITHUB_USERNAME, "merged");

  return (
    <main>
      <SiteNav />

      <div className="oss-page-header">
        <Link href="/" className="projects-back-link">
          <ArrowLeft size={14} />
          Back
        </Link>
        <h1 className="oss-page-title">Open Source</h1>
        <p className="oss-page-subtitle">
          Pull requests I&apos;ve opened and contributed to across open-source projects.
        </p>

        <OssTabs openPRs={openPRs} mergedPRs={mergedPRs} />
      </div>

      <Footer />
    </main>
  );
}
