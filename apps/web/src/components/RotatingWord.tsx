"use client";

import { useEffect, useState } from "react";

export function RotatingWord({ words }: { words: readonly string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <>
      <span key={i} aria-hidden="true" className="word-in inline-block text-accent">
        {words[i]}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </>
  );
}
