"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import { ArrowUpRight, GitBranch as GithubIcon } from "lucide-react";

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const isBuilding = project.status === "Building";
  const isLive = project.status === "Live";
  const isPrototype = project.status === "Prototype";

  let statusClass = "project-status-building";
  if (isLive) statusClass = "project-status-live";
  if (isPrototype) statusClass = "project-status-prototype";

  return (
    <div className="premium-project-card">
      <div className="premium-card-header">
        <span className={`premium-status-badge ${statusClass}`}>
          <span className="premium-status-dot"></span>
          {project.status.toUpperCase()}
        </span>
      </div>
      
      <div className="premium-card-body">
        <h3 className="premium-project-title">{project.title}</h3>
        <p className="premium-project-desc">{project.description}</p>
        
        <div className="premium-tech-stack">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="premium-tech-badge">{tech}</span>
          ))}
          {project.techStack.length > 5 && (
            <span className="premium-tech-badge muted">+{project.techStack.length - 5}</span>
          )}
        </div>
      </div>

      <div className="premium-card-footer">
        {project.links.find(l => l.text === "GitHub") && (
          <a 
            href={project.links.find(l => l.text === "GitHub")?.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="premium-action-link"
          >
            <GithubIcon size={14} /> GitHub
          </a>
        )}
        <Link href={`/projects/${project.id}`} className="premium-action-link primary">
          Case Study <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export function ProjectList({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="projects-page-grid">
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
