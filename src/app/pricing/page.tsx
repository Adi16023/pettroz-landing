import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/lib/icons";
import { HomeFaq } from "@/components/home-faq";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { pricingFaqs } from "@/lib/content";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <Section className="pt-20">
      <Kicker>Pricing</Kicker>
      <H1>Simple Pricing. Choose What Your Business Needs.</H1>
      <Lead>
        Select the Petrozz product that fits your operations and team. Plans are billed in INR, with
        monthly and annual options. Final prices and entitlements are confirmed with sales — we do
        not invent subscription prices here.
      </Lead>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold text-navy">Petrol Pump Management</h2>
          <p className="mt-2 text-sm text-muted-foreground">Configurable plans for:</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Single Outlet</li>
            <li>• Multi-Outlet</li>
            <li>• Enterprise / Custom Requirements</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Plans cover operational modules, outlets, users, integrations, support, and whether
            complete Attendance & Payroll is included.
          </p>
          <div className="mt-6 flex gap-3">
            <ButtonLink href="/book-demo">Book Demo</ButtonLink>
            <ButtonLink href="/contact" variant="navy">
              Contact Sales
            </ButtonLink>
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-navy">Attendance & Payroll</h2>
          <p className="mt-2 text-sm text-muted-foreground">Configurable plans for:</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Small Businesses</li>
            <li>• Growing Teams</li>
            <li>• Multi-Branch / Enterprise</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Plans cover employee limits, GPS attendance, selfie verification, biometric
            integration, payroll, leave, scheduling, reporting, and support.
          </p>
          <div className="mt-6 flex gap-3">
            <ButtonLink href="/book-demo">Book Demo</ButtonLink>
            <ButtonLink href="/contact" variant="navy">
              Contact Sales
            </ButtonLink>
          </div>
        </Card>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Optional add-ons, product-specific comparisons, and upgrades are available. Billing terms
        are confirmed before you subscribe.
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-14">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Pricing FAQ</p>
          <h2 className="section-title mt-3">Questions about plans and billing.</h2>
          <Link
            href="/faq?topic=Pricing"
            className="mt-6 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-navy hover:text-primary"
          >
            View all FAQs
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <HomeFaq items={pricingFaqs} name="pricing-faq" />
      </div>
    </Section>
  );
}
