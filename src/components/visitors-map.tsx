"use client";

import { useEffect, useState, useMemo } from "react";
import DottedMap from "dotted-map";
import { useVisitors, Visitor } from "@/contexts/visitor-context";

interface TooltipState {
  text: string;
  x: number;
  y: number;
}

export function VisitorsMap() {
  const { visitors, count, countryCount: ctxCountryCount } = useVisitors();
  const [isDark, setIsDark] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const check = () =>
      setIsDark(
        document.documentElement.getAttribute("data-theme") !== "light"
      );
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const { svgDark, svgLight, mapPins, mapDimensions } = useMemo(() => {
    const map = new DottedMap({ height: 60, grid: "diagonal" });
    visitors.forEach((v) => {
      map.addPin({
        lat: v.lat,
        lng: v.lng,
        data: v,
        svgOptions: { color: "#22c55e", radius: 0.4 },
      });
    });
    const base = { radius: 0.22, shape: "circle" as const, backgroundColor: "transparent" };
    return {
      svgDark: map.getSVG({ ...base, color: "#555560" }),
      svgLight: map.getSVG({ ...base, color: "#b0b0b8" }),
      mapPins: (map as any).pins,
      mapDimensions: { 
        width: (map as any).image?.width || 119, 
        height: (map as any).image?.height || 60 
      }
    };
  }, [visitors]);

  const svg = isDark ? svgDark : svgLight;

  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    visitors.forEach((v) => {
      counts[v.country] = (counts[v.country] || 0) + 1;
    });
    return counts;
  }, [visitors]);

  return (
    <section className="visitors-map-section">
      <div style={{ position: "relative" }}>
        <div
          className="visitors-map-wrap"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <svg
          viewBox={`0 0 ${mapDimensions.width} ${mapDimensions.height}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {mapPins.map((pin: any, i: number) => {
            const v = pin.data as Visitor;
            const count = countryCounts[v.country] || 0;
            const text = `${count} visitor${count === 1 ? "" : "s"} from ${v.country}`;

            return (
              <circle
                key={i}
                cx={pin.x}
                cy={pin.y}
                r={2}
                fill="transparent"
                style={{ cursor: "pointer", pointerEvents: "all" }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    text,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 8,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          })}
        </svg>
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
            zIndex: 100,
          }}
        >
          {tooltip.text}
        </div>
      )}

      <p className="visitors-map-count">
        {count === null
          ? "..."
          : `${count} ${count === 1 ? "visitor" : "visitors"} from ${ctxCountryCount} ${ctxCountryCount === 1 ? "country" : "countries"}`}
      </p>
    </section>
  );
}
