"use client";

import { BookOpen, FileText, Video as YoutubeIcon, ArrowUpRight } from "lucide-react";

export function ReadingSection() {
  const items = [
    {
      type: "Book",
      icon: <BookOpen size={18} />,
      title: "Nexus",
      author: "Yuval Noah Harari",
      url: "https://www.ynharari.com/book/nexus/",
    },
    {
      type: "Thread",
      icon: <FileText size={18} />,
      title: "Thread by Garry Tan",
      author: "@garrytan",
      url: "https://x.com/garrytan/status/2046876981711769720?s=20",
    },
    {
      type: "Video",
      icon: <YoutubeIcon size={16} />,
      title: "YouTube Video",
      author: "YouTube",
      url: "https://youtu.be/7xTGNNLPyMI",
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {items.map((item, i) => (
        <a 
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem 1.25rem",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            textDecoration: "none",
            color: "var(--text-primary)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.borderColor = "var(--text-secondary)";
            e.currentTarget.style.transform = "translateX(2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <div style={{ marginRight: "1rem", color: "var(--text-secondary)", display: "flex", alignItems: "center" }}>
            {item.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.title}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.1rem" }}>
              {item.author} <span style={{ opacity: 0.5, margin: "0 4px" }}>•</span> {item.type}
            </div>
          </div>
          <ArrowUpRight size={18} style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
        </a>
      ))}
    </div>
  );
}
