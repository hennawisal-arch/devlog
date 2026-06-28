import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Post cover image";

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  // If the post ships a designed static cover (see public/images/covers),
  // serve that file directly so the OG image and the in-app cover always
  // match. Posts without one fall through to the generated design below,
  // so every post gets a real OG image with zero extra work.
  if (post?.cover) {
    try {
      const filePath = path.join(process.cwd(), "public", post.cover);
      const bytes = await readFile(filePath);
      return new Response(bytes, {
        headers: { "Content-Type": "image/png" },
      });
    } catch {
      // fall through to the generated version if the file is missing
    }
  }

  const title = post?.title ?? site.name;
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0E1115",
          color: "#EAE7DE",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: 26,
            color: "#52DDA8",
          }}
        >
          <span>~/devlog</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div style={{ fontSize: 58, fontWeight: 600, lineHeight: 1.15, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#979CA3",
                  border: "1px solid #272C32",
                  borderRadius: 999,
                  padding: "6px 16px",
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#979CA3" }}>
          {site.author}
        </div>
      </div>
    ),
    { ...size }
  );
}
