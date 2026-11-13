import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Section } from "@/components/ui";
import {
  fuelStationBrands,
  petrolPumpSolutions,
  products,
} from "@/lib/content";

export const metadata: Metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <>
      <Section className="pt-16 text-center lg:pt-20">
        <h1 className="mx-auto max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-balance text-navy sm:text-5xl lg:text-6xl">
          Every business challenge deserves a smarter solution.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-[1.8] text-muted-foreground sm:text-lg">
          Practical software for petrol pumps and growing teams—built around everyday work.
        </p>
      </Section>

      <Section className="pt-6 lg:pt-8">
        <h2 className="section-title mt-0 text-center text-[clamp(1.75rem,3vw,2.5rem)]">
          For petrol pump businesses
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
          {petrolPumpSolutions.map((solution) => (
            <li key={solution.name}>
              <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-5 text-left sm:p-6">
                <h3 className="text-lg font-semibold tracking-tight text-navy">{solution.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {solution.idealFor}
                </p>
                <ButtonLink href={products.pump.href} variant="navy" className="mt-6 w-fit">
                  Explore product <ArrowUpRight className="size-4" />
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-10 lg:pt-14">
        <h2 className="section-title mt-0 text-center text-[clamp(1.75rem,3vw,2.5rem)]">
          Petrol bunk brands
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 text-muted-foreground">
          Explore how Petrozz supports stations across major fuel brands in India.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-10 lg:grid-cols-4">
          {fuelStationBrands.map((brand) => (
            <li key={brand.slug}>
              <Link
                href={`/solutions/${brand.slug}`}
                className="group flex h-full flex-col items-center rounded-2xl border border-navy/10 bg-white p-5 text-center transition-colors hover:border-navy/20 hover:bg-[#faf9f7] sm:p-6"
              >
                <div className="flex h-20 w-full items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    width={160}
                    height={80}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-navy transition-colors group-hover:text-primary">
                  {brand.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
          Petrozz is independent and is not affiliated with or endorsed by the oil marketing
          companies named above.
        </p>
      </Section>

      {/*
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="solution-areas-heading">
        Connected business management, financial, workforce, customer, requirements,
        why-solutions, and attendance business-type sections are temporarily commented out.
      </section>
      */}

      <section className="site-container pb-16 lg:pb-20">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-navy px-7 py-12 text-center sm:px-12 lg:px-16 lg:py-16">
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Find the right solution for your station
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book-demo">
              Book a free demo <ArrowUpRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost" className="border-white/20 text-white hover:bg-white/10">
              Explore products
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
