import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { H1, Kicker, Lead, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Book Free Demo" };

export default function BookDemoPage() {
  return (
    <Section className="pt-20">
      <Kicker>Book a demo</Kicker>
      <H1>See How Pettroz Works for Your Business.</H1>
      <Lead>Book a personalized product demo and discover how Pettroz can simplify your daily operations.</Lead>
      <div className="mt-10">
        <LeadForm kind="demo" />
      </div>
    </Section>
  );
}
