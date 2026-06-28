import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site, siteUrl } from "@/lib/utils";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: siteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    creator: site.twitter,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} RSS feed` }],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: siteUrl("/"),
    sameAs: [site.github, `https://twitter.com/${site.twitter.replace("@", "")}`],
    jobTitle: "Software Engineer",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets the theme class before paint to avoid a light/dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
