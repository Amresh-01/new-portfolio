"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    const url = hasVisited
      ? "/api/visitors/count"
      : "/api/visitors/count?increment=1";
    if (!hasVisited) sessionStorage.setItem("hasVisited", "true");

    fetch(url)
      .then((res) => res.json())
      .then((data) => { if (typeof data.count === "number") setVisits(data.count); })
      .catch(() => {});
  }, []);

  if (visits === null) {
    return (
      <div className="visitor-counter" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-gray)", fontSize: "0.85rem", opacity: 0.7 }}>
        <Eye size={14} />
        <span>...</span>
      </div>
    );
  }

  return (
    <div className="visitor-counter" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-gray)", fontSize: "0.85rem" }}>
      <Eye size={14} />
      <span>{visits.toLocaleString()} views</span>
    </div>
  );
}
