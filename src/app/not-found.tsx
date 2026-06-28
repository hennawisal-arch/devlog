import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container size="narrow" className="flex flex-col items-start py-24">
      <p className="font-mono text-sm text-accent dark:text-accent-dark">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink dark:text-ink-dark">
        Nothing at this path.
      </h1>
      <p className="mt-3 text-ink-dim dark:text-ink-dim-dark">
        The page you&apos;re looking for moved, never existed, or the link has a
        typo. Try the blog index instead.
      </p>
      <Link
        href="/blog"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper hover:opacity-90 dark:bg-accent-dark dark:text-paper-dark"
      >
        Go to the blog
      </Link>
    </Container>
  );
}
