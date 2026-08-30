import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, GitBranch as GithubIcon, Globe, FileText, ArrowRight } from "lucide-react";
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
    title: `${project.title} — Amresh Chaurasiya`,
    description: project.description,
    alternates: {
      canonical: `https://amreshdev.me/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} — Amresh Chaurasiya`,
      description: project.description,
      url: `https://amreshdev.me/projects/${project.id}`,
      images: [{ url: project.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Amresh Chaurasiya`,
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
  const websiteUrl = project.links.find((link) => link.text === "Visit Site" || link.primary)?.url;
  const hasPost = false; // Post links removed per new schema, but can be added back if needed

  let statusClass = "project-status-building";
  if (project.status === "Live") statusClass = "project-status-live";
  if (project.status === "Prototype") statusClass = "project-status-prototype";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "applicationCategory": "DeveloperApplication",
    "description": project.description,
    "url": `https://amreshdev.me/projects/${project.id}`,
    "author": {
      "@type": "Person",
      "name": "Amresh Chaurasiya"
    }
  };

  return (
    <main className="premium-project-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="premium-page-shell">
        <Link href="/projects" className="premium-back-link">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="premium-page-header">
          <div className="premium-title-row">
            <h1 className="premium-title">{project.title}</h1>
            <span className={`premium-status-badge ${statusClass}`}>
              <span className="premium-status-dot"></span>
              {project.status.toUpperCase()}
            </span>
          </div>
          <p className="premium-thesis">{project.description}</p>
        </header>

        {/* Links */}
        <div className="premium-action-bar">
          {githubUrl !== "#" && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="premium-action-btn">
              <GithubIcon size={16} /> GitHub Repository
            </a>
          )}
          {websiteUrl && websiteUrl !== "#" && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="premium-action-btn primary">
              <Globe size={16} /> Live Demo
            </a>
          )}
        </div>

        {/* Image / Visual Context */}
        <div className="premium-hero-image">
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

        {/* Overview */}
        <section className="premium-section">
          <h2 className="premium-section-title">Overview</h2>
          <p className="premium-section-text">{project.fullDescription}</p>
        </section>

        {/* Architecture */}
        {project.architecture && (
          <section className="premium-section">
            <h2 className="premium-section-title">Architecture</h2>
            <div className="premium-architecture-grid">
              {project.architecture.map((step, index) => (
                <div key={step.label} className="premium-architecture-node">
                  <div className="premium-node-label">{step.label}</div>
                  <div className="premium-node-detail">{step.detail || (step as any).point}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Why I Built This */}
        {project.whyBuilt && (
          <section className="premium-section">
            <h2 className="premium-section-title">Why I built this</h2>
            <p className="premium-section-text">{project.whyBuilt}</p>
          </section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="premium-section">
            <h2 className="premium-section-title">Engineering Challenges</h2>
            <ul className="premium-challenge-list">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="premium-challenge-item">
                  <ArrowRight size={14} className="premium-challenge-icon" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* What I learned */}
        {project.lessons && project.lessons.length > 0 && (
          <section className="premium-section">
            <h2 className="premium-section-title">What I learned</h2>
            <div className="premium-lessons-container">
              {project.lessons.map((lesson, i) => (
                <p key={i} className="premium-section-text">{lesson}</p>
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        <section className="premium-section">
          <h2 className="premium-section-title">Stack</h2>
          <div className="premium-stack-grid">
            {project.techStack.map((tech) => {
              const iconSrc = TECH_ICONS[tech] || null;
              return (
                <span key={tech} className="premium-stack-pill">
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
        </section>

      </div>
    </main>
  );
}
