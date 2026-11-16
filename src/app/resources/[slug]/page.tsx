import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { ButtonLink, Section } from "@/components/ui";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) return { title: "Article" };
  const description = post.excerpt?.trim() || undefined;
  const keywords = (post.tags ?? []).map((tag) => tag.trim()).filter(Boolean);
  return {
    title: post.title,
    description,
    keywords: keywords.length ? keywords : undefined,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
    twitter: {
      card: post.coverUrl ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: post.coverUrl ? [post.coverUrl] : undefined,
    },
  };
}

function formatPublishedAt(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ResourcesArticlePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();
  const related = (await fetchBlogPosts()).filter((item) => item.slug !== post.slug).slice(0, 3);
  const hasHtml = Boolean(post.bodyHtml && post.bodyHtml.replace(/<[^>]+>/g, "").trim());
  const publishedLabel = formatPublishedAt(post.publishedAt);
  const tags = (post.tags ?? []).map((tag) => tag.trim()).filter(Boolean);

  return (
    <>
      <header className="relative isolate w-full overflow-hidden bg-navy">
        <BlogThumbnail
          category={post.category}
          title={post.title}
          coverUrl={post.coverUrl}
          className="aspect-[32/9] min-h-[11rem] rounded-none sm:min-h-[14rem] lg:min-h-[16rem]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25"
        />

        <div className="absolute inset-0 flex flex-col">
          <nav aria-label="Breadcrumb" className="site-container pt-6 sm:pt-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link
                  href="/resources"
                  className="font-medium text-white transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                <ChevronRight className="size-3.5" />
              </li>
              <li className="min-w-0 truncate font-medium text-white/65" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="site-container mt-auto max-w-4xl pb-6 pt-10 sm:pb-8 lg:pb-9">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/75 uppercase">
              {post.category}
            </p>
            <h1 className="mt-2 max-w-4xl text-2xl leading-[1.1] font-semibold tracking-[-0.04em] text-balance text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.subtitle ? (
              <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">{post.subtitle}</p>
            ) : null}
            {tags.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="font-semibold text-white">Petrozz</span>
              {publishedLabel ? (
                <>
                  <span aria-hidden="true" className="text-white/40">
                    ·
                  </span>
                  <time dateTime={post.publishedAt ?? undefined}>{publishedLabel}</time>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <Section className="pt-12 lg:pt-16">
        <div className="mx-auto max-w-5xl text-left">
          {hasHtml ? (
            <article
              className="blog-prose w-full"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml ?? "" }}
            />
          ) : (
            <article className="w-full space-y-4 text-left text-sm leading-relaxed text-muted-foreground">
              <p>
                Petrozz is built so this kind of work lives in the product instead of a side register.
                Fuel stations use Petrol Pump Management for the operational day. Any business can use
                Attendance & Payroll on its own.
              </p>
              <p>
                Start with the module that matches this topic, keep role-based access tight, and export
                Excel or PDF when someone still needs a paper copy.
              </p>
            </article>
          )}
          {related.length > 0 ? (
            <>
              <h2 className="mt-10 font-semibold text-navy">Related articles</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/resources/${item.slug}`} className="cursor-pointer text-primary">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <div className="mt-8">
            <ButtonLink href="/book-demo">Book Demo</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
