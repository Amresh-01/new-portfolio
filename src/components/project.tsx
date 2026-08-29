"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const isBuilding = project.status === "Building";
  const screenLabel = isBuilding ? "Coming Soon" : project.title;

  return (
    <Link className="project-card-link" href={`/projects/${project.id}`}>
      {/* Image Area */}
      <div className="project-card-image-wrap">
        <div className="project-card-image-inner">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={88}
            style={{ objectFit: "cover" }}
          />
        </div>
        {screenLabel && (
          <span className="project-card-screen-label">{screenLabel}</span>
        )}
        {project.launchTweetUrl && project.launchTweetUrl !== "#" && (
          <span className="project-card-pin-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>
            </svg>
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="project-card-body">
        <div className="project-card-title-row">
          <h3 className="project-card-title">{project.title}</h3>
          <div className="project-card-status">
            <span className={`project-status-dot ${project.status === "Live" ? "dot-live" : "dot-building"}`} />
            <span className="project-status-label">{project.status}</span>
          </div>
        </div>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-metrics">
          {project.metrics.slice(0, 2).map((metric) => (
            <span key={metric} className="project-card-metric">{metric}</span>
          ))}
        </div>
        <div className="project-card-tags">
          {project.techStack.slice(0, 4).map((tag) => (
            <span key={tag} className="project-card-tag">{tag}</span>
          ))}
        </div>
        <span className="project-card-view-link">
          View Project <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export function ProjectList({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="project-grid">
        {children}
      </div>
      <div className="project-view-all-wrap">
        <Link href="/projects" className="project-view-all-btn">
          View All <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
