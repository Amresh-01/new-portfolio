"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface HoverTagProps {
  text: string;
  imageSrc: string;
}

export function HoverTag({ text, imageSrc }: HoverTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <span
      className="hover-tag"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "pointer", position: "relative", display: "inline-block" }}
    >
      {text}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: "fixed",
              left: mousePos.x,
              top: mousePos.y,
              transform: "translate(-50%, -100%)",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "2px solid var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src={imageSrc}
                alt={text}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .hover-tag {
          color: var(--text-primary);
          font-weight: 600;
          transition: color 0.2s;
        }
        .hover-tag:hover {
          color: var(--accent);
        }
      `}</style>
    </span>
  );
}
