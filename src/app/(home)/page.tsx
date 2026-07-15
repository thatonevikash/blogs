import Link from "next/link";
import { blog } from "@/lib/source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "blog - thatonevikash",
  description:
    "I wish I know it earlier! Thoughts, deep-dives, and learning through tech.",
};

export default function HomePage() {
  const posts = blog
    .getPages()
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );

  // Fallback if no posts are published yet
  if (posts.length === 0) {
    return (
      <main className="container max-w-4xl py-24 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          No posts found
        </h1>
        <p className="mt-3 text-fd-muted-foreground">
          Check back later for updates, deep-dives, and announcements.
        </p>
      </main>
    );
  }

  // Destructure to style the latest post as a "Featured Post"
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main className="container max-w-5xl mx-auto py-12 md:py-20 space-y-12">
      {/* Page Header */}
      <header className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Upfronting
        </h1>
        <p className="text-lg text-fd-muted-foreground leading-relaxed">
          Thoughts, deep-dives, and learning through tech.
        </p>
      </header>

      <hr className="border-fd-border" />

      {/* Featured Post Card */}
      {featuredPost && (
        <article className="group relative flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-fd-primary/10 text-fd-primary">
              Latest Post
            </span>
            <time className="text-xs text-fd-muted-foreground font-medium">
              {new Date(featuredPost.data.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight group-hover:text-fd-primary transition-colors duration-200">
              <Link
                href={featuredPost.url}
                className="after:absolute after:inset-0"
              >
                {featuredPost.data.title}
              </Link>
            </h2>
            <p className="text-fd-muted-foreground leading-relaxed text-base max-w-3xl line-clamp-3">
              {featuredPost.data.description}
            </p>
          </div>
          <div className="pt-2">
            <span className="inline-flex items-center text-sm font-semibold text-fd-primary group-hover:underline gap-1">
              Read article
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </article>
      )}

      {/* Grid of Older Posts */}
      {remainingPosts.length > 0 && (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 pt-12 border-t border-fd-border/50">
          {remainingPosts.map((post) => (
            <article
              key={post.url}
              className="group relative flex flex-col space-y-3"
            >
              <time className="text-xs font-medium text-fd-muted-foreground">
                {new Date(post.data.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold tracking-tight group-hover:text-fd-primary transition-colors duration-200">
                  <Link
                    href={post.url}
                    className="after:absolute after:inset-0"
                  >
                    {post.data.title}
                  </Link>
                </h3>
                <p className="text-sm text-fd-muted-foreground line-clamp-2 leading-relaxed">
                  {post.data.description}
                </p>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center text-xs font-semibold text-fd-primary group-hover:underline gap-1">
                  Read article
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
