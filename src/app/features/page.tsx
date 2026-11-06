"use client";

import { useState } from "react";
import {
  Banknote,
  BookOpen,
  Building2,
  CalendarCheck,
  Clock,
  Coins,
  ContactRound,
  CreditCard,
  Droplets,
  FileSpreadsheet,
  FileText,
  Fuel,
  Gauge,
  Landmark,
  LayoutGrid,
  Megaphone,
  Plus,
  Package,
  Plug,
  Receipt,
  ReceiptText,
  ShieldCheck,
  Ticket,
  Timer,
  TreePalm,
  Truck,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { additionalPumpModules, attendanceModules, featureFaqs, pumpModules } from "@/lib/content";

const featureIcons: Record<string, LucideIcon> = {
  "fuel-sales-billing": Fuel,
  "dsr-daily-closing": FileSpreadsheet,
  "tank-fuel-stock": Gauge,
  "fuel-purchases": Truck,
  "stock-variation": Droplets,
  "lubricants-products": Package,
  "credit-customers": BookOpen,
  "capital-profit-loss": Landmark,
  "pump-attendance-payroll": UserCheck,
  loyalty: Ticket,
  "reports-analytics": FileSpreadsheet,
  "multi-outlet": Building2,
  "cash-drawer-management": Coins,
  "financial-accounting": Receipt,
  "banking-payment-management": Banknote,
  "pos-settlement": CreditCard,
  "ocr-data-capture": FileText,
  "gst-tax-records": ShieldCheck,
  "tally-invoicing": ReceiptText,
  "pump-shift-management": Timer,
  "expense-management": Wallet,
  "vehicle-service-reminders": CalendarCheck,
  "whatsapp-sms-automation": Megaphone,
  "cng-ev-operations": Plug,
  "advanced-attendance": UserCheck,
  "gps-geofencing": Building2,
  "selfie-face": ContactRound,
  "shifts-rosters": Timer,
  "employee-management": Users,
  "leave-management": TreePalm,
  overtime: Clock,
  payroll: Wallet,
  "employee-app": ContactRound,
};

export default function FeaturesPage() {
  const [product, setProduct] = useState<"pump" | "attendance">("pump");
  const modules = product === "pump" ? [...pumpModules, ...additionalPumpModules] : attendanceModules;

  return (
    <Section className="pt-20">
      <Kicker>Features</Kicker>
      <H1>Powerful Features. Simpler Operations.</H1>
      <Lead>
        Everything you need to manage your petrol pump, all in one platform. Discover tools for
        fuel sales, inventory, accounting, cash, payments, customers and employees—or choose
        standalone Attendance & Payroll for your workforce.
      </Lead>
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="#feature-list" variant="navy">Explore Features</ButtonLink>
        <ButtonLink href="/book-demo" variant="ghost">Book a Free Demo</ButtonLink>
      </div>
      <div className="mt-12 grid gap-8 border-y border-border py-8 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
        <h2 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
          Packed with features to make everyday management easier.
        </h2>
        <div>
          <p className="text-sm leading-7 text-muted-foreground">
            Managing a petrol pump involves multiple activities, transactions and responsibilities.
            Pettroz brings them together through an organised set of digital tools for everyday fuel
            station operations.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Explore tools for sales, inventory, finances, employees, customers and business
            performance. Capabilities that depend on an external provider, integration or product
            configuration are identified as supported or configurable.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose product features">
        <button
          type="button"
          aria-pressed={product === "pump"}
          onClick={() => setProduct("pump")}
          className={`h-11 cursor-pointer rounded-lg px-4 text-sm font-medium ${product === "pump" ? "bg-primary text-white" : "bg-navy text-white"}`}
        >
          Petrol Pump Management
        </button>
        <button
          type="button"
          aria-pressed={product === "attendance"}
          onClick={() => setProduct("attendance")}
          className={`h-11 cursor-pointer rounded-lg px-4 text-sm font-medium ${product === "attendance" ? "bg-primary text-white" : "bg-navy text-white"}`}
        >
          Attendance & Payroll
        </button>
      </div>
      <div id="feature-list" className="mt-8 grid scroll-mt-24 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => {
          const Icon = featureIcons[m.slug] ?? LayoutGrid;
          return (
            <Card key={m.slug}>
              <span className="mb-2 grid size-10 place-items-center rounded-[10px] bg-muted text-primary">
                <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
              </span>
              <h2 className="font-semibold text-navy">{m.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{m.intro}</p>
              <ButtonLink href={`/features/${m.slug}`} variant="navy" className="mt-4 h-9 text-xs">
                Learn More
              </ButtonLink>
            </Card>
          );
        })}
      </div>

      <section className="mt-16 border-t border-border pt-10" aria-labelledby="features-faq-heading">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <Kicker>Frequently asked questions</Kicker>
            <h2 id="features-faq-heading" className="mt-3 text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
              Petrol pump management, answered.
            </h2>
          </div>
          <div className="border-t border-border">
            {featureFaqs.map((faq) => (
              <details key={faq.q} className="group border-b border-border">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-5 py-4 text-sm leading-6 font-medium text-navy">
                  {faq.q}
                  <Plus aria-hidden="true" className="faq-plus size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </summary>
                <p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
        <ButtonLink href="/products">Explore Our Products</ButtonLink>
        <ButtonLink href="/book-demo" variant="navy">Book a Free Demo</ButtonLink>
      </div>
    </Section>
  );
}
