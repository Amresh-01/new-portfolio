"use client";

import { useState, useEffect } from "react";

const ROLES = [
  "Software Developer",
  "Builder",
  "Open Source Contributor",
  "Founder",
  "Full Stack Engineer",
  "Solana Developer",
];

export function RoleFlip() {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const cycle = setInterval(() => {
      setPhase("out");
      const swap = setTimeout(() => {
        setCurrent((i) => (i + 1) % ROLES.length);
        setPhase("in");
      }, 380);
      return () => clearTimeout(swap);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);

  return (
    <span className={`hero-role-text hero-role-${phase}`}>
      {ROLES[current]}
    </span>
  );
}
