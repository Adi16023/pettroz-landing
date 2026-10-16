import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { allFeatures, products } from "@/lib/content";

export function generateStaticParams() {
  return allFeatures.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const feature = allFeatures.find((f) => f.slug === slug);
  return { title: feature?.name ?? "Feature" };
}

export default async function FeatureDetailPage({ params }: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const feature = allFeatures.find((f) => f.slug === slug);
  if (!feature) notFound();
  const product = feature.product === "pump" ? products.pump : products.attendance;
  const related = allFeatures.filter((f) => f.product === feature.product && f.slug !== feature.slug).slice(0, 3);

  return (
    <Section className="pt-20">
      <Kicker>{product.name}</Kicker>
      <H1>{feature.name}</H1>
      <Lead>{feature.intro}</Lead>
      <Card className="mt-8">
        <h2 className="font-semibold text-navy">The business problem it solves</h2>
        <p className="mt-2 text-sm text-muted-foreground">{feature.problem}</p>
      </Card>
      <h2 className="mt-10 text-xl font-semibold text-navy">Key capabilities</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {feature.items.map((item) => (
          <li key={item} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
            {item}
          </li>
        ))}
      </ul>
      <h2 className="mt-10 text-xl font-semibold text-navy">How it works</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Configure the module for your outlet or branch, capture the day’s activity as it happens,
        then review and export reports. Role-based access keeps each employee on the screens they
        need.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-navy">Related features</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {related.map((r) => (
          <Card key={r.slug} className="p-4">
            <p className="font-medium text-navy">{r.name}</p>
            <ButtonLink href={`/features/${r.slug}`} variant="navy" className="mt-3 h-9 text-xs">
              Learn More
            </ButtonLink>
          </Card>
        ))}
      </div>
      <h2 className="mt-10 text-xl font-semibold text-navy">FAQ</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Need to see this live? Book a product demo and we will walk through this module with your
        team.
      </p>
      <div className="mt-8">
        <ButtonLink href="/book-demo">Book Demo</ButtonLink>
      </div>
    </Section>
  );
}
