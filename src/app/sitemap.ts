import type { MetadataRoute } from "next";
import { getAllPostsMeta, getAllTags } from "@/lib/posts";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta().map((post) => ({
    url: siteUrl(`/blog/${post.slug}`),
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tags = getAllTags().map(({ tag }) => ({
    url: siteUrl(`/tags/${encodeURIComponent(tag)}`),
    changeFrequency: "weekly" as const,
    priority: 0.3,
  }));

  const staticPages = ["", "/blog", "/projects", "/about", "/contact"].map((path) => ({
    url: siteUrl(path),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  return [...staticPages, ...posts, ...tags];
}
