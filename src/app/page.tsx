import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, BookOpen, Building2, CalendarDays, Droplets, Fuel, MapPin, Plus, Users, Wallet } from "lucide-react";
import { ProductShowcase } from "@/components/product-showcase";
import { ButtonLink, CtaBand, Section } from "@/components/ui";
import { products } from "@/lib/content";

const pumpFeatures = [
  { title: "Sales to daily closing", description: "Bill fuel sales across cash, UPI, card and credit. Reconcile collections and close each shift with a clear DSR.", Icon: Fuel },
  { title: "Stock, from delivery to sale", description: "Track purchases, tank levels, dip readings and stock variation, alongside lubricants and shop inventory.", Icon: Droplets },
  { title: "Customers, credit & loyalty", description: "Manage credit limits, outstanding balances and collections. Reward repeat customers with points and redemptions.", Icon: BookOpen },
  { title: "A clear view of your business", description: "Follow investments, expenses and profit, then compare sales, stock and financial reports across outlets.", Icon: BarChart3 },
];

const attendanceFeatures = [
  { title: "Know who’s at work", description: "Mobile check-ins with GPS, geofencing and selfie or face verification. Connect supported biometric devices too.", Icon: MapPin },
  { title: "Keep every shift covered", description: "Plan rosters, manage leave and holidays, and track overtime without separate registers.", Icon: CalendarDays },
  { title: "Turn hours into accurate pay", description: "Calculate salaries from attendance, leave and overtime. Give employees access to payslips, records and leave requests.", Icon: Wallet },
  { title: "Bring every branch together", description: "Manage teams across locations and review attendance patterns, working hours and payroll reports in one workspace.", Icon: Building2 },
];

const faqs = [
  { q: "Which Pettroz product is right for my business?", a: "Choose Petrol Pump Management for fuel sales, tank stock, billing and station operations. Choose Attendance & Payroll for managing employees, shifts, leave and salaries in any type of business." },
  { q: "Can I use Attendance & Payroll without the petrol pump software?", a: "Yes. Attendance & Payroll is a standalone product for offices, shops, factories, restaurants, warehouses and other teams. No Petrol Pump Management subscription is required." },
  { q: "Is attendance and payroll included with petrol pump management?", a: "Integrated Attendance & Payroll is available with eligible Petrol Pump Management subscriptions. Our team will confirm the included modules and entitlements for your plan." },
  { q: "Can Pettroz support multiple outlets or branches?", a: "Pettroz offers multi-outlet fuel station management and multi-branch workforce management. The appropriate configuration and access controls depend on your selected product and subscription." },
  { q: "How do I find out about pricing?", a: "Visit our pricing page to explore the available configurations. Final pricing, employee or outlet limits, integrations and support are confirmed with sales before you subscribe." },
];

export default function HomePage() {
  return (
    <>
      <section>
        <div className="site-container grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[4vw] lg:pt-20 lg:pb-24">
          <div className="reveal-in min-w-0">
            <h1 className="max-w-3xl text-[clamp(2.6rem,4.4vw,5.5rem)] leading-[1.08] font-semibold tracking-[-0.05em] text-navy">
              Run your business.<br /><span className="text-primary">Not the paperwork.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-[1.85] text-muted-foreground">Manage your petrol pump’s sales, stock and accounts, or your team’s attendance and payroll. Choose the Pettroz product that fits your business.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/book-demo">Book a free demo <ArrowUpRight className="size-4" /></ButtonLink>
              <ButtonLink href="#products" variant="ghost">Find your product <ArrowRight className="size-4" /></ButtonLink>
            </div>
          </div>
          <ProductShowcase />
        </div>
      </section>

      <Section id="products">
        <h2 className="section-title">Choose your software</h2>
        <div className="mt-10 border-t border-navy/15 sm:mt-14">
          {([
            { product: products.attendance, title: "Attendance & Payroll", description: "Your people, their time and their pay. For any business with a team.", color: "bg-[#e6ede3] text-[#35604b]", features: attendanceFeatures, Icon: Users, includesAttendance: false },
            { product: products.pump, title: "Petrol Pump Management", description: "Your team and your entire station, managed together.", color: "bg-[#f6e5dc] text-[#a6412b]", features: pumpFeatures, Icon: Fuel, includesAttendance: true },
          ]).map(({ product, title, description, color, features, Icon, includesAttendance }) => (
            <article key={product.slug} className="grid gap-10 border-b border-navy/15 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-[6vw]">
              <div>
                <div className={`mb-6 inline-flex size-14 items-center justify-center rounded-2xl ${color}`}>
                  <Icon aria-hidden="true" className="size-7" strokeWidth={1.5} />
                </div>
                <h3 className="max-w-sm text-3xl leading-tight font-semibold tracking-[-0.04em] text-navy sm:text-4xl">{title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{description}</p>
                {includesAttendance ? (
                  <div className="mt-6 border-l-2 border-[#a6412b]/40 pl-4">
                    <p className="text-sm font-semibold text-navy">Attendance & Payroll included, plus station operations.</p>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">On eligible plans. Our team will confirm the included modules.</p>
                  </div>
                ) : <p className="mt-4 text-sm text-muted-foreground">No petrol pump software required.</p>}
                <Link href={`${product.href}#showcase`} className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-navy transition-colors hover:text-primary">
                  Explore {title}<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </Link>
              </div>
              <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:pt-1">
                {features.map(({ title: feature, description, Icon: FeatureIcon }) => (
                  <li key={feature}>
                    <FeatureIcon aria-hidden="true" className={`mb-4 size-6 ${includesAttendance ? "text-[#a6412b]" : "text-[#35604b]"}`} strokeWidth={1.5} />
                    <h4 className="text-base font-semibold tracking-tight text-navy">{feature}</h4>
                    <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div><h2 className="section-title">Common questions</h2><Link href="/help" className="mt-6 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-navy hover:text-primary">Visit the help center <ArrowUpRight className="size-4" /></Link></div>
          <div className="border-t border-border">
            {faqs.map((faq) => <details key={faq.q} className="group border-b border-border"><summary className="flex min-h-20 items-center justify-between gap-6 py-5 text-sm leading-relaxed font-medium text-navy">{faq.q}<Plus className="faq-plus size-4 shrink-0 text-muted-foreground transition-transform duration-200" /></summary><p className="max-w-xl pb-6 pr-6 text-sm leading-7 text-muted-foreground">{faq.a}</p></details>)}
          </div>
        </div>
      </Section>
      <CtaBand title="See Pettroz in action." text="Get a walkthrough of the product that fits your business." primary={{ href: "/book-demo", label: "Book a free demo" }} secondary={{ href: "/features", label: "View features" }} />
    </>
  );
}
