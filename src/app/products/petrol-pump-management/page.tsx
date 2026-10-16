import type { Metadata } from "next";
import { PumpPreview } from "@/components/product-preview";
import { ButtonLink, Card, CtaBand, H1, Kicker, Lead, Section } from "@/components/ui";
import { products, pumpModules } from "@/lib/content";

export const metadata: Metadata = { title: products.pump.name };

export default function PumpProductPage() {
  return (
    <>
      <Section className="pt-20">
        <Kicker>{products.pump.heroKicker}</Kicker>
        <H1>{products.pump.hero}</H1>
        <Lead>{products.pump.description} Spend less time maintaining registers and more time growing your business.</Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/book-demo">Book Free Demo</ButtonLink>
          <ButtonLink href="/features" variant="navy">
            Explore Features
          </ButtonLink>
        </div>
        <div className="mt-10">
          <PumpPreview />
        </div>
      </Section>
      <Section className="pt-0">
        <h2 className="text-2xl font-semibold text-navy">Key Benefits</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Complete Operational Visibility",
            "Faster Billing & Daily Closing",
            "Accurate Fuel Stock Tracking",
            "Better Financial Control",
            "Integrated Employee Management",
            "Multi-Outlet Management",
          ].map((b) => (
            <Card key={b} className="p-4 font-medium text-navy">
              {b}
            </Card>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <h2 className="text-2xl font-semibold text-navy">Petrol Pump Features</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {pumpModules.map((m) => (
            <Card key={m.slug}>
              <h3 className="text-lg font-semibold text-navy">{m.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.intro}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {m.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <ButtonLink href={`/features/${m.slug}`} variant="navy" className="mt-5 h-9 text-xs">
                Learn More
              </ButtonLink>
            </Card>
          ))}
        </div>
        <p className="mt-8 rounded-xl bg-muted p-4 text-sm">
          Complete Attendance & Payroll functionality is available within eligible Pettroz Petrol
          Pump Management subscriptions.
        </p>
      </Section>
      <CtaBand
        title="Your Entire Petrol Pump. One Smart System."
        text="See billing, tanks, closing, credit, and payroll in one desk."
        primary={{ href: "/book-demo", label: "Book Petrol Pump Software Demo" }}
      />
    </>
  );
}
