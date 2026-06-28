import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/types/post";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, index }: { post: PostMeta; index?: number }) {
  return (
    <article className="group border-b border-line py-7 first:pt-0 last:border-b-0 dark:border-line-dark">
      <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        {post.cover ? (
          <div className="relative aspect-[1200/630] w-full shrink-0 overflow-hidden rounded-lg border border-line dark:border-line-dark sm:w-48">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(min-width: 640px) 192px, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3 font-mono text-xs text-ink-dim dark:text-ink-dim-dark">
            {typeof index === "number" ? (
              <span className="text-accent dark:text-accent-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <time dateTime={post.date}>{formatDate(post.date, "short")}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h3 className="flex items-start gap-2 font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent dark:text-ink-dark dark:group-hover:text-accent-dark">
            {post.title}
            <ArrowUpRight
              size={16}
              className="mt-2 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            />
          </h3>

          <p className="text-[0.95rem] leading-relaxed text-ink-dim dark:text-ink-dim-dark">
            {post.description}
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] text-ink-dim dark:border-line-dark dark:text-ink-dim-dark"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
