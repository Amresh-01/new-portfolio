"use client";

import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function HoverBorderGradientDemo() {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-white text-black dark:bg-black dark:text-white flex items-center"
      >
        <span>Aceternity UI</span>
      </HoverBorderGradient>
    </div>
  );
}
