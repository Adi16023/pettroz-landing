import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ButtonLink, Section } from "@/components/ui";
import {
  fuelBrandPageContent,
  fuelStationBrands,
  products,
  solutions,
} from "@/lib/content";

export function generateStaticParams() {
  return [
    ...fuelStationBrands.map((brand) => ({ slug: brand.slug })),
    ...solutions.map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const brand = fuelStationBrands.find((b) => b.slug === slug);
  if (brand) return { title: `${brand.name} Petrol Pump Management Software` };
  return { title: solutions.find((s) => s.slug === slug)?.name ?? "Solution" };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const brand = fuelStationBrands.find((b) => b.slug === slug);

  if (brand) {
    const article = fuelBrandPageContent;

    return (
      <>
        <Section className="pt-16 lg:pt-20">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All solutions
          </Link>

          <article className="mt-10 w-full sm:mt-12">
            <header className="border-b border-navy/15 pb-10 text-center">
              <div className="mx-auto flex h-16 w-full max-w-[12rem] items-center justify-center">
                <Image
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  width={180}
                  height={72}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Solutions
              </p>
              <h1 className="mt-4 text-4xl leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-navy sm:text-5xl lg:text-6xl">
                {brand.name} Petrol Pump Management Software
              </h1>
              <p className="mx-auto mt-5 max-w-4xl text-lg leading-[1.7] text-muted-foreground">
                {article.dek}
              </p>
              <p className="mt-6 text-sm text-navy/60">
                For {brand.name} dealers and fuel station operators across India
              </p>
            </header>

            <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
              {article.sections.map((section, index) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 grid gap-5 text-base leading-[1.85] text-muted-foreground sm:text-[1.05rem] sm:leading-[1.9] lg:grid-cols-2 lg:gap-x-12 lg:gap-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {index === 2 ? (
                    <blockquote className="mt-8 border-l-2 border-primary pl-5 text-xl leading-relaxed font-semibold tracking-[-0.02em] text-navy sm:text-2xl lg:max-w-4xl">
                      {article.pullQuote}
                    </blockquote>
                  ) : null}
                </section>
              ))}

              <section className="border-t border-navy/15 pt-10">
                <p className="max-w-4xl text-base leading-[1.85] text-muted-foreground sm:text-[1.05rem] sm:leading-[1.9]">
                  {article.closing}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/book-demo">
                    Book a free demo <ArrowUpRight className="size-4" />
                  </ButtonLink>
                  <ButtonLink href={products.pump.href} variant="navy">
                    Explore Petrol Pump Management
                  </ButtonLink>
                </div>
              </section>

              <aside className="rounded-2xl border border-navy/10 bg-[#f4f3ef] p-5 text-xs leading-6 text-muted-foreground sm:p-6">
                {article.disclaimer}
              </aside>
            </div>
          </article>
        </Section>
      </>
    );
  }

  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const rec = s.product === "pump" ? products.pump : products.attendance;

  return (
    <Section className="pt-20">
      <Link
        href="/solutions"
        className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        All solutions
      </Link>
      <h1 className="mt-8 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-navy sm:text-5xl">
        {s.name}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted-foreground">{s.blurb}</p>
      <p className="mt-6 text-sm text-navy">
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
