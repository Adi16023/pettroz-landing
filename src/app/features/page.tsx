"use client";

import { useState } from "react";
import { ButtonLink, Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { attendanceModules, pumpModules } from "@/lib/content";

export default function FeaturesPage() {
  const [product, setProduct] = useState<"pump" | "attendance">("pump");
  const modules = product === "pump" ? pumpModules : attendanceModules;

  return (
    <Section className="pt-20">
      <Kicker>Features</Kicker>
      <H1>Explore Everything Pettroz Can Do.</H1>
      <Lead>Discover the tools designed to simplify business operations and employee management.</Lead>
      <div className="mt-8 flex gap-2">
        <button
          type="button"
          onClick={() => setProduct("pump")}
          className={`h-11 cursor-pointer rounded-lg px-4 text-sm font-medium ${product === "pump" ? "bg-primary text-white" : "bg-navy text-white"}`}
        >
          Petrol Pump Management
        </button>
        <button
          type="button"
          onClick={() => setProduct("attendance")}
          className={`h-11 cursor-pointer rounded-lg px-4 text-sm font-medium ${product === "attendance" ? "bg-primary text-white" : "bg-navy text-white"}`}
        >
          Attendance & Payroll
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.slug}>
            <h2 className="font-semibold text-navy">{m.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{m.intro}</p>
            <ButtonLink href={`/features/${m.slug}`} variant="navy" className="mt-4 h-9 text-xs">
              Learn More
            </ButtonLink>
          </Card>
        ))}
      </div>
    </Section>
  );
}
