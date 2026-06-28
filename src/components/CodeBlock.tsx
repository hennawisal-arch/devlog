"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Check, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Replaces the default <pre> rendered by rehype-pretty-code with a version
 * that has a copy button. The code's text content is read straight off the
 * DOM node, so it works regardless of how many <span> tokens Shiki split
 * the line into for syntax highlighting.
 */
export function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="group relative">
      <pre
        ref={preRef}
        {...props}
        className={cn(
          "overflow-x-auto rounded-b-lg border border-line bg-[#161A1F] px-4 py-4 text-[0.85rem] leading-relaxed dark:border-line-dark",
          props.className
        )}
      />
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 rounded-md border border-white/10 bg-white/5 p-1.5 text-white/70 opacity-0 transition-opacity hover:bg-white/10 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? <Check size={14} /> : <Clipboard size={14} />}
      </button>
    </div>
  );
}
