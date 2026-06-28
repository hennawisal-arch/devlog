import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  return (
    <nav className="mt-10 flex items-center justify-between" aria-label="Pagination">
      <PaginationLink
        href={pageHref(page - 1)}
        disabled={page <= 1}
        label="Newer"
        icon={<ChevronLeft size={14} />}
        iconFirst
      />
      <span className="font-mono text-xs text-ink-dim dark:text-ink-dim-dark">
        page {page} / {totalPages}
      </span>
      <PaginationLink
        href={pageHref(page + 1)}
        disabled={page >= totalPages}
        label="Older"
        icon={<ChevronRight size={14} />}
      />
    </nav>
  );
}

function PaginationLink({
  href,
  disabled,
  label,
  icon,
  iconFirst,
}: {
  href: string;
  disabled: boolean;
  label: string;
  icon: React.ReactNode;
  iconFirst?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
    disabled
      ? "cursor-not-allowed border-line text-ink-dim/40 dark:border-line-dark dark:text-ink-dim-dark/40"
      : "border-line text-ink-dim hover:border-accent hover:text-accent dark:border-line-dark dark:text-ink-dim-dark dark:hover:border-accent-dark dark:hover:text-accent-dark"
  );

  if (disabled) {
    return (
      <span className={classes}>
        {iconFirst ? icon : null}
        {label}
        {!iconFirst ? icon : null}
      </span>
    );
  }

  return (
    <Link href={href} className={classes}>
      {iconFirst ? icon : null}
      {label}
      {!iconFirst ? icon : null}
    </Link>
  );
}
