import type { Metadata } from "next";
import { H1, Kicker, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePage() {
  return (
    <Section className="max-w-3xl pt-20">
      <Kicker>Legal</Kicker>
      <H1>Cookie Policy</H1>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Analytics and similar cookies are used only with appropriate consent handling. Essential
        cookies keep the site working (for example session and security). You can change browser
        settings to limit non-essential cookies.
      </p>
      <h2 className="mt-8 text-lg font-semibold text-navy">Data processing & security</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Form submissions are validated and protected against spam. Lead records identify which
        product you asked about. Production security details will match the live implementation.
      </p>
    </Section>
  );
}
