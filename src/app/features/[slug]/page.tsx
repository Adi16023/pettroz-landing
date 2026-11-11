import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { ButtonLink, Section } from "@/components/ui";
import { allFeatures } from "@/lib/content";
import { getFeatureIcon } from "@/lib/feature-icons";

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

  const Icon = getFeatureIcon(feature.slug);
  const related = allFeatures
    .filter((f) => f.product === feature.product && f.slug !== feature.slug)
    .slice(0, 3);

  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <div className="text-left">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All features
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-center text-center sm:mt-12">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon aria-hidden="true" className="size-7" strokeWidth={1.6} />
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-balance text-navy sm:text-5xl lg:text-6xl">
            {feature.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted-foreground sm:text-lg">
            {feature.intro}
          </p>
        </div>
      </Section>

      <Section className="pt-4 text-center lg:pt-6">
        <h2 className="section-title mt-0 text-[clamp(1.75rem,3vw,2.5rem)]">
          Key capabilities
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
          {feature.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-5 text-left sm:p-6"
            >
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Check aria-hidden="true" className="size-4" strokeWidth={2} />
              </span>
              <p className="text-sm leading-6 font-medium text-navy sm:text-base sm:leading-7">{item}</p>
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 ? (
        <Section className="pt-10 text-center lg:pt-14">
          <h2 className="section-title mt-0 text-[clamp(1.75rem,3vw,2.5rem)]">
            Related features
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
            {related.map((item) => {
              const RelatedIcon = getFeatureIcon(item.slug);
              return (
                <li key={item.slug}>
                  <Link
                    href={`/features/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-5 text-left transition-colors hover:border-navy/20 hover:bg-[#faf9f7] sm:p-6"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <RelatedIcon aria-hidden="true" className="size-4" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold tracking-tight text-navy transition-colors group-hover:text-primary">
                      {item.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{item.intro}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-colors group-hover:text-primary">
                      Learn more
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      ) : null}

      <section className="site-container pb-16 lg:pb-20">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-navy px-7 py-12 text-center sm:px-12 lg:px-16 lg:py-16">
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            See {feature.name} in a live demo
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book-demo">
              Book a free demo <ArrowUpRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/features" variant="ghost" className="border-white/20 text-white hover:bg-white/10">
              Browse all features
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
