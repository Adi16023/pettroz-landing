import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Building2, Users, Wallet } from "lucide-react";
import { PumpCapabilities } from "@/components/pump-capabilities";
import { PumpPreview } from "@/components/product-preview";
import { ButtonLink, CtaBand, H1, Kicker, Lead, Section } from "@/components/ui";
import { products } from "@/lib/content";

export const metadata: Metadata = { title: products.pump.name };

export default function PumpProductPage() {
  return (
    <>
      <Section className="grid items-center gap-10 pt-16 lg:grid-cols-2 lg:gap-16">
        <div>
        <Kicker>{products.pump.heroKicker}</Kicker>
        <H1>{products.pump.hero}</H1>
        <Lead>{products.pump.description} Spend less time maintaining registers and more time growing your business.</Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/book-demo">Book Free Demo</ButtonLink>
          <ButtonLink href="/features" variant="navy">
            Explore Features
          </ButtonLink>
        </div>
        </div>
        <div id="showcase" className="hero-wash min-w-0 rounded-3xl p-4 sm:p-6">
          <PumpPreview animated />
        </div>
      </Section>
      <Section id="operations">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="section-title max-w-2xl">A clearer picture.<br />An easier day at the pump.</h2>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">Sales, stock and closing share one workspace, so the next shift starts with the same information.</p>
        </div>
        <PumpCapabilities />
      </Section>
      <Section className="pt-0">
        <h2 className="section-title max-w-2xl">Keep the business side<br />just as clear.</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-[4vw]">
          {[
            { Icon: BookOpen, title: "Customers who come back.", description: "Keep credit limits, invoices and collections tied to each customer. Build repeat business with loyalty points, rewards and redemption history.", links: [{ slug: "credit-customers", label: "Credit accounts" }, { slug: "loyalty", label: "Loyalty & rewards" }] },
            { Icon: Wallet, title: "Know what you actually earn.", description: "See investments, withdrawals, expenses and liabilities alongside fuel and shop profitability. Understand where your money is, not just what you sold.", links: [{ slug: "capital-profit-loss", label: "Capital & profit/loss" }] },
            { Icon: Building2, title: "One outlet or several.", description: "Compare performance across stations while keeping outlet data separate. Give staff access to the locations and records their roles need.", links: [{ slug: "multi-outlet", label: "Multi-outlet management" }] },
          ].map(({ Icon, title, description, links }) => (
            <div key={title} className="border-t border-navy/15 pt-6">
              <Icon aria-hidden="true" className="mb-5 size-7 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold tracking-tight text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
              <div className="mt-5 flex flex-wrap gap-x-5">
                {links.map(({ slug, label }) => <Link key={slug} href={`/features/${slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy hover:text-primary">{label}<ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>)}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-[#edf0e9]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[8vw]">
          <div>
            <Users aria-hidden="true" className="mb-6 size-9 text-[#35604b]" strokeWidth={1.5} />
            <h2 className="section-title max-w-xl">Your team belongs<br />in the same system.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">Attendance & Payroll is included with eligible Petrol Pump Management plans. Manage the people running your station without a separate set of registers.</p>
            <p className="mt-4 max-w-lg text-xs leading-6 text-muted-foreground">Included modules and entitlements are confirmed with our team before you subscribe.</p>
            <Link href="/features/pump-attendance-payroll" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-navy hover:text-primary">Explore included workforce tools<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:content-center">
            {[
              { title: "Attendance you can verify", text: "GPS, geofencing and selfie check-ins keep staff attendance connected to your outlet." },
              { title: "Shifts without the guesswork", text: "Assign staff, plan rosters and manage leave and overtime around your station’s schedule." },
              { title: "Pay based on the work done", text: "Bring attendance, leave and overtime into salary calculations and payslips." },
              { title: "Records your team can access", text: "Employee self-service keeps leave requests, attendance records and payslips within reach." },
            ].map(({ title, text }) => <li key={title}><h3 className="text-base font-semibold text-navy">{title}</h3><p className="mt-2 text-sm leading-7 text-navy/65">{text}</p></li>)}
          </ul>
        </div>
      </Section>
      <CtaBand
        title="Take a closer look at your next workday."
        text="Walk through sales, stock, closing and staff management with our team."
        primary={{ href: "/book-demo", label: "Book a free demo" }}
        secondary={{ href: "/pricing", label: "Explore plans" }}
      />
    </>
  );
}
