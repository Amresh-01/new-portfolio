"use client";

import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

interface TooltipState {
  x: number;
  y: number;
  text: string;
}

export function GitHubGraph() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => setMounted(true), []);

  const currentYear = new Date().getFullYear();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const tooltipText = (activity: { count: number; date: string }) => {
    if (!activity?.date) return "No contributions";
    const contributions = activity.count === 1 ? "1 contribution" : `${activity.count} contributions`;
    return `${contributions} on ${activity.date}`;
  };

  return (
    <section className="github-section">
      <div className="github-section-header">
        <span className="section-title">GitHub</span>
        <h2 className="section-heading" style={{ marginBottom: "0.25rem" }}>
          Contribution Activity
        </h2>
        <a
          href="https://github.com/Abhijitam01"
          target="_blank"
          rel="noopener noreferrer"
          className="github-view-profile"
        >
          View Profile
        </a>
      </div>

      <div className="github-calendar-wrap">
        <div className="github-calendar-scroll">
          {mounted && (
            <GitHubCalendar
              username="Abhijitam01"
              year={currentYear}
              theme={theme}
              colorScheme={colorScheme}
              fontSize={12}
              blockSize={11}
              blockMargin={4}
              renderBlock={(block, activity) =>
                React.cloneElement(block, {
                  onMouseEnter: (e: React.MouseEvent<SVGRectElement>) => {
                    const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                    setTooltip({
                      text: tooltipText(activity),
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  },
                  onMouseLeave: () => setTooltip(null),
                })
              }
            />
          )}
        </div>
      </div>

      {tooltip && (
        <div
          className="gh-tooltip"
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
          }}
        >
          {tooltip.text}
        </div>
      )}

      <p className="github-section-tagline">
        Building in public &middot; {currentYear} Contributions
      </p>
    </section>
  );
}
