import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Pre } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { cn } from "@/lib/utils";

type ImgProps = ComponentPropsWithoutRef<"img">;
type AnchorProps = ComponentPropsWithoutRef<"a">;

export const mdxComponents = {
  pre: Pre,
  Callout,
  a: ({ href = "", children, ...props }: AnchorProps) => {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent dark:text-accent-dark dark:decoration-accent-dark/30 dark:hover:decoration-accent-dark"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent dark:text-accent-dark dark:decoration-accent-dark/30 dark:hover:decoration-accent-dark"
        {...props}
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt = "", width, height, ...props }: ImgProps) => {
    if (!src) return null;
    return (
      <span className="my-8 block overflow-hidden rounded-lg border border-line dark:border-line-dark">
        <Image
          src={src}
          alt={alt}
          width={typeof width === "number" ? width : 1200}
          height={typeof height === "number" ? height : 675}
          className="h-auto w-full"
          sizes="(min-width: 768px) 700px, 100vw"
        />
      </span>
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "my-6 border-l-2 border-accent/40 pl-4 italic text-ink-dim dark:border-accent-dark/40 dark:text-ink-dim-dark"
      )}
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-line dark:border-line-dark">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
};
