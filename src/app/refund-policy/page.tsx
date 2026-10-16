import type { Metadata } from "next";
import { H1, Kicker, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Cancellation & Refund Policy" };

export default function RefundPage() {
  return (
    <Section className="max-w-3xl pt-20">
      <Kicker>Legal</Kicker>
      <H1>Cancellation & Refund Policy</H1>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Subscriptions, upgrades, invoices, and renewals are product-specific. Cancellation and
        refund terms will be published here once billing terms are finalized. Until then, contact
        sales for the current policy on your order.
      </p>
    </Section>
  );
}
