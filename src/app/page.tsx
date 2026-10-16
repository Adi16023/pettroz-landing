import { AttendancePreview, PumpPreview } from "@/components/product-preview";
import { ButtonLink, Card, CtaBand, H1, Kicker, Lead, Section } from "@/components/ui";
import { products, why } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Section className="pb-8 pt-20">
        <Kicker>TWO POWERFUL PRODUCTS. ONE SMART PLATFORM.</Kicker>
        <H1>Smarter Software for Petrol Pumps & Growing Businesses.</H1>
        <Lead>
          From managing your entire petrol pump to tracking employee attendance and payroll, Pettroz
          brings powerful business management tools into one simple platform. Whether you operate a
          fuel station or manage a growing workforce, Pettroz helps you save time, reduce manual
          work, and stay in control.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products">Explore Our Products</ButtonLink>
          <ButtonLink href="/book-demo" variant="navy">
            Book Free Demo
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <PumpPreview />
          <AttendancePreview />
        </div>
      </Section>

      <Section className="pt-8">
        <h2 className="text-3xl font-semibold text-navy">Choose the Right Pettroz Software for Your Business.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">Product 1</p>
            <h3 className="mt-2 text-2xl font-semibold text-navy">{products.pump.name}</h3>
            <p className="mt-2 font-medium">{products.pump.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Manage fuel sales, billing, stock, purchases, daily closing, expenses, credit customers,
              capital, profitability, staff attendance, and payroll from one connected system.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {products.pump.highlights.map((h) => (
                <li key={h} className="border-l-2 border-primary pl-3">
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={products.pump.href}>Explore Petrol Pump Software</ButtonLink>
              <ButtonLink href="/book-demo" variant="navy">
                Book Demo
              </ButtonLink>
            </div>
          </Card>
          <Card>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">Product 2</p>
            <h3 className="mt-2 text-2xl font-semibold text-navy">{products.attendance.name}</h3>
            <p className="mt-2 font-medium">{products.attendance.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{products.attendance.description}</p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {products.attendance.highlights.map((h) => (
                <li key={h} className="border-l-2 border-navy pl-3">
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={products.attendance.href}>Explore Attendance Software</ButtonLink>
              <ButtonLink href="/book-demo" variant="navy">
                Book Demo
              </ButtonLink>
            </div>
          </Card>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Use each Pettroz product independently. Petrol Pump Management customers also receive
          integrated Attendance & Payroll functionality according to their subscription.
        </p>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold text-navy">Powerful Features. Simple Experience.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w) => (
            <Card key={w.title} className="p-5">
              <h3 className="font-semibold text-navy">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold text-navy">How Pettroz Works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {[
            "Choose Your Product.",
            "Set Up Your Business.",
            "Add Employees, Products, or Fuel Station Details.",
            "Start Managing Your Operations.",
            "Track Performance Through Reports.",
          ].map((step, i) => (
            <li key={step} className="rounded-2xl border border-border bg-card p-5">
              <span className="text-sm font-semibold text-primary">{i + 1}</span>
              <p className="mt-2 text-sm font-medium text-navy">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <h2 className="text-3xl font-semibold text-navy">Built for the People Running Businesses Every Day.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Customer stories will appear here once we have permissioned, authentic feedback. We do not
          publish invented reviews, ratings, customer counts, or performance statistics.
        </p>
      </Section>

      <CtaBand
        title="Ready to Run Your Business the Smarter Way?"
        text="Discover how Pettroz can simplify your daily operations."
        primary={{ href: "/book-demo", label: "Book Free Demo" }}
        secondary={{ href: "/contact", label: "Contact Sales" }}
      />
    </>
  );
}
