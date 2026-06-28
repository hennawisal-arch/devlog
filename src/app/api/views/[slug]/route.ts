import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";
import { getViewCount, incrementView } from "@/lib/views";

interface Params {
  params: { slug: string };
}

export async function POST(_request: Request, { params }: Params) {
  if (!getPostBySlug(params.slug)) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  const count = await incrementView(params.slug);
  return NextResponse.json({ count });
}

export async function GET(_request: Request, { params }: Params) {
  const count = await getViewCount(params.slug);
  return NextResponse.json({ count });
}
