import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { H1, Kicker, Lead, Section } from "@/components/ui";
import { Check } from "lucide-react";

export const metadata: Metadata = { title: "Book Free Demo" };

export default function BookDemoPage() {
  return (
    <Section className="grid items-start gap-12 pt-16 lg:grid-cols-2 lg:gap-20">
      <div>
      <Kicker>Book a demo</Kicker>
      <H1>See How Pettroz Works for Your Business.</H1>
      <Lead>Book a personalized product demo and discover how Pettroz can simplify your daily operations.</Lead>
      <p className="mt-10 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">What a Pettroz demo covers</p>
      <ul className="mt-5 space-y-5">
        {["The product that fits your daily operations", "A walkthrough of the workflows that matter to you", "Plan options, configuration and next steps"].map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-navy"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}
      </ul>
      </div>
      <div className="lg:pt-4">
        <LeadForm kind="demo" />
      </div>
    </Section>
  );
}
