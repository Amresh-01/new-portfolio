"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectItem } from "./project";

type Filter = "all" | "ai" | "backend" | "infrastructure" | "full stack" | "open source";

const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "ai", label: "AI" },
  { value: "backend", label: "BACKEND" },
  { value: "infrastructure", label: "INFRASTRUCTURE" },
  { value: "open source", label: "OPEN SOURCE" },
];

export function ProjectsGrid() {
  const [active, setActive] = useState<Filter>("all");

  const filteredProjects = active === "all" 
    ? projects 
    : projects.filter((p) => p.category.map(c => c.toLowerCase()).includes(active));

  return (
    <section className="projects-group">
      <div className="projects-filter-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`projects-filter-tab${active === tab.value ? " active" : ""}`}
            aria-pressed={active === tab.value}
            onClick={() => setActive(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {filteredProjects.length > 0 ? (
        <div className="projects-page-grid">
          {filteredProjects.map((p) => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <p className="projects-empty-state">No projects in this category yet.</p>
      )}
    </section>
  );
}
