"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Eye, Bot, User } from "lucide-react";
import { useAgentMode } from "@/contexts/agent-mode";
import { useVisitors } from "@/contexts/visitor-context";

export function SiteNav() {
  const pathname = usePathname();
  const { isAgentMode, toggle } = useAgentMode();
  const { count: views } = useVisitors();
  const [followers, setFollowers] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github/followers")
      .then((r) => r.json())
      .then((d) => { if (typeof d.followers === "number") setFollowers(d.followers); })
      .catch(() => {});
  }, []);

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">

        <div className="site-nav-left">
          <Link
            href="/"
            className={`site-nav-link${pathname === "/" ? " active" : ""}`}
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            className={`site-nav-link${pathname === "/blog" ? " active" : ""}`}
          >
            Blog
          </Link>
          <Link
            href="/oss"
            className={`site-nav-link${pathname === "/oss" ? " active" : ""}`}
          >
            OSS
          </Link>
        </div>


        <div className="site-nav-right">
          <div className="site-nav-views-btn">
            <Eye size={13} />
            <span>{views !== null ? views.toLocaleString() : "—"}</span>
          </div>
          <a
            href="https://github.com/Abhijitam01"
            target="_blank"
            rel="noreferrer"
            className="site-nav-views-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
            <span>{followers ?? "—"}</span>
          </a>
          <button
            className={`site-nav-views-btn${isAgentMode ? " active" : ""}`}
            onClick={toggle}
            style={{ cursor: "pointer" }}
            aria-label={isAgentMode ? "Switch to Human view" : "Switch to Agent view"}
          >
            {isAgentMode ? <Bot size={13} /> : <User size={13} />}
            <span>{isAgentMode ? "Agent" : "Human"}</span>
          </button>
          <div className="site-nav-sep" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
