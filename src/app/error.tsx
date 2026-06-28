"use client";

import { useEffect } from "react";
import { Container } from "@/components/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container size="narrow" className="flex flex-col items-start py-24">
      <p className="font-mono text-sm text-diff-del dark:text-diff-delDark">Error</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink dark:text-ink-dark">
        Something broke rendering this page.
      </h1>
      <p className="mt-3 text-ink-dim dark:text-ink-dim-dark">
        It&apos;s been logged. Try again, or head back to the homepage.
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper hover:opacity-90 dark:bg-accent-dark dark:text-paper-dark"
      >
        Try again
      </button>
    </Container>
  );
}
