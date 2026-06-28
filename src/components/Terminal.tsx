"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE: { prompt: string; output: string }[] = [
  {
    prompt: "whoami",
    output: "a developer who reads the diff before the demo",
  },
  {
    prompt: "cat focus.txt",
    output: "Next.js · TypeScript · distributed systems · developer experience",
  },
  {
    prompt: "./ship.sh",
    output: "deployed — 0 errors, 1 strong opinion",
  },
];

type Line = { type: "prompt" | "output"; text: string };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion.current) {
      setLines(
        SEQUENCE.flatMap((step) => [
          { type: "prompt" as const, text: step.prompt },
          { type: "output" as const, text: step.output },
        ])
      );
      setDone(true);
      return;
    }

    let cancelled = false;

    async function typeText(text: string) {
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        setTyping(text.slice(0, i));
        await sleep(32);
      }
    }

    async function run() {
      for (const step of SEQUENCE) {
        if (cancelled) return;
        await typeText(step.prompt);
        if (cancelled) return;
        setLines((prev) => [...prev, { type: "prompt", text: step.prompt }]);
        setTyping("");
        await sleep(220);
        if (cancelled) return;
        setLines((prev) => [...prev, { type: "output", text: step.output }]);
        await sleep(650);
      }
      if (!cancelled) setDone(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-xl border border-[#262B31] bg-[#12151A] p-5 font-mono text-[0.85rem] shadow-sm">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5635A]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8A33D]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3FCB87]/70" />
      </div>

      {lines.map((line, i) =>
        line.type === "prompt" ? (
          <div key={i} className="text-white/90">
            <span className="text-[#52DDA8]">$ </span>
            {line.text}
          </div>
        ) : (
          <div key={i} className="mb-3 animate-fade-up pl-4 text-[#9FE6B8]">
            {line.text}
          </div>
        )
      )}

      <div className="text-white/90">
        <span className="text-[#52DDA8]">$ </span>
        {!done ? typing : null}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-caret bg-white/70" />
      </div>
    </div>
  );
}
