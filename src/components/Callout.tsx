import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  info: {
    icon: Info,
    classes: "border-accent/30 bg-accent/[0.06] text-ink dark:text-ink-dark",
    iconClasses: "text-accent dark:text-accent-dark",
  },
  warn: {
    icon: AlertTriangle,
    classes: "border-rust/30 bg-rust/[0.07] text-ink dark:text-ink-dark",
    iconClasses: "text-rust dark:text-rust-dark",
  },
  tip: {
    icon: Lightbulb,
    classes: "border-line bg-surface text-ink dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark",
    iconClasses: "text-ink-dim dark:text-ink-dim-dark",
  },
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof variants;
  title?: string;
  children: ReactNode;
}) {
  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div
      className={cn(
        "not-prose my-6 flex gap-3 rounded-lg border px-4 py-3.5 text-[0.95rem] leading-relaxed",
        variant.classes
      )}
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", variant.iconClasses)} />
      <div>
        {title ? <p className="mb-1 font-semibold">{title}</p> : null}
        <div className="[&>p]:my-1.5">{children}</div>
      </div>
    </div>
  );
}
