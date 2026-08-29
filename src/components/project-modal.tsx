"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ExternalLink, GitBranch as GithubIcon, Globe, Share2 } from "lucide-react";
import { Project } from "@/data/projects";
import { HoverTag } from "./hover-tag";
import { TECH_ICONS } from "@/data/tech-icons";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    documentElement.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.scrollTo(0, scrollY);
    };
  }, [handleKeyDown]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hero">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 900px) 100vw, 800px"
            quality={90}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {(() => {
          const githubUrl = project.links.find((l) => l.text === "GitHub")?.url || "#";
          const websiteUrl = project.links.find((l) => l.primary)?.url || "#";
          const hasLaunchTweet = !!project.launchTweetUrl && project.launchTweetUrl !== "#";
          const hasWebsite = websiteUrl !== "#";
          const colCount = [true, hasWebsite, hasLaunchTweet, true].filter(Boolean).length;
          return (
        <div
          className="modal-action-bar"
          style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
        >
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="modal-action-btn">
            <Github size={18} />
            Github
          </a>
          {hasWebsite ? (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="modal-action-btn">
              <Globe size={18} />
              Website
            </a>
          ) : (
            <span className="modal-action-btn modal-action-btn--disabled">
              <Globe size={18} />
              Coming Soon
            </span>
          )}
          {hasLaunchTweet && (
            <a href={project.launchTweetUrl} target="_blank" rel="noopener noreferrer" className="modal-action-btn">
              <ExternalLink size={18} />
              Launch Tweet
            </a>
          )}
          <button
            type="button"
            className="modal-action-btn"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
          );
        })()}

        <div className="modal-title-row">
          <h2 className="modal-title">{project.title}</h2>
          <div className="project-status">
            <div className={`status-dot ${project.status.toLowerCase()}`} />
            {project.status}
          </div>
        </div>

        <p className="modal-description">
          {project.fullDescription}
          {project.status !== "Live" && (
            <>
              <br />
              <br />
              For early access, please <strong>contact me!</strong>
            </>
          )}
        </p>

        <div className="modal-case-study">
          <div className="case-study-block">
            <h3 className="case-study-title">Why I built this</h3>
            <p className="case-study-text">{project.caseStudy.why}</p>
          </div>

          <div className="case-study-block">
            <h3 className="case-study-title">Use case</h3>
            <p className="case-study-text">{project.caseStudy.useCase}</p>
          </div>

          <div className="case-study-block">
            <h3 className="case-study-title">What I learned</h3>
            <p className="case-study-text">{project.caseStudy.learned}</p>
          </div>

          <div className="case-study-block">
            <h3 className="case-study-title">Where I got stuck</h3>
            <p className="case-study-text">{project.caseStudy.stuck}</p>
          </div>
        </div>

        <div className="modal-stack-section">
          <h3 className="modal-stack-title">Stack used</h3>
          <div className="stack-pill-grid">
            {project.techStack.map((tech) => {
              const imageSrc = TECH_ICONS[tech];
              return (
                <span key={tech} className="stack-pill">
                  {imageSrc ? <HoverTag text={tech} imageSrc={imageSrc} /> : tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
