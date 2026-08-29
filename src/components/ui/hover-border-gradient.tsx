"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1.8,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
  } & React.HTMLAttributes<HTMLElement>
>) {
  return (
    <Tag
      className={cn(
        "relative flex rounded-full border border-[var(--border-color)] content-center items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-hidden p-px decoration-clone w-fit transition duration-500",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto z-10 px-4 py-2 rounded-[inherit]",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className="pointer-events-none absolute -inset-1 z-0 rounded-[inherit]"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(50,117,248,0) 0deg, rgba(50,117,248,0) 255deg, rgba(50,117,248,0.95) 295deg, rgba(50,117,248,0) 335deg, rgba(50,117,248,0) 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration, repeat: Number.POSITIVE_INFINITY }}
      />
      <div className="bg-[var(--bg-secondary)] absolute z-[1] flex-none inset-[1px] rounded-[100px]" />
    </Tag>
  );
}
