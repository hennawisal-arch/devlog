import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { TagPill } from "@/components/TagPill";
import { TableOfContents } from "@/components/TableOfContents";
import { ViewCounter } from "@/components/ViewCounter";
import { Comments } from "@/components/Comments";
import { PostCard } from "@/components/PostCard";
import { MdxContent } from "@/components/MdxContent";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate, site, siteUrl } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: siteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      tags: post.tags,
      images: [siteUrl(`/blog/${post.slug}/opengraph-image`)],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.author },
    mainEntityOfPage: siteUrl(`/blog/${post.slug}`),
  };

  return (
    <Container size="wide" className="py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_220px]">
        <article className="max-w-[680px]">
          <Link
            href="/blog"
            className="mb-6 inline-block font-mono text-xs text-ink-dim hover:text-accent dark:text-ink-dim-dark dark:hover:text-accent-dark"
          >
            ← all posts
          </Link>

          <header className="mb-8">
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink dark:text-ink-dark sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-dim dark:text-ink-dim-dark">
              {post.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs text-ink-dim dark:text-ink-dim-dark">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
              <span aria-hidden>·</span>
              <ViewCounter slug={post.slug} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </header>

          {post.cover ? (
            <div className="relative mb-10 aspect-[1200/630] w-full overflow-hidden rounded-xl border border-line dark:border-line-dark">
              <Image
                src={post.cover}
                alt=""
                fill
                priority
                sizes="680px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="prose-article">
            <MdxContent source={post.content} />
          </div>

          <div className="mt-14 border-t border-line pt-8 dark:border-line-dark">
            <h2 className="mb-4 font-display text-lg font-semibold text-ink dark:text-ink-dark">
              Discussion
            </h2>
            <Comments slug={post.slug} />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-line pt-10 dark:border-line-dark">
          <h2 className="mb-2 font-display text-xl font-semibold text-ink dark:text-ink-dark">
            Related posts
          </h2>
          <div>
            {related.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
