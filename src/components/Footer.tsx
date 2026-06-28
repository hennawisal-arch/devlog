import Link from "next/link";
import { Github, Rss, Twitter } from "lucide-react";
import { Container } from "@/components/Container";
import { site } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line dark:border-line-dark">
      <Container size="wide" className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-ink-dim dark:text-ink-dim-dark">
          © {new Date().getFullYear()} {site.author} · built with Next.js & MDX
        </p>
        <div className="flex items-center gap-4 text-ink-dim dark:text-ink-dim-dark">
          <Link href="/feed.xml" aria-label="RSS feed" className="hover:text-accent dark:hover:text-accent-dark">
            <Rss size={16} />
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent dark:hover:text-accent-dark"
          >
            <Github size={16} />
          </a>
          <a
            href={`https://twitter.com/${site.twitter.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-accent dark:hover:text-accent-dark"
          >
            <Twitter size={16} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
