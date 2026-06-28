"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm text-accent dark:text-accent-dark">
        <Check size={16} /> You&apos;re on the list — look out for the next post.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-accent dark:border-line-dark dark:bg-paper-dark dark:text-ink-dark dark:focus:border-accent-dark"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60 dark:bg-accent-dark dark:text-paper-dark"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
          {status !== "loading" ? <ArrowRight size={14} /> : null}
        </button>
      </form>
      {status === "error" ? (
        <p className="mt-2 text-xs text-diff-del dark:text-diff-delDark">{error}</p>
      ) : null}
    </div>
  );
}
