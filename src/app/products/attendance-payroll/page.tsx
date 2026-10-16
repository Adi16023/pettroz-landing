import type { Metadata } from "next";
import { AttendancePreview } from "@/components/product-preview";
import { ButtonLink, Card, CtaBand, H1, Kicker, Lead, Section } from "@/components/ui";
import { attendanceModules, products, solutions } from "@/lib/content";

export const metadata: Metadata = { title: products.attendance.name };

export default function AttendanceProductPage() {
  return (
    <>
      <Section className="pt-20">
        <Kicker>{products.attendance.heroKicker}</Kicker>
        <H1>{products.attendance.hero}</H1>
        <Lead>{products.attendance.description}</Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/book-demo">Book Free Demo</ButtonLink>
          <ButtonLink href="/features" variant="navy">
            Explore Features
          </ButtonLink>
        </div>
        <div className="mt-10">
          <AttendancePreview />
        </div>
      </Section>
      <Section className="pt-0">
        <Card className="bg-navy text-white">
          <h2 className="text-2xl font-semibold">Powerful HR & Payroll Software. No Petrol Pump Software Required.</h2>
          <p className="mt-3 text-white/75">
            Pettroz Attendance & Payroll is a standalone workforce management platform. Use it for
            your office, retail shop, factory, petrol pump, restaurant, warehouse, or any business
            that employs people. No Pettroz Petrol Pump Management subscription is required.
          </p>
        </Card>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {attendanceModules.map((m) => (
            <Card key={m.slug}>
              <h3 className="text-lg font-semibold text-navy">{m.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.intro}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {m.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <ButtonLink href={`/features/${m.slug}`} variant="navy" className="mt-5 h-9 text-xs">
                Learn More
              </ButtonLink>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Location collection and biometric information use appropriate permissions, consent,
          retention, and privacy controls. Statutory payroll calculations follow current applicable
          regulations and configured eligibility rules.
        </p>
      </Section>
      <Section className="pt-0">
        <h2 className="text-2xl font-semibold text-navy">Who Can Use Pettroz Attendance & Payroll?</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {solutions
            .filter((s) => s.product === "attendance" || s.slug.includes("petrol"))
            .map((s) => (
              <Card key={s.slug} className="p-4">
                <p className="font-medium text-navy">{s.name}</p>
              </Card>
            ))}
        </div>
      </Section>
      <CtaBand
        title="Stop Managing Attendance Manually."
        text="Make attendance, leave, shifts, and payroll easier with Pettroz."
        primary={{ href: "/book-demo", label: "Book Attendance Demo" }}
        secondary={{ href: "/contact", label: "Contact Sales" }}
      />
    </>
  );
}
