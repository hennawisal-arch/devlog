"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm text-accent dark:border-accent-dark/30 dark:bg-accent-dark/[0.08] dark:text-accent-dark">
        <Check size={16} /> Message sent — I&apos;ll reply as soon as I can.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-ink-dim dark:text-ink-dim-dark">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent dark:border-line-dark dark:bg-paper-dark dark:text-ink-dark dark:focus:border-accent-dark"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60 dark:bg-accent-dark dark:text-paper-dark"
      >
        {status === "loading" ? "Sending…" : "Send message"}
        {status !== "loading" ? <Send size={14} /> : null}
      </button>
      {status === "error" ? (
        <p className="text-xs text-diff-del dark:text-diff-delDark">{error}</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-ink-dim dark:text-ink-dim-dark">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent dark:border-line-dark dark:bg-paper-dark dark:text-ink-dark dark:focus:border-accent-dark"
      />
    </div>
  );
}
