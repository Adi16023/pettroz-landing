import type { Metadata } from "next";
import Link from "next/link";
import { Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const cats = Array.from(new Set(blogPosts.map((p) => p.category)));
  return (
    <Section className="pt-20">
      <Kicker>Blog</Kicker>
      <H1>Insights, Guides & Updates from Pettroz.</H1>
      <Lead>Guides on pump operations, inventory, attendance, payroll, and product updates.</Lead>
      <p className="mt-4 text-sm text-muted-foreground">Categories: {cats.join(" · ")}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="cursor-pointer">
            <Card className="h-full hover:border-primary">
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">{p.category}</p>
              <h2 className="mt-2 text-lg font-semibold text-navy">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
