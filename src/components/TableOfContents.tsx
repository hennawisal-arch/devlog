"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article h2, article h3")
    );
    setHeadings(
      nodes.map((node) => ({
        id: node.id,
        text: node.textContent ?? "",
        level: node.tagName === "H2" ? 2 : 3,
      }))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-dim dark:text-ink-dim-dark">
        On this page
      </p>
      <ul className="space-y-2 border-l border-line dark:border-line-dark">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l pl-3 transition-colors",
                activeId === heading.id
                  ? "border-accent font-medium text-accent dark:border-accent-dark dark:text-accent-dark"
                  : "border-transparent text-ink-dim hover:text-ink dark:text-ink-dim-dark dark:hover:text-ink-dark"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
