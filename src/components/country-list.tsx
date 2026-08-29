"use client";

import { useVisitors } from "@/contexts/visitor-context";

export function CountryList() {
  const { count, countryCount, countries } = useVisitors();

  const sorted = Object.entries(countries).sort((a, b) => b[1].count - a[1].count);

  if (sorted.length === 0) return null;

  return (
    <section style={{ padding: "0 0 2rem" }}>
      <p style={{ marginBottom: "1rem", fontSize: "0.8rem", color: "var(--text-gray)", fontFamily: "monospace" }}>
        {count ?? 0} visitor{count !== 1 ? "s" : ""} from {countryCount} countr{countryCount !== 1 ? "ies" : "y"}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {sorted.map(([code, info]) => (
          <div
            key={code}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "5px 12px",
              fontSize: "0.8rem",
            }}
          >
            {info.flag && (
              <img
                src={info.flag}
                alt={code}
                width={20}
                height={15}
                style={{ borderRadius: "2px", objectFit: "cover" }}
              />
            )}
            <span style={{ color: "var(--text-primary, #ccc)" }}>{info.name}</span>
            <span style={{ color: "var(--text-gray, #555)", fontSize: "0.7rem" }}>{info.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
