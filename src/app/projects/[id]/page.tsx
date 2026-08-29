import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, GitBranch as GithubIcon, Globe, FileText } from "lucide-react";
import { projects } from "@/data/projects";
import { TECH_ICONS } from "@/data/tech-icons";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Abhijitam Dubey`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Abhijitam Dubey`,
      description: project.description,
      images: [{ url: project.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Abhijitam Dubey`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const githubUrl = project.links.find((link) => link.text === "GitHub")?.url || "#";
  const websiteUrl = project.links.find((link) => link.primary)?.url || "#";
  const hasPost = !!project.launchTweetUrl && project.launchTweetUrl !== "#";

  return (
    <main className="project-page">
      <div className="project-page-shell">
        <Link href="/projects" className="project-page-back">
          <ArrowLeft size={16} />
          Projects
        </Link>

        <div className="project-page-hero">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 900px) 100vw, 860px"
            quality={90}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div
          className="project-page-action-bar"
          style={{ gridTemplateColumns: hasPost ? "repeat(3, 1fr)" : "repeat(2, 1fr)" }}
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-page-action-btn"
          >
            <Github size={17} />
            Github
          </a>
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-page-action-btn"
          >
            <Globe size={17} />
            Website
          </a>
          {hasPost && (
            <a
              href={project.launchTweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page-action-btn"
            >
              <FileText size={17} />
              Post
            </a>
          )}
        </div>

        <div className="project-page-title-row">
          <h1 className="project-page-title">{project.title}</h1>
          <div className="project-status">
            <div className={`status-dot ${project.status.toLowerCase()}`} />
            {project.status}
          </div>
        </div>

        <p className="project-page-description">{project.description}</p>
        <p className="project-page-description">{project.fullDescription}</p>

        <div className="project-page-metrics">
          {project.metrics.map((metric) => (
            <div key={metric} className="project-page-metric">
              <span className="project-page-metric-value">{metric}</span>
            </div>
          ))}
        </div>

        {project.architecture && (
          <div className="project-page-architecture">
            <h2 className="project-page-section-title">Architecture</h2>
            <div className="architecture-flow">
              {project.architecture.map((step, index) => (
                <div key={step.label} className="architecture-step">
                  <div className="architecture-step-index">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{step.label}</h3>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="project-page-case-study">
          <div className="case-study-block">
            <h2 className="case-study-title">Why I built this</h2>
            <p className="case-study-text">{project.caseStudy.why}</p>
          </div>
          <div className="case-study-block">
            <h2 className="case-study-title">Use case</h2>
            <p className="case-study-text">{project.caseStudy.useCase}</p>
          </div>
          <div className="case-study-block">
            <h2 className="case-study-title">What I learned</h2>
            <p className="case-study-text">{project.caseStudy.learned}</p>
          </div>
          <div className="case-study-block">
            <h2 className="case-study-title">Where I got stuck</h2>
            <p className="case-study-text">{project.caseStudy.stuck}</p>
          </div>
        </div>

        <div className="project-page-stack-section">
          <h2 className="project-page-stack-title">Stack used</h2>
          <div className="stack-pill-grid">
            {project.techStack.map((tech) => {
              const iconSrc = TECH_ICONS[tech];
              return (
                <span key={tech} className="stack-pill">
                  {iconSrc && (
                    <Image
                      src={iconSrc}
                      alt={tech}
                      width={16}
                      height={16}
                      style={{ objectFit: "contain", flexShrink: 0 }}
                    />
                  )}
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
