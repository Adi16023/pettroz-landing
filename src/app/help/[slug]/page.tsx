import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, H1, Kicker, Lead, Section } from "@/components/ui";
import { helpArticles } from "@/lib/content";

export function generateStaticParams() {
  return helpArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: helpArticles.find((a) => a.slug === slug)?.title ?? "Help" };
}

export default async function HelpArticlePage({ params }: PageProps<"/help/[slug]">) {
  const { slug } = await params;
  const article = helpArticles.find((a) => a.slug === slug);
  if (!article) notFound();
  const related = helpArticles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 4);
  return (
    <Section className="pt-20">
      <Kicker>{article.category}</Kicker>
      <H1>{article.title}</H1>
      <Lead>
        Step-by-step setup for {article.title.toLowerCase()} in Pettroz. Screenshots and video
        walkthroughs will be added as the help library grows.
      </Lead>
      <ol className="mt-8 list-decimal space-y-3 pl-5 text-sm">
        <li>Open the matching Pettroz workspace for this product.</li>
        <li>Use role-based access so only the right people can change settings.</li>
        <li>Complete the first-time configuration, then verify with a test record.</li>
        <li>Export or print if you need a paper copy for the shift or payroll file.</li>
      </ol>
      <h2 className="mt-10 font-semibold text-navy">Related articles</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {related.map((r) => (
          <li key={r.slug}>
            <Link href={`/help/${r.slug}`} className="cursor-pointer text-primary">
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href="/contact">Contact Support</ButtonLink>
      </div>
    </Section>
  );
}
