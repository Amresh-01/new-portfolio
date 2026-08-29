"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PR } from "@/lib/github-prs";

type Tab = "open" | "merged";

function PRList({ prs, state }: { prs: PR[], state: "open" | "merged" }) {
  if (prs.length === 0) {
    return (
      <div className="oss-empty">
        No PRs to show yet.
      </div>
    );
  }

  return (
    <div className="oss-pr-list">
      {prs.map((pr) => (
        <a
          key={`${pr.repo}-${pr.number}`}
          href={pr.url}
          target="_blank"
          rel="noreferrer"
          className="oss-pr-item-link"
        >
          <article className="oss-pr-item">
            <div className="oss-pr-left">
              <span className="oss-pr-repo">{pr.repo}#{pr.number}</span>
              <span className="oss-pr-date">{pr.date}</span>
            </div>
            <div className="oss-pr-right">
              <h2 className="oss-pr-title">{pr.title}</h2>
              {pr.description && (
                <p className="oss-pr-description">{pr.description}</p>
              )}
              <span className="oss-pr-link">
                View PR <ArrowUpRight size={14} />
              </span>
            </div>
          </article>
        </a>
      ))}
      
      <a 
        href={`https://github.com/search?q=is%3Apr+is%3A${state}+author%3AAmresh-01&type=pullrequests`}
        target="_blank"
        rel="noreferrer"
        className="oss-view-all-link"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px', color: '#8d8d95', fontSize: '0.85rem', textDecoration: 'none' }}
      >
        View all on GitHub <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

export function OssTabs({ openPRs, mergedPRs }: { openPRs: PR[], mergedPRs: PR[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("open");

  return (
    <>
      <div className="oss-tabs">
        <button
          className={`oss-tab-btn${activeTab === "open" ? " active" : ""}`}
          onClick={() => setActiveTab("open")}
        >
          Open PRs
          <span className="oss-tab-count">{openPRs.length}</span>
        </button>
        <button
          className={`oss-tab-btn${activeTab === "merged" ? " active" : ""}`}
          onClick={() => setActiveTab("merged")}
        >
          Merged PRs
          <span className="oss-tab-count">{mergedPRs.length}</span>
        </button>
      </div>

      <PRList prs={activeTab === "open" ? openPRs : mergedPRs} state={activeTab} />
    </>
  );
}
