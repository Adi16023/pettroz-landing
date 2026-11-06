import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { ButtonLink, H1, Kicker, Lead, Section } from "@/components/ui";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const [featured, ...articles] = blogPosts;

  return (
    <Section className="pt-16 lg:pt-20">
      <header className="flex flex-col gap-7 border-b border-navy/10 pb-9 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Kicker>Blog</Kicker>
          <H1>Pettroz Notes</H1>
          <Lead className="mt-4">Practical ideas for running better fuel stations and teams.</Lead>
        </div>
        <ButtonLink href="/products" variant="ghost" className="self-start sm:mb-1 sm:self-auto">
          Explore Pettroz <ArrowUpRight aria-hidden="true" className="size-4" />
        </ButtonLink>
      </header>

      <section className="py-9" aria-labelledby="featured-article">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-navy/10 bg-white transition-colors hover:border-primary/30 md:grid-cols-2"
        >
          <BlogThumbnail category={featured.category} title={featured.title} className="h-full min-h-56 rounded-none md:aspect-auto" />
          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">{featured.category}</p>
            <h2 id="featured-article" className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.035em] text-navy sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
              Read article
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </section>

      <section aria-labelledby="latest-articles" className="max-w-5xl">
        <h2 id="latest-articles" className="text-xl font-semibold tracking-tight text-navy">Latest articles</h2>
        <div className="mt-3 border-t border-navy/10">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group grid gap-5 border-b border-navy/10 py-6 transition-colors hover:bg-white/60 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center sm:gap-8 sm:py-7"
            >
              <div>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">{article.category}</p>
                <h3 className="mt-2 text-lg leading-snug font-semibold tracking-tight text-navy group-hover:text-primary sm:text-xl">
                  {article.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
              </div>
              <BlogThumbnail category={article.category} title={article.title} className="w-full sm:order-last" />
            </Link>
          ))}
        </div>
      </section>
    </Section>
  );
}
