"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur dark:border-line-dark dark:bg-paper-dark/90">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[0.95rem] font-medium text-ink dark:text-ink-dark"
            onClick={() => setOpen(false)}
          >
            <span className="text-ink-dim dark:text-ink-dim-dark">~/</span>
            devlog
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] animate-caret bg-accent dark:bg-accent-dark" />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-accent dark:hover:text-accent-dark",
                    active
                      ? "font-medium text-ink dark:text-ink-dark"
                      : "text-ink-dim dark:text-ink-dim-dark"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink dark:border-line-dark dark:text-ink-dark"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <nav className="border-t border-line bg-paper dark:border-line-dark dark:bg-paper-dark md:hidden">
          <Container size="wide" className="flex flex-col gap-1 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-ink-dim hover:bg-surface dark:text-ink-dim-dark dark:hover:bg-surface-dark"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
