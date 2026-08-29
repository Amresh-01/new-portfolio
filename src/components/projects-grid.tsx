"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectItem } from "./project";

type Filter = "all" | "systems" | "frontend" | "web3";

const FEATURED_PROJECT_IDS = ["chessable", "pinggod", "antimetal", "eyeswitch"];

const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "systems", label: "Systems" },
  { value: "frontend", label: "Frontend" },
  { value: "web3", label: "Web3" },
];

export function ProjectsGrid() {
  const [active, setActive] = useState<Filter>("all");
  const featured = projects.filter((project) => FEATURED_PROJECT_IDS.includes(project.id));
  const labs = projects.filter((project) => !FEATURED_PROJECT_IDS.includes(project.id));
  const filteredLabs = active === "all" ? labs : labs.filter((p) => p.category === active);

  return (
    <>
      <section className="projects-group">
        <div className="projects-group-header">
          <p className="projects-group-kicker">The work to remember</p>
          <h2 className="projects-group-title">Featured Projects</h2>
        </div>
        <div className="projects-page-grid projects-page-grid-featured">
          {featured.map((p) => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </div>
      </section>

      <section className="projects-group">
        <div className="projects-group-header">
          <p className="projects-group-kicker">Smaller tools, experiments, and product bets</p>
          <h2 className="projects-group-title">Labs & Experiments</h2>
        </div>
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
        {filteredLabs.length > 0 ? (
          <div className="projects-page-grid">
            {filteredLabs.map((p) => (
              <ProjectItem key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="projects-empty-state">No lab projects in this category yet.</p>
        )}
      </section>
    </>
  );
}
