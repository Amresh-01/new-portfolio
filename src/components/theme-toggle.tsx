"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ThemeTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => ThemeViewTransition;
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle theme">
        <div style={{ width: 24, height: 24 }} />
      </button>
    );
  }

  const triggerWaveTransition = () => {
    if (isTransitioning) return;

    const activeTheme = resolvedTheme ?? theme ?? "light";
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const themedDocument = document as ThemeTransitionDocument;
    const endTransition = () => {
      root.classList.remove("theme-color-transition", "theme-reveal-active");
      setIsTransitioning(false);
    };

    setIsTransitioning(true);
    root.classList.add("theme-color-transition");

    if (themedDocument.startViewTransition) {
      const viewTransition = themedDocument.startViewTransition(() => {
        setTheme(nextTheme);
      });

      viewTransition.ready
        .then(() => {
          root.classList.add("theme-reveal-active");
        })
        .catch(() => {});

      viewTransition.finished.finally(endTransition);
      return;
    }

    setTheme(nextTheme);
    window.setTimeout(endTransition, 300);
  };

  return (
    <button
      className="theme-toggle"
      onClick={triggerWaveTransition}
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="sun-icon" />
      ) : (
        <Moon className="moon-icon" />
      )}
    </button>
  );
}
