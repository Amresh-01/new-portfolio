import { Header } from "@/components/header";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { GitHubGraph } from "@/components/github-graph";
import { ProjectList, ProjectItem } from "@/components/project";
import { Footer } from "@/components/footer";
import { projects, Project } from "@/data/projects";
import { AboutSection } from "@/components/about-section";
import { TechStack } from "@/components/tech-stack";
import { Experience } from "@/components/experience";
import { experience } from "@/data/experience";
import { ReadingSection } from "@/components/reading";
import { PageContent } from "@/components/page-content";
import { VisitorsMap } from "@/components/visitors-map";
import { CountryList } from "@/components/country-list";

const HOME_PROJECT_IDS = ["chessable", "pinggod", "antimetal", "eyeswitch"];
const homeProjects = HOME_PROJECT_IDS
  .map((id) => projects.find((p) => p.id === id))
  .filter(Boolean) as Project[];

export default function Home() {
  return (
    <main>
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

        <Footer />

        <VisitorsMap />
        <CountryList />
      </PageContent>
    </main>
  );
}
