"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, type LucideIcon } from "lucide-react";
import { LaptopMockup } from "@/components/laptop-mockup";
import { AttendancePreview, PumpPreview } from "@/components/product-preview";
import { ButtonLink, Section } from "@/components/ui";
import {
  additionalPumpModules,
  attendanceModules,
  featureFaqs,
  featureThemes,
  pumpModules,
} from "@/lib/content";
import { getFeatureIcon } from "@/lib/feature-icons";
import { cn } from "@/lib/utils";

type Module = (typeof pumpModules)[number];

const pumpBySlug = Object.fromEntries(
  [...pumpModules, ...additionalPumpModules].map((m) => [m.slug, m]),
) as Record<string, Module>;

const attendanceBySlug = Object.fromEntries(
  attendanceModules.map((m) => [m.slug, m]),
) as Record<string, Module>;

function FeatureItem({
  module,
  Icon,
}: {
  module: Module;
  Icon: LucideIcon;
}) {
  return (
    <li>
      <Link
        href={`/features/${module.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-5 text-left transition-colors hover:border-navy/20 hover:bg-[#faf9f7] sm:p-6"
      >
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </span>
        <h3 className="mt-4 text-base font-semibold tracking-tight text-navy transition-colors group-hover:text-primary">
          {module.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{module.intro}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-colors group-hover:text-primary">
          Learn more
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </span>
      </Link>
    </li>
  );
}

export default function FeaturesPage() {
  const [product, setProduct] = useState<"pump" | "attendance">("pump");
  const catalog = product === "pump" ? pumpBySlug : attendanceBySlug;
  const themes = featureThemes[product];

  const themeSections = useMemo(
    () =>
      themes.map((theme) => ({
        ...theme,
        modules: theme.slugs.map((slug) => catalog[slug]).filter(Boolean),
      })),
    [themes, catalog],
  );

  return (
    <>
      <Section className="pt-16 text-center lg:pt-20">
        <h1 className="mx-auto max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-balance text-navy sm:text-5xl lg:text-6xl">
          Powerful Features. Simpler Operations.
        </h1>
      </Section>

      <Section id="feature-catalog" className="scroll-mt-24 pt-0 text-center lg:pt-0">
        <div
          role="group"
          aria-label="Choose product features"
          className="mx-auto inline-flex w-full max-w-md flex-col gap-2 rounded-2xl border border-navy/10 bg-[#f4f3ef] p-1.5 sm:w-auto sm:max-w-none sm:flex-row"
        >
          {(
            [
              { id: "pump" as const, label: "Petrol Pump Management" },
              { id: "attendance" as const, label: "Attendance & Payroll" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={product === item.id}
              onClick={() => setProduct(item.id)}
              className={cn(
                "min-h-11 flex-1 cursor-pointer rounded-xl px-5 text-sm font-semibold transition-colors sm:px-6",
                product === item.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-transparent text-navy hover:bg-white/70",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl lg:mt-12">
          <LaptopMockup>
            {product === "pump" ? (
              <PumpPreview animated screen="Sales" />
            ) : (
              <AttendancePreview animated screen="Attendance" />
            )}
          </LaptopMockup>
        </div>
      </Section>

      <Section className="pt-10 lg:pt-14">
        <div className="space-y-14 lg:space-y-16">
          {themeSections.map((theme) => (
            <div key={theme.id} id={theme.id}>
              <h2 className="section-title mt-0 text-center text-[clamp(1.75rem,3vw,2.5rem)]">
                {theme.title}
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
                {theme.modules.map((module) => (
                  <FeatureItem
                    key={module.slug}
                    module={module}
                    Icon={getFeatureIcon(module.slug)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-14 text-center lg:py-16">
        <h2 id="features-faq-heading" className="section-title mx-auto mt-0">
          Frequently asked questions
        </h2>
        <div className="mt-10 border-t border-navy/15 text-left" aria-labelledby="features-faq-heading">
          {featureFaqs.map((faq) => (
            <details key={faq.q} className="group border-b border-navy/15">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-5 py-4 text-sm leading-6 font-medium text-navy sm:text-base">
                {faq.q}
                <Plus
                  aria-hidden="true"
                  className="faq-plus size-4 shrink-0 text-muted-foreground transition-transform duration-200"
                />
              </summary>
              <p className="pb-5 pr-8 text-sm leading-7 text-muted-foreground sm:pr-12">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="site-container pb-16 lg:pb-20">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-navy px-7 py-12 text-center sm:px-12 lg:px-16 lg:py-16">
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Ready to see these features in your station?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/products">
              Explore our products <ArrowUpRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/book-demo" variant="ghost" className="border-white/20 text-white hover:bg-white/10">
              Book a free demo
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
