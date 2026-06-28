import { NextResponse } from "next/server";
import { getAllPostsMeta } from "@/lib/posts";

export async function GET() {
  const posts = getAllPostsMeta().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags,
    date: post.date,
  }));

  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
    },
  });
}
