import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6",
        size === "narrow" && "max-w-[680px]",
        size === "default" && "max-w-[840px]",
        size === "wide" && "max-w-[1100px]",
        className
      )}
    >
      {children}
    </div>
  );
}
