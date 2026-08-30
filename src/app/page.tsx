import { Header } from "@/components/header";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { GitHubGraph } from "@/components/github-graph";
import { ProjectList, ProjectItem } from "@/components/project";
import { projects, Project } from "@/data/projects";
import { AboutSection } from "@/components/about-section";
import { TechStack } from "@/components/tech-stack";
import { Experience } from "@/components/experience";
import { experience } from "@/data/experience";
import { ReadingSection } from "@/components/reading";
import { PageContent } from "@/components/page-content";
import { VisitorsMap } from "@/components/visitors-map";
import { CountryList } from "@/components/country-list";
import Script from "next/script";

const HOME_PROJECT_IDS = ["agentos", "loadforge", "pulsewatch", "graphmind"];
const homeProjects = HOME_PROJECT_IDS
  .map((id) => projects.find((p) => p.id === id))
  .filter(Boolean) as Project[];



export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amresh Chaurasiya",
    "url": "https://amreshdev.me",
    "jobTitle": "Backend Engineer",
    "knowsAbout": ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "AI Systems", "Scalable Backend Systems"],
    "sameAs": [
      "https://github.com/Amresh-01",
      "https://www.linkedin.com/in/amresh-chaurasiya-/",
      "https://x.com/Amresh__01"
    ]
  };

  return (
    <main>
      <Script
        id="json-ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <PageContent>
        <Header />

        <AboutSection />

        <GitHubGraph />

        <TechStack />

        <Section title="Experience">
          <Experience items={experience} />
        </Section>

        <Section title="Featured Projects">
          <ProjectList>
            {homeProjects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
              />
            ))}
          </ProjectList>
        </Section>

        <Section title="What I'm Reading">
          <ReadingSection />
        </Section>

        <VisitorsMap />
        <CountryList />
      </PageContent>
    </main>
  );
}
