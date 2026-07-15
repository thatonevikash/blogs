import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blog } from "@/lib/source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) return {};

  const title = page.data.title;
  const description = page.data.description;
  const publishedTime = new Date(page.data.date).toISOString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      authors: [page.data.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  const Mdx = page.data.body;
  const toc = page.data.toc; // Handled dynamically by Fumadocs

  return (
    <article className="container max-w-3xl mx-auto py-12 md:py-16 px-4">
      {/* Back to Blog */}
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors duration-200 mb-8"
      >
        <span className="transition-transform duration-200 group-hover:-translate-x-1">
          ←
        </span>
        Back to blog
      </Link>

      {/* Hero Header */}
      <header className="space-y-4 mb-10 pb-8 border-b border-fd-border">
        <div className="flex items-center gap-2 text-xs font-medium text-fd-muted-foreground">
          <span className="font-semibold text-fd-foreground">
            {page.data.author}
          </span>
          <span>•</span>
          <time dateTime={new Date(page.data.date).toISOString()}>
            {new Date(page.data.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          {page.data.title}
        </h1>

        {page.data.description && (
          <p className="text-lg md:text-xl text-fd-muted-foreground leading-relaxed pt-2">
            {page.data.description}
          </p>
        )}
      </header>

      {/* Conditional Table of Contents */}
      {toc && toc.length > 0 && (
        <div className="mb-10 p-5 rounded-xl border border-fd-border bg-fd-muted/30">
          <p className="font-semibold text-sm mb-3">On this page</p>
          <InlineTOC items={toc} />
        </div>
      )}

      {/* Main Content Body */}
      <div className="prose prose-fd dark:prose-invert max-w-none">
        <Mdx components={defaultMdxComponents} />
      </div>
    </article>
  );
}

// Static Site Generation (SSG) mapping
export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}
