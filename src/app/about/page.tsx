import type { Metadata } from "next";
import { Card, H1, Kicker, Lead, Section } from "@/components/ui";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <Section className="pt-20">
      <Kicker>About Us</Kicker>
      <H1>Building Smarter Tools for Everyday Businesses.</H1>
      <Lead>
        Pettroz is focused on simplifying business operations through practical, intuitive software.
        We believe powerful technology should be accessible to petrol pump dealers, business owners,
        managers, and employees — not just people with technical expertise.
      </Lead>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Our products bring important business processes together, reduce manual work, and make
        everyday decisions easier.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-navy">Our Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To create simple, reliable, and powerful business management software that helps owners
            and teams work more efficiently.
          </p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-navy">Our Vision</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To make modern business management accessible to organizations of every size.
          </p>
        </Card>
      </div>
      <h2 className="mt-10 text-xl font-semibold text-navy">What We Value</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {["Simplicity", "Reliability", "Transparency", "Continuous Improvement", "Customer Support", "Practical Innovation"].map(
          (v) => (
            <Card key={v} className="p-4 font-medium text-navy">
              {v}
            </Card>
          ),
        )}
      </div>
    </Section>
  );
}
