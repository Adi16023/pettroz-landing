import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { ButtonLink, H1, Kicker, Lead, Section } from "@/components/ui";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  return { title: post?.title ?? "Article" };
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();
  const related = (await fetchBlogPosts()).filter((item) => item.slug !== post.slug).slice(0, 3);
  const hasHtml = Boolean(post.bodyHtml && post.bodyHtml.replace(/<[^>]+>/g, "").trim());

  return (
    <Section className="pt-20">
      <Kicker>{post.category}</Kicker>
      <H1>{post.title}</H1>
      {post.subtitle ? <p className="mt-3 max-w-2xl text-lg text-navy/70">{post.subtitle}</p> : null}
      <Lead>{post.excerpt}</Lead>
      <BlogThumbnail
        category={post.category}
        title={post.title}
        coverUrl={post.coverUrl}
        className="mt-8 max-w-4xl"
      />
      {hasHtml ? (
        <article
          className="blog-prose mt-8 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml ?? "" }}
        />
      ) : (
        <article className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Pettroz is built so this kind of work lives in the product instead of a side register.
            Fuel stations use Petrol Pump Management for the operational day. Any business can use
            Attendance & Payroll on its own.
          </p>
          <p>
            Start with the module that matches this topic, keep role-based access tight, and export
            Excel or PDF when someone still needs a paper copy.
          </p>
        </article>
      )}
      <h2 className="mt-10 font-semibold text-navy">Related articles</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {related.map((item) => (
          <li key={item.slug}>
            <Link href={`/blog/${item.slug}`} className="cursor-pointer text-primary">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href="/book-demo">Book Demo</ButtonLink>
      </div>
    </Section>
  );
}
