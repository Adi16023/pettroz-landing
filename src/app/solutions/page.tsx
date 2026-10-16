import type { Metadata } from "next";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { products, solutions } from "@/lib/content";

export const metadata: Metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <Section className="pt-20">
      <Kicker>Solutions</Kicker>
      <H1>The Right Software for the Way You Work.</H1>
      <Lead>
        Whether you’re running a fuel station or managing employees across several locations, Pettroz
        helps you operate efficiently.
      </Lead>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {solutions.map((s) => {
          const rec = s.product === "pump" ? products.pump : products.attendance;
          return (
            <Card key={s.slug}>
              <h2 className="text-xl font-semibold text-navy">{s.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
              <p className="mt-4 text-xs font-semibold tracking-wide text-primary uppercase">Recommended</p>
              <p className="text-sm">{rec.name}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={`/solutions/${s.slug}`} variant="navy">
                  View solution
                </ButtonLink>
                <ButtonLink href="/book-demo">Book Demo</ButtonLink>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
