import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built, mostly to scratch my own itch.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container size="wide" className="py-14">
      <header className="mb-10 max-w-xl">
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-ink-dark">
          Projects
        </h1>
        <p className="mt-2 text-ink-dim dark:text-ink-dim-dark">
          A mix of shipped products, internal tools, and weekend itches I
          couldn&apos;t leave alone.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
