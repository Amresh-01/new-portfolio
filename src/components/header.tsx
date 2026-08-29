"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Briefcase, Code, MapPin, Clock, Mail, Globe, ArrowUpRight, Eye } from "lucide-react";
import { RoleFlip } from "@/components/role-flip";
import { useVisitors } from "@/contexts/visitor-context";

const socialCards = [
  {
    platform: "X (formerly Twitter)",
    handle: "@abhijitam_tw",
    href: "https://x.com/abhijitam_tw",
    bg: "#000000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: "GitHub",
    handle: "Abhijitam01",
    href: "https://github.com/Abhijitam01",
    bg: "#000000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "abhijitam-dubey",
    href: "https://www.linkedin.com/in/abhijitam-dubey-3ab794263/",
    bg: "#000000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    platform: "Email",
    handle: "work.abhijitam",
    href: "mailto:work.abhijitam@gmail.com",
    bg: "#000000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) => (
  <div className="info-row">
    <div className="info-icon-box">{icon}</div>
    <span className="info-text">{text}</span>
  </div>
);


const SwapIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

function useTime(timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(fmt.format(new Date()));
    const id = setInterval(() => setTime(fmt.format(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Header() {
  const [isTwitter, setIsTwitter] = useState(false);
  const { count } = useVisitors();
  const istTime = useTime("Asia/Kolkata");
  const dubaiTime = useTime("Asia/Dubai");
  const londonTime = useTime("Europe/London");

  return (
    <header className="header-hero">
      <div className="hero-banner" />

      <div className="hero-profile-row">
        <div className="hero-avatar-col">
          <div className="hero-avatar-outer">
            <div className="hero-avatar-container">
              <div className="hero-avatar-img">
                {isTwitter ? (
                  <img
                    src="https://unavatar.io/x/abhijitam_tw"
                    alt="@abhijitam_tw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    src="/me.png"
                    alt="Abhijitam Dubey"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="200px"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-name-block">
          <div className="hero-visitor-badge">
            <Eye size={13} />
            <span>{count !== null ? count.toLocaleString() : "—"}</span>
          </div>
          <button
            onClick={() => setIsTwitter((v) => !v)}
            className={`hero-identity-toggle${isTwitter ? " active" : ""}`}
            aria-label={isTwitter ? "Switch to real identity" : "Switch to Twitter identity"}
            title={isTwitter ? "Show real profile" : "Show Twitter profile"}
            style={{ position: "static", marginBottom: "0.5rem", alignSelf: "flex-start" }}
          >
            <SwapIcon />
          </button>
          <div className="hero-name-row">
            <h2 className="hero-name">
              {isTwitter ? "@abhijitam_tw" : "Abhijitam Dubey"}
            </h2>
            <svg
              viewBox="0 0 24 24"
              aria-label="Verified"
              className={`hero-verified${isTwitter ? " hero-verified-twitter" : ""}`}
              fill="currentColor"
            >
              <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.792-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.756 2.76 1.88 3.42-.047.24-.072.49-.072.74 0 2.21 1.71 3.998 3.918 3.998.47 0 .92-.084 1.336-.25C9.182 21.585 10.49 22.5 12 22.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.792 3.918-4 0-.25-.025-.5-.072-.74 1.124-.66 1.88-1.96 1.88-3.42zm-12.722 3.1l-3.328-3.33 1.414-1.41 1.914 1.91 4.586-4.59 1.414 1.41-6 6z"></path></g>
            </svg>
          </div>
          <p className="hero-subtitle">
            {isTwitter ? "Software Developer · Builder" : <RoleFlip />}
          </p>
        </div>

      </div>

      <div className="hero-info-box">
        <InfoRow icon={<Briefcase size={13} />} text="Software Developer" />
        <InfoRow icon={<Code size={13} />} text="Full Stack · Builder" />
        <div className="hero-info-divider" />
        <div className="hero-info-grid">
          <InfoRow icon={<MapPin size={13} />} text="New Delhi, India" />
          <InfoRow icon={<Clock size={13} />} text={<><span className="info-time" suppressHydrationWarning>{istTime ?? "--:--"}</span> IST (UTC+5:30)</>} />
          <InfoRow icon={<Clock size={13} />} text={<><span className="info-time" suppressHydrationWarning>{dubaiTime ?? "--:--"}</span> Dubai (UTC+4)</>} />
          <InfoRow icon={<Clock size={13} />} text={<><span className="info-time" suppressHydrationWarning>{londonTime ?? "--:--"}</span> London (GMT)</>} />
        </div>
        <div className="hero-info-grid">
          <InfoRow icon={<Mail size={13} />} text={<a href="mailto:work.abhijitam@gmail.com" className="info-link">work.abhijitam@gmail.com</a>} />
          <InfoRow icon={<Globe size={13} />} text={<a href="https://abhijitamdubey.site" target="_blank" rel="noopener noreferrer" className="info-link">abhijitamdubey.site</a>} />
        </div>
      </div>

      <div className="hero-social-grid">
        {socialCards.map((card) => (
          <a
            key={card.platform}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hero-social-card"
          >
            <div className="hero-social-icon" style={{ backgroundColor: card.bg }}>
              {card.icon}
            </div>
            <div className="hero-social-text">
              <h3 className="hero-social-platform">{card.platform}</h3>
              <p className="hero-social-handle">{card.handle}</p>
            </div>
            <ArrowUpRight size={15} className="hero-social-arrow" />
          </a>
        ))}
      </div>
    </header>
  );
}
