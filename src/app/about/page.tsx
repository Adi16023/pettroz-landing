import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Fuel,
  Handshake,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink, CtaBand, Section } from "@/components/ui";
import { products } from "@/lib/content";

export const metadata: Metadata = { title: "About Us" };

const storyPoints: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "The Need",
    text: "Manual processes, scattered data and disconnected tools made everyday station work harder than it needed to be.",
    Icon: Target,
  },
  {
    title: "The Solution",
    text: "A unified platform that brings sales, stock, staff and finances together for clearer control.",
    Icon: Sparkles,
  },
  {
    title: "The Goal",
    text: "To make fuel retail simpler, smarter and more efficient for every station that uses Petrozz.",
    Icon: CheckCircle2,
  },
];

const values: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Reliability",
    text: "Dependable software for the operations stations cannot afford to get wrong.",
    Icon: ShieldCheck,
  },
  {
    title: "Customer First",
    text: "We design around real dealer workflows, feedback and on-ground realities.",
    Icon: Handshake,
  },
  {
    title: "Simplicity",
    text: "Powerful tools should stay clear, practical and easy for every role to use.",
    Icon: Lightbulb,
  },
  {
    title: "Continuous Growth",
    text: "We keep improving the product as fuel retail needs and technology evolve.",
    Icon: RefreshCw,
  },
];

const partnerPoints: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Guidance & Onboarding",
    text: "Get set up with clear walkthroughs so your team can start with confidence.",
    Icon: Lightbulb,
  },
  {
    title: "Ongoing Support",
    text: "Reach a team that understands petrol pump operations when you need help.",
    Icon: Handshake,
  },
  {
    title: "Continuous Improvement",
    text: "Regular product updates shaped by real station feedback and industry needs.",
    Icon: RefreshCw,
  },
];

const ecosystem = [
  {
    title: "Single Station Operators",
    text: "Run daily sales, stock, cash and staff from one organised workspace.",
  },
  {
    title: "Multi-Outlet & Chain Operators",
    text: "Compare outlets, standardise workflows and keep visibility across locations.",
  },
  {
    title: "Dealers",
    text: "Support dealer networks with clearer reporting, coordination and control.",
  },
];

const approach = [
  {
    number: "01",
    title: "Understand the Industry",
    text: "Start with the realities of fuel retail — shifts, stock, credit and people.",
  },
  {
    number: "02",
    title: "Build with Purpose",
    text: "Design connected workflows that reduce manual work and improve clarity.",
  },
  {
    number: "03",
    title: "Improve Continuously",
    text: "Keep refining the product as operators grow and requirements change.",
  },
];


export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="site-container grid items-center gap-10 pt-12 pb-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:pt-16 lg:pb-20">
        <div className="min-w-0">
          <h1 className="mt-0 max-w-xl text-[clamp(2.4rem,4.2vw,4.6rem)] leading-[1.08] font-semibold tracking-[-0.05em] text-navy">
            Technology that keeps fuel stations{" "}
            <span className="text-primary">moving.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-[1.8] text-muted-foreground">
            Petrozz builds practical software for petrol pump operations and workforce management —
            helping stations organise sales, stock, people and finances with clarity and control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-demo">
              Book a Demo <ArrowUpRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost">
              Our Products <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-navy">
            <Image
              src="/about/hero-station-dusk.jpg"
              alt="Modern Petrozz petrol station at dusk"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#f4f3ef] lg:aspect-auto lg:min-h-[28rem]">
            <Image
              src="/about/story-operator.jpg"
              alt="Petrozz pump operator at a fuel station"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover object-[center_25%]"
            />
          </div>

          <div>
            <h2 className="section-title mt-0 max-w-md">
              Built from the Ground Realities of{" "}
              <span className="text-primary">Fuel Retail.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Petrozz started with a simple observation: fuel stations run on speed, trust and daily
              accountability — yet too many still rely on registers, WhatsApp threads and disconnected
              tools.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              We built Petrozz to bring those operations into one connected platform, designed around
              how stations actually work from morning open to night close.
            </p>
          </div>

          <ul className="space-y-6 lg:pt-10">
            {storyPoints.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Mission & Vision */}
      <section className="bg-navy text-white">
        <div className="site-container grid gap-14 py-24 text-center sm:gap-16 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div className="mx-auto flex max-w-lg flex-col items-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Target aria-hidden="true" className="size-6" strokeWidth={1.7} />
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Our Mission</h2>
            <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg sm:leading-8">
              Develop reliable, practical software that simplifies petrol pump operations, reduces
              repetitive work and helps station teams manage sales, stock, people and finances with
              confidence.
            </p>
          </div>
          <div className="mx-auto flex max-w-lg flex-col items-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Sparkles aria-hidden="true" className="size-6" strokeWidth={1.7} />
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Our Vision</h2>
            <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg sm:leading-8">
              Make modern fuel-retail technology accessible and useful for every station — from
              single outlets to multi-location networks — so operators can grow with clearer control.
            </p>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <Section>
        <h2 className="section-title mt-0 max-w-2xl">The values behind every product decision.</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, text, Icon }) => (
            <li key={title} className="border-t border-navy/15 pt-5">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Two Solutions */}
      <Section className="bg-[#f4f3ef]">
        <h2 className="section-title mt-0 max-w-2xl">Two Solutions. One Ecosystem.</h2>
        <ul className="mt-10 grid gap-5 lg:grid-cols-2">
          {[
            {
              product: products.pump,
              Icon: Fuel,
              wash: "bg-[#f6e5dc] text-[#a6412b]",
            },
            {
              product: products.attendance,
              Icon: Users,
              wash: "bg-[#e6ede3] text-[#35604b]",
            },
          ].map(({ product, Icon, wash }) => (
            <li
              key={product.slug}
              className="rounded-[1.35rem] bg-white p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
            >
              <span className={`inline-flex size-12 items-center justify-center rounded-2xl ${wash}`}>
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy">{product.name.replace("Petrozz ", "")}</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{product.short}</p>
              <Link
                href={product.href}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Learn more <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Long-term partner — stacked horizontal rows */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <h2 className="section-title mt-0">A Long-Term Partner for Your Station.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              Petrozz is built to stay with your station beyond setup — with guidance, support and
              product improvements as your operations grow.
            </p>
          </div>
          <ul className="divide-y divide-navy/10 border-y border-navy/10">
            {partnerPoints.map(({ title, text, Icon }, index) => (
              <li
                key={title}
                className="grid gap-4 py-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                  <span className="text-3xl font-semibold tracking-tight text-primary/35">
                    0{index + 1}
                  </span>
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-navy">{title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Ecosystem — featured band with wide rows */}
      <section className="bg-navy text-white">
        <div className="site-container py-16 lg:py-20">
          <h2 className="mt-0 max-w-2xl text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.12] font-semibold tracking-[-0.045em] text-white">
            Supporting the Full Fuel Retail Ecosystem.
          </h2>
          <ul className="mt-12 space-y-0">
            {ecosystem.map((item, index) => (
              <li
                key={item.title}
                className="group grid gap-3 border-t border-white/12 py-8 last:border-b sm:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] sm:items-center sm:gap-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-semibold tracking-[0.14em] text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach — connected process timeline */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title mt-0">How we build for fuel retail.</h2>
        </div>

        <ol className="relative mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[2.75rem] right-[16%] left-[16%] hidden h-px bg-navy/15 lg:block"
          />
          {approach.map((step) => (
            <li key={step.number} className="relative text-center">
              <span className="relative z-10 mx-auto flex size-[5.5rem] items-center justify-center rounded-full bg-[#f4f3ef] text-2xl font-semibold tracking-tight text-primary ring-8 ring-white">
                {step.number}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-navy">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Let's Build a Smarter Fuel Business Together."
        text="See how Petrozz can organise your station operations, workforce and daily decisions in one place."
        primary={{ href: "/book-demo", label: "Book a Demo" }}
        secondary={{ href: "/contact", label: "Talk to our team" }}
      />
    </>
  );
}
