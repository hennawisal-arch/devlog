import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostFrontmatter, PostMeta } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPostFile(slug: string): { frontmatter: PostFrontmatter; content: string } {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PostFrontmatter, content };
}

const includeDrafts = process.env.NODE_ENV !== "production";

/** All published posts (drafts included outside production), newest first. */
export function getAllPosts(): Post[] {
  return readSlugs()
    .map((slug) => {
      const { frontmatter, content } = readPostFile(slug);
      const stats = readingTime(content);
      return {
        slug,
        ...frontmatter,
        tags: frontmatter.tags ?? [],
        readingTime: stats.text,
        wordCount: stats.words,
        content,
      };
    })
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Lightweight metadata for listing pages — no MDX body included. */
export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  return getAllPostsMeta()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export interface PaginatedPosts {
  posts: PostMeta[];
  page: number;
  totalPages: number;
  totalPosts: number;
}

export function paginatePosts(
  posts: PostMeta[],
  page = 1,
  perPage = 6
): PaginatedPosts {
  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    page: safePage,
    totalPages,
    totalPosts,
  };
}
