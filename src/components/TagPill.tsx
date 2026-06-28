import Link from "next/link";
import { cn } from "@/lib/utils";

export function TagPill({
  tag,
  active = false,
  count,
}: {
  tag: string;
  active?: boolean;
  count?: number;
}) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors",
        active
          ? "border-accent bg-accent text-paper dark:border-accent-dark dark:bg-accent-dark dark:text-paper-dark"
          : "border-line text-ink-dim hover:border-accent hover:text-accent dark:border-line-dark dark:text-ink-dim-dark dark:hover:border-accent-dark dark:hover:text-accent-dark"
      )}
    >
      #{tag}
      {typeof count === "number" ? <span className="opacity-60">{count}</span> : null}
    </Link>
  );
}
