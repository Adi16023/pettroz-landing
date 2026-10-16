import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, H1, Kicker, Lead, Section } from "@/components/ui";
import { products, solutions } from "@/lib/content";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: solutions.find((s) => s.slug === slug)?.name ?? "Solution" };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const rec = s.product === "pump" ? products.pump : products.attendance;
  return (
    <Section className="pt-20">
      <Kicker>Solutions</Kicker>
      <H1>{s.name}</H1>
      <Lead>{s.blurb}</Lead>
      <p className="mt-6 text-sm">
        Recommended product: <strong>{rec.name}</strong>
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={rec.href}>Explore product</ButtonLink>
        <ButtonLink href="/book-demo" variant="navy">
          Book Demo
        </ButtonLink>
      </div>
    </Section>
  );
}
