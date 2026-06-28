import type { Project } from "@/types/post";

export const projects: Project[] = [
  {
    slug: "devlog",
    title: "devlog — this site",
    description:
      "The MDX-powered blog and portfolio you're looking at right now: static MDX posts, dynamic OG images, RSS, sitemap, search, and a from-scratch design system on Tailwind.",
    stack: ["Next.js", "TypeScript", "MDX", "Tailwind"],
    repo: "https://github.com/yourname/devlog",
    featured: true,
    year: 2026,
  },
  {
    slug: "pipeline-visualizer",
    title: "Pipeline Visualizer",
    description:
      "A real-time dashboard for CI/CD pipelines — streams build events over WebSockets and renders a live dependency graph of jobs as they run.",
    stack: ["React", "Node.js", "WebSockets", "D3"],
    href: "https://example.com",
    repo: "https://github.com/yourname/pipeline-visualizer",
    featured: true,
    year: 2025,
  },
  {
    slug: "queue-bench",
    title: "queue-bench",
    description:
      "A small CLI for load-testing message queues. Generates configurable producer/consumer workloads and reports latency percentiles, not just averages.",
    stack: ["Rust", "Tokio", "CLI"],
    repo: "https://github.com/yourname/queue-bench",
    featured: true,
    year: 2025,
  },
  {
    slug: "schema-diff",
    title: "schema-diff",
    description:
      "Compares two Postgres schemas and generates a human-readable migration plan instead of a raw SQL dump — built after one too many silent column drops.",
    stack: ["TypeScript", "PostgreSQL", "Node.js"],
    repo: "https://github.com/yourname/schema-diff",
    year: 2024,
  },
];
