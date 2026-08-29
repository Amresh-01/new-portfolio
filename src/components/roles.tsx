"use client";

import { useEffect, useState } from "react";
import { EncryptedText } from "./ui/encrypted-text";

const roles = ["Developer", "Founder", "Freelancer"];

export function Roles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block min-w-[120px]">
      <EncryptedText
        key={roles[index]}
        text={roles[index]}
        revealDelayMs={50}
        revealedClassName="text-primary"
        encryptedClassName="text-gray-400"
      />
    </span>
  );
}
