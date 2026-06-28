import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Terminal } from "@/components/Terminal";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAllPostsMeta } from "@/lib/posts";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const posts = getAllPostsMeta().slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <section className="border-b border-line py-16 dark:border-line-dark sm:py-24">
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-accent dark:text-accent-dark">
                Software engineer · writing in public
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink dark:text-ink-dark sm:text-5xl">
                Notes from a working developer.
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-dim dark:text-ink-dim-dark">
                Long-form technical writing on Next.js, distributed systems
                and developer experience, plus the projects that came out of
                each rabbit hole.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 dark:bg-accent-dark dark:text-paper-dark"
                >
                  Read the blog <ArrowRight size={14} />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent dark:border-line-dark dark:text-ink-dark dark:hover:border-accent-dark dark:hover:text-accent-dark"
                >
                  See projects
                </Link>
              </div>
            </div>

            <Terminal />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark">
              Recent posts
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-ink-dim hover:text-accent dark:text-ink-dim-dark dark:hover:text-accent-dark"
            >
              All posts <ArrowUpRight size={14} />
            </Link>
          </div>
          <div>
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 dark:border-line-dark sm:py-20">
        <Container size="wide">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-ink-dim hover:text-accent dark:text-ink-dim-dark dark:hover:text-accent-dark"
            >
              All projects <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 dark:border-line-dark sm:py-20">
        <Container size="default">
          <div className="rounded-2xl border border-line bg-surface p-8 dark:border-line-dark dark:bg-surface-dark sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark">
              Get new posts by email
            </h2>
            <p className="mt-2 max-w-md text-ink-dim dark:text-ink-dim-dark">
              One email per post, no drip campaign. Unsubscribe whenever.
            </p>
            <div className="mt-5 max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
