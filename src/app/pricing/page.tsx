import type { Metadata } from "next";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { pricingFaqs } from "@/lib/content";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <Section className="pt-20">
      <Kicker>Pricing</Kicker>
      <H1>Simple Pricing. Choose What Your Business Needs.</H1>
      <Lead>
        Select the Pettroz product that fits your operations and team. Plans are billed in INR, with
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
      <h2 className="mt-12 text-2xl font-semibold text-navy">Pricing FAQ</h2>
      <div className="mt-6 space-y-4">
        {pricingFaqs.map((f) => (
          <Card key={f.q} className="p-5">
            <p className="font-medium text-navy">{f.q}</p>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
