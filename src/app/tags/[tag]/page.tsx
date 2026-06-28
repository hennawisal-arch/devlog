import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { TagPill } from "@/components/TagPill";
import { getAllTags, getPostsByTag } from "@/lib/posts";

interface Props {
  params: { tag: string };
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `Posts tagged "${tag}"`,
    alternates: { canonical: `/tags/${params.tag}` },
  };
}

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  const tags = getAllTags();

  if (posts.length === 0) notFound();

  return (
    <Container size="default" className="py-14">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-wide text-accent dark:text-accent-dark">
          Tag
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink dark:text-ink-dark">
          #{tag}
        </h1>
        <p className="mt-2 text-ink-dim dark:text-ink-dim-dark">
          {posts.length} post{posts.length === 1 ? "" : "s"}
        </p>
      </header>

      <div className="mb-10 flex flex-wrap gap-2">
        {tags.map(({ tag: t, count }) => (
          <TagPill key={t} tag={t} count={count} active={t.toLowerCase() === tag.toLowerCase()} />
        ))}
      </div>

      <div>
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </Container>
  );
}
