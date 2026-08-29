"use client";

import { User } from "lucide-react";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { useAgentMode } from "@/contexts/agent-mode";

const portfolioData = {
  identity: {
    name: "Abhijitam Dubey",
    alias: "@abhijitam_tw",
    role: "Software Developer",
    type: "Full-Stack Engineer",
    location: "New Delhi, India",
    timezone: "IST (UTC+5:30)",
    email: "work.abhijitam@gmail.com",
    website: "abhijitamdubey.site",
    github: "https://github.com/Abhijitam01",
    twitter: "https://x.com/abhijitam_tw",
    linkedin: "https://www.linkedin.com/in/abhijitam-dubey-3ab794263/",
  },
  about:
    "Full-Stack Engineer focused on performance, scalability, and shipping production-grade software. Currently building tools and platforms that make developers' lives easier. Specialized in TypeScript, React, and Solana development.",
  stack: {
    primary: ["TypeScript", "React", "Next.js", "Node.js"],
    also: ["Solana", "PostgreSQL", "Rust", "WebSockets", "Canvas API", "Docker"],
  },
  experience: experience.map((e) => ({
    role: e.role,
    company: e.company,
    period: e.period,
    ...(e.location ? { location: e.location } : {}),
    highlights: e.bullets,
  })),
  projects: projects.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    description: p.description,
    techStack: p.techStack,
    url: p.links.find((l) => l.primary)?.url ?? null,
  })),
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(json: string): string {
  const escaped = escapeHtml(json);
  return escaped.replace(
    /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (match.startsWith('"')) {
        if (match.endsWith('":') || match.endsWith('" :')) {
          const key = match.endsWith('":') ? match.slice(0, -1) : match.slice(0, -2);
          return `<span class="jv-key">${key}</span>:`;
        }
        return `<span class="jv-str">${match}</span>`;
      }
      if (match === "true" || match === "false") return `<span class="jv-bool">${match}</span>`;
      if (match === "null") return `<span class="jv-null">${match}</span>`;
      return `<span class="jv-num">${match}</span>`;
    }
  );
}

export function AgentView() {
  const { toggle } = useAgentMode();
  const json = JSON.stringify(portfolioData, null, 2);
  const html = highlight(json);
  const lines = html.split("\n");

  return (
    <div className="agent-view">
      <div className="agent-view-header">
        <div className="agent-view-header-top">
          <span className="agent-view-method">GET</span>
          <span className="agent-view-path">/api/v1/person/abhijitam</span>
          <span className="agent-view-status">200 OK</span>
        </div>
        <div className="agent-view-meta">
          <span className="agent-view-comment">Content-Type: application/json</span>
          <span className="agent-view-comment">Cache-Control: max-age=86400</span>
        </div>
      </div>
      <pre className="agent-view-pre">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="agent-view-line">
              <span className="agent-view-ln">{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
