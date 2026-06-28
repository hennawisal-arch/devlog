import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container size="narrow" className="py-14">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-ink-dark">
        Contact
      </h1>
      <p className="mt-3 max-w-md text-ink-dim dark:text-ink-dim-dark">
        Questions, corrections, or just want to talk about a post — this
        goes straight to {site.author}.
      </p>

      <div className="mt-8 max-w-md">
        <ContactForm />
      </div>
    </Container>
  );
}
