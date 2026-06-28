"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data: { count: number }) => {
        if (!cancelled) setCount(data.count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-dim dark:text-ink-dim-dark">
      <Eye size={13} />
      {count === null ? "—" : count.toLocaleString()} views
    </span>
  );
}
