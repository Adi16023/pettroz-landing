import type { Metadata } from "next";
import { AttendancePreview, PumpPreview } from "@/components/product-preview";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { products } from "@/lib/content";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <Section className="pt-20">
      <Kicker>Products</Kicker>
      <H1>Two Products. Practical Tools for Everyday Operations.</H1>
      <Lead>
        Choose complete petrol pump management for sales, inventory, finances, staff, and station
        operations—or standalone Attendance & Payroll for businesses managing a workforce.
      </Lead>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {[products.pump, products.attendance].map((p, i) => (
          <Card key={p.slug} className="flex flex-col">
            {i === 0 ? <PumpPreview /> : <AttendancePreview />}
            <h2 className="mt-6 text-2xl font-semibold text-navy">{p.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
            <ul className="mt-5 grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm leading-6 text-navy">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
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
      <p className="mt-6 max-w-3xl text-xs leading-6 text-muted-foreground">
        Some integrations, notifications and product workflows depend on supported providers,
        account permissions and configuration. Confirm availability for your requirements with our
        team before subscribing.
      </p>
    </Section>
  );
}
