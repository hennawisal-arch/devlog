import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/types/post";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40 dark:border-line-dark dark:bg-surface-dark dark:hover:border-accent-dark/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-ink-dark">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-ink-dim dark:text-ink-dim-dark">
          {project.year}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-ink-dim dark:text-ink-dim-dark">
        {project.description}
      </p>

      <div className="mt-1 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] text-ink-dim dark:border-line-dark dark:text-ink-dim-dark"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-4">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:opacity-80 dark:text-accent-dark"
          >
            Live site <ArrowUpRight size={14} />
          </a>
        ) : null}
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-ink-dim hover:text-ink dark:text-ink-dim-dark dark:hover:text-ink-dark"
          >
            <Github size={14} /> Source
          </a>
        ) : null}
      </div>
    </article>
  );
}
