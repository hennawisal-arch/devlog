"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fuseRef = useRef<Fuse<SearchEntry> | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function ensureLoaded() {
    if (loaded) return;
    const res = await fetch("/api/search");
    const data: SearchEntry[] = await res.json();
    setEntries(data);
    fuseRef.current = new Fuse(data, {
      keys: ["title", "description", "tags"],
      threshold: 0.35,
    });
    setLoaded(true);
  }

  const results =
    query.trim().length > 0 && fuseRef.current
      ? fuseRef.current.search(query).slice(0, 6).map((r) => r.item)
      : [];

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 dark:border-line-dark dark:bg-paper-dark">
        <Search size={15} className="text-ink-dim dark:text-ink-dim-dark" />
        <input
          type="text"
          value={query}
          placeholder="Search posts…"
          onFocus={() => {
            setOpen(true);
            ensureLoaded();
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim dark:text-ink-dark dark:placeholder:text-ink-dim-dark"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="text-ink-dim hover:text-ink dark:text-ink-dim-dark dark:hover:text-ink-dark"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>

      {open && query.trim().length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-80 overflow-y-auto rounded-lg border border-line bg-paper p-2 shadow-lg dark:border-line-dark dark:bg-paper-dark">
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-ink-dim dark:text-ink-dim-dark">
              {loaded ? "No posts match that search." : "Loading…"}
            </p>
          ) : (
            results.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 hover:bg-surface dark:hover:bg-surface-dark"
              >
                <p className="text-sm font-medium text-ink dark:text-ink-dark">{post.title}</p>
                <p className="font-mono text-xs text-ink-dim dark:text-ink-dim-dark">
                  {formatDate(post.date, "short")}
                </p>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
