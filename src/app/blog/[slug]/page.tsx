import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, H1, Kicker, Lead, Section } from "@/components/ui";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: blogPosts.find((p) => p.slug === slug)?.title ?? "Article" };
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <Section className="pt-20">
      <Kicker>{post.category}</Kicker>
      <H1>{post.title}</H1>
      <Lead>{post.excerpt}</Lead>
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
      <h2 className="mt-10 font-semibold text-navy">Related articles</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {related.map((r) => (
          <li key={r.slug}>
            <Link href={`/blog/${r.slug}`} className="cursor-pointer text-primary">
              {r.title}
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
