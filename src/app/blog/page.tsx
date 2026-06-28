import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { TagPill } from "@/components/TagPill";
import { getAllPostsMeta, getAllTags, paginatePosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Long-form writing on Next.js, distributed systems and developer experience.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? "1") || 1;
  const allPosts = getAllPostsMeta();
  const tags = getAllTags();
  const { posts, totalPages } = paginatePosts(allPosts, page, 6);

  return (
    <Container size="default" className="py-14">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-ink-dark">
          Blog
        </h1>
        <p className="mt-2 text-ink-dim dark:text-ink-dim-dark">
          {allPosts.length} posts on the things I run into building real
          software.
        </p>
        <div className="mt-6 max-w-sm">
          <SearchBar />
        </div>
      </header>

      {tags.length > 0 ? (
        <div className="mb-10 flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <TagPill key={tag} tag={tag} count={count} />
          ))}
        </div>
      ) : null}

      <div>
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={(page - 1) * 6 + i} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} basePath="/blog" />
    </Container>
  );
}
