"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Wraps giscus (https://giscus.app) — GitHub-Discussions-backed comments
 * with no separate database to run. Renders nothing until the four
 * NEXT_PUBLIC_GISCUS_* env vars are set, so the feature is fully optional.
 */
export function Comments({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  const configured = repo && repoId && category && categoryId;

  useEffect(() => {
    if (!configured || !ref.current) return;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo!);
    script.setAttribute("data-repo-id", repoId!);
    script.setAttribute("data-category", category!);
    script.setAttribute("data-category-id", categoryId!);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", slug);
    script.setAttribute("data-theme", theme === "dark" ? "dark_dimmed" : "light");
    script.setAttribute("data-emit-metadata", "0");

    ref.current.appendChild(script);
  }, [configured, repo, repoId, category, categoryId, slug, theme]);

  if (!configured) {
    return (
      <p className="rounded-lg border border-dashed border-line p-4 text-sm text-ink-dim dark:border-line-dark dark:text-ink-dim-dark">
        Comments are powered by giscus and are disabled until the
        <code className="mx-1 rounded bg-surface px-1.5 py-0.5 font-mono text-xs dark:bg-surface-dark">
          NEXT_PUBLIC_GISCUS_*
        </code>
        environment variables are set. See <code className="font-mono">.env.example</code>.
      </p>
    );
  }

  return <div ref={ref} />;
}
