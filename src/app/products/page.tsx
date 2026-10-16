import type { Metadata } from "next";
import { AttendancePreview, PumpPreview } from "@/components/product-preview";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { products } from "@/lib/content";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <Section className="pt-20">
      <Kicker>Products</Kicker>
      <H1>Two Products. Endless Possibilities.</H1>
      <Lead>
        Explore Pettroz’s purpose-built business solutions. Choose complete petrol pump management
        or advanced standalone attendance and payroll software.
      </Lead>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {[products.pump, products.attendance].map((p, i) => (
          <Card key={p.slug} className="flex flex-col">
            {i === 0 ? <PumpPreview /> : <AttendancePreview />}
            <h2 className="mt-6 text-2xl font-semibold text-navy">{p.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {p.highlights.slice(0, 6).map((h) => (
                <li key={h}>• {h}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={p.href}>Learn More</ButtonLink>
              <ButtonLink href="/pricing" variant="navy">
                View Pricing
              </ButtonLink>
              <ButtonLink href="/book-demo" variant="ghost">
                Book Demo
              </ButtonLink>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-10">
        <h2 className="text-xl font-semibold text-navy">Which software is right for you?</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm">
          <p>
            <strong>Petrol pump dealers</strong> start with Petrol Pump Management. Eligible
            subscriptions include Attendance & Payroll for station staff.
          </p>
          <p>
            <strong>Any business with people</strong> can buy Attendance & Payroll on its own —
            offices, retail, factories, restaurants, warehouses, and field teams. No pump product
            required.
          </p>
        </div>
      </Card>
    </Section>
  );
}
