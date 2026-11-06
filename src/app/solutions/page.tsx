import type { Metadata } from "next";
import { ButtonLink, Card, CtaBand, H1, Kicker, Lead, Section } from "@/components/ui";
import {
  fuelStationBrands,
  petrolPumpSolutions,
  products,
  solutionAreas,
  solutionCustomerAreas,
  solutionFinancialAreas,
  solutionReasons,
  solutionRequirements,
  solutionWorkforceAreas,
  solutions,
} from "@/lib/content";

export const metadata: Metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <>
      <Section className="pt-20">
      <Kicker>Solutions</Kicker>
      <H1>The Right Solutions for Better Business Management.</H1>
      <Lead>
        Every business has different challenges. Pettroz provides practical software solutions to
        simplify business management, improve operational visibility and help teams work smarter.
        Explore options for petrol pumps, multi-outlet fuel stations and growing workforces.
      </Lead>
      <div className="mt-8 grid gap-8 border-y border-border py-8 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
        <h2 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
          Every business challenge deserves a smarter solution.
        </h2>
        <p className="text-sm leading-7 text-muted-foreground">
          Managing a business takes visibility, coordination and control across different
          operations. Pettroz brings business management and workforce tools together to help
          replace scattered records and disconnected manual processes.
        </p>
      </div>
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-navy">For petrol pump businesses</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {petrolPumpSolutions.map((solution) => (
          <Card key={solution.name}>
            <h3 className="text-lg font-semibold text-navy">{solution.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{solution.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6">
              {solution.helps.map((item) => <li key={item}>• {item}</li>)}
            </ul>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              <strong className="text-navy">Ideal for:</strong> {solution.idealFor}
            </p>
            <ButtonLink href={products.pump.href} variant="navy" className="mt-5 h-9 text-xs">
              Explore Petrol Pump Management
            </ButtonLink>
          </Card>
        ))}
      </div>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="fuel-brands-heading">
        <h2 id="fuel-brands-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Petrol pump management for major fuel brands in India
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Organise sales, inventory, accounting and everyday operations for stations operating
          under different oil marketing companies or independently.
        </p>
        <ul className="mt-7 grid gap-x-8 gap-y-8 md:grid-cols-2">
          {fuelStationBrands.map((brand) => (
            <li key={brand.name} className="border-t border-navy/15 pt-5">
              <h3 className="text-base font-semibold text-navy">{brand.name} petrol pump solutions</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{brand.summary}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {brand.areas.map((area) => (
                  <li key={area} className="flex gap-2 text-xs leading-5 text-muted-foreground">
                    <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                    {area}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          Pettroz is an independent software solution and is not affiliated with, endorsed by, or
          officially partnered with the oil marketing companies named above. Brand references
          describe operational use cases and do not imply integration with proprietary systems.
        </p>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="solution-areas-heading">
        <h2 id="solution-areas-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Connected business management
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {solutionAreas.map((area) => (
            <div key={area.title} className="border-t border-navy/15 pt-5">
              <h3 className="font-semibold text-navy">{area.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{area.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="financial-solutions-heading">
        <h2 id="financial-solutions-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Better financial visibility for better business decisions
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Organise financial activity and review important business numbers through structured
          digital records.
        </p>
        <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {solutionFinancialAreas.map((area) => (
            <article key={area.title} className="border-t border-navy/15 pt-5">
              <h3 className="font-semibold text-navy">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.text}</p>
            </article>
          ))}
        </div>
        <ButtonLink href="/features/financial-accounting" variant="navy" className="mt-7">
          Explore financial management
        </ButtonLink>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="workforce-solutions-heading">
        <h2 id="workforce-solutions-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Better workforce management. More organised operations.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Pettroz Attendance &amp; Payroll is designed to help businesses organise employee
          activities and simplify salary administration. Product availability and workflows depend
          on configuration.
        </p>
        <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {solutionWorkforceAreas.map((area) => (
            <article key={area.title} className="border-t border-navy/15 pt-5">
              <h3 className="font-semibold text-navy">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          Ideal for petrol pumps, fuel station businesses and organisations managing shift-based employees.
        </p>
        <ButtonLink href={products.attendance.href} variant="navy" className="mt-5">
          Explore Attendance &amp; Payroll
        </ButtonLink>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="customer-solutions-heading">
        <h2 id="customer-solutions-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Turn everyday transactions into long-term relationships
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Keep customer information and follow-ups organised through connected customer management workflows.
        </p>
        <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {solutionCustomerAreas.map((area) => (
            <article key={area.title} className="border-t border-navy/15 pt-5">
              <h3 className="font-semibold text-navy">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.text}</p>
            </article>
          ))}
        </div>
        <ButtonLink href="/features/credit-customers" variant="navy" className="mt-7">
          Explore customer management
        </ButtonLink>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="requirements-heading">
        <h2 id="requirements-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Find a solution that matches your business needs
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutionRequirements.map((area) => (
            <Card key={area.title} className="p-5">
              <h3 className="font-semibold text-navy">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.text}</p>
            </Card>
          ))}
        </div>
        <ButtonLink href="/features" className="mt-7">Explore all features</ButtonLink>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="why-solutions-heading">
        <h2 id="why-solutions-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Designed around real business requirements
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Practical solutions help teams organise information, improve visibility and simplify everyday management.
        </p>
        <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {solutionReasons.map((reason) => (
            <article key={reason.title} className="border-t border-navy/15 pt-5">
              <h3 className="font-semibold text-navy">{reason.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="business-types-heading">
        <h2 id="business-types-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Attendance & Payroll for different businesses
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          The standalone workforce product supports organisations that need to coordinate
          attendance, shifts, leave, and payroll across teams or branches.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {solutions.filter((s) => s.product === "attendance").map((s) => (
            <Card key={s.slug}>
              <h3 className="text-lg font-semibold text-navy">{s.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.blurb}</p>
              <p className="mt-4 text-xs font-semibold tracking-wide text-primary uppercase">
                Recommended
              </p>
              <p className="text-sm">{products.attendance.name}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href={`/solutions/${s.slug}`} variant="navy">View solution</ButtonLink>
                <ButtonLink href="/book-demo">Book Demo</ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </section>
      </Section>
      <CtaBand
        title="Find the right solution for your business."
        text="Whether you manage a single petrol pump, multiple fuel stations or a growing workforce, explore a smarter way to manage everyday work."
        primary={{ href: "/book-demo", label: "Book a free demo" }}
        secondary={{ href: "/contact", label: "Talk to our team" }}
      />
    </>
  );
}
