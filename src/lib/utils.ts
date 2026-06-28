import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string, style: "long" | "short" = "long") {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  }).format(date);
}

export function siteUrl(pathname = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return new URL(pathname, base).toString();
}

export const site = {
  name: "devlog",
  title: "devlog — notes from a working developer",
  description:
    "An MDX-powered developer blog and portfolio: long-form technical writing, project case studies, and the occasional strong opinion.",
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Henna Wisal",
  twitter: process.env.NEXT_PUBLIC_AUTHOR_TWITTER ?? "@yourhandle",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/yourname",
  locale: "en-US",
};
