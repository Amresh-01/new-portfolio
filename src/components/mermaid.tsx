'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'default' });

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      mermaid.render(`mermaid-${Math.random().toString(36).substr(2)}`, chart).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      });
    }
  }, [chart]);

  return <div className="mermaid flex justify-center my-8" ref={ref} />;
}
