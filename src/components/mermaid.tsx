"use client";

import { useEffect, useRef, useId } from "react";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    import("mermaid").then((m) => {
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      m.default.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        fontFamily: "'Courier New', monospace",
        fontSize: 13,
      });

      m.default
        .render(`mermaid-${id}`, chart)
        .then(({ svg }) => {
          if (el) el.innerHTML = svg;
        })
        .catch(console.error);
    });
  }, [chart, id]);

  return <div ref={ref} className="blog-mermaid" />;
}
