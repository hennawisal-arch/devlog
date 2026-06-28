export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft?: boolean;
  cover?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
  wordCount: number;
}

export interface Post extends PostMeta {
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
  year: number;
}
