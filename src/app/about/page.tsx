import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "A bit about who writes this blog and what it's for.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container size="narrow" className="py-14">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-ink-dark">
        About
      </h1>

      <div className="prose-article mt-6">
        <p>
          I&apos;m {site.author}, a software engineer who spends most of the
          day in TypeScript and most of the night wondering whether the
          abstraction I just wrote was actually necessary.
        </p>
        <p>
          This site is where the answer to that question — and everything
          else I run into building real software — ends up written down.
          Most posts come out of something that broke, something that took
          longer to understand than it should have, or a decision I had to
          defend in a pull request review.
        </p>
        <h2>What I work on</h2>
        <p>
          Mostly web platforms and the infrastructure underneath them:
          Next.js on the frontend, a mix of Node.js and Rust on the backend,
          and whatever distributed-systems problem that combination
          eventually surfaces.
        </p>
        <h2>Outside of code</h2>
        <p>
          I read more nonfiction than I finish, I over-prepare for hikes,
          and I will absolutely derail a conversation to talk about whatever
          this week&apos;s blog post is about.
        </p>
        <p>
          If any of that overlaps with what you&apos;re working on, the{" "}
          <a href="/contact">contact page</a> is the fastest way to reach me.
        </p>
      </div>
    </Container>
  );
}
