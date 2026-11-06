import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  CarFront,
  ChartNoAxesCombined,
  Clock3,
  Contact,
  CreditCard,
  Droplets,
  Fuel,
  GitCompareArrows,
  HandCoins,
  Landmark,
  LayoutDashboard,
  Map,
  MapPin,
  MessageCircle,
  PieChart,
  Receipt,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ProductShowcase } from "@/components/product-showcase";
import { FuelBrandCarousel } from "@/components/fuel-brand-carousel";
import { HomeFaq } from "@/components/home-faq";
import { ButtonLink, CtaBand, Section } from "@/components/ui";
import {
  homeIntroduction,
  homeJourney,
  homeReasons,
  homeSections,
  products,
} from "@/lib/content";

const homeSectionIcons: Record<string, LucideIcon[]> = {
  automation: [ScanLine, CreditCard, MessageCircle, Bell, ChartNoAxesCombined],
  "financial-control": [TrendingUp, PieChart, Banknote, CreditCard, HandCoins, Receipt],
  "staff-management": [MapPin, CalendarDays, ShieldCheck, Users, Wallet, ChartNoAxesCombined],
  "customer-management": [Contact, CreditCard, CarFront, ShoppingBag, Bell, Wrench, MessageCircle],
  "reports-analytics": [ChartNoAxesCombined, Fuel, Clock3, Landmark, PieChart, Users, Truck, Users, CreditCard, GitCompareArrows],
  "multi-outlet-management": [MapPin, Map, LayoutDashboard, Wallet, Users, ChartNoAxesCombined, GitCompareArrows],
};

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

      <FuelBrandCarousel />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[6vw]">
          <div>
            <p className="text-sm font-medium text-muted-foreground">One connected platform</p>
            <h2 className="section-title mt-3">Everything your petrol pump needs. All in one place.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
              Fuel sales, nozzle readings, stock reconciliation, cash collections, credit customers,
              employee shifts and financial records all need attention. Pettroz brings these
              activities together to help simplify daily work and improve business visibility.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {homeIntroduction.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-navy">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/solutions" variant="navy" className="mt-7">Discover Pettroz solutions</ButtonLink>
          </div>
          <div className="rounded-3xl bg-[#f4f3ef] p-6 sm:p-9">
            <p className="text-sm font-semibold text-navy">More control. Less manual work.</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-navy">Designed around everyday station work.</h3>
            <ul className="mt-7 grid gap-6 sm:grid-cols-2">
              {homeReasons.map((reason) => (
                <li key={reason.title}>
                  <h4 className="text-sm font-semibold text-navy">{reason.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{reason.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

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

      {/*
      <Section className="bg-[#f4f3ef]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Built for every fuel station</p>
            <h2 className="section-title mt-3 max-w-2xl">Management tools for stations across India.</h2>
          </div>
          <Link href="/solutions" className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-navy hover:text-primary">
            Explore brand-specific solutions<ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Organise everyday station activities for major fuel brands or independent operators.
          Brand references describe operational use cases and do not imply affiliation, endorsement
          or integration with proprietary oil-company systems.
        </p>
        <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {fuelStationBrands.map((station) => (
            <li key={station.name} className="border-t border-navy/15 pt-5">
              <h3 className="text-base font-semibold text-navy">{station.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{station.summary}</p>
            </li>
          ))}
        </ul>
      </Section>
      */}

      {homeSections.map((section, sectionIndex) => (
        <Section
          key={section.id}
          id={section.id}
          className={sectionIndex % 2 === 0 ? "bg-[#f4f3ef]" : ""}
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
            <div className="max-w-3xl">
              <p className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-navy">
                {section.title}
              </p>
              <h2 className="section-title mt-4">{section.heading}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{section.description}</p>
            </div>
            <Link href={section.href} className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-navy transition-colors hover:text-primary">
              {section.link}<ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item, itemIndex) => {
              const Icon = homeSectionIcons[section.id]?.[itemIndex] ?? Fuel;

              return (
                <li
                  key={item.title}
                  className={`group rounded-2xl border border-navy/10 p-5 transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-navy/5 sm:p-6 ${sectionIndex % 2 === 0 ? "bg-white" : "bg-[#f4f3ef]"}`}
                >
                  <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      ))}

      <Section className="bg-[#f4f3ef]">
        <p className="text-sm font-medium text-muted-foreground">From daily operations to business growth</p>
        <h2 className="section-title mt-3 max-w-2xl">A clearer way to move your business forward.</h2>
        <ol className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {homeJourney.map((step, index) => (
            <li key={step.title} className="border-t border-navy/20 pt-5">
              <span className="text-xs font-semibold tracking-widest text-primary">0{index + 1}</span>
              <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-14">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Frequently asked questions</p>
            <h2 className="section-title mt-3">A few things you might be wondering.</h2>
            <Link href="/help" className="mt-6 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-navy hover:text-primary">
              Visit the help center<ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <HomeFaq />
        </div>
      </Section>
      <CtaBand
        title="Ready to manage your petrol pump smarter?"
        text="Bring fuel station operations, accounting, inventory, employees, payments and customer management together. Your petrol pump. Your operations. One smarter platform."
        primary={{ href: "/book-demo", label: "Book a free demo" }}
        secondary={{ href: "/contact", label: "Talk to our team" }}
      />
    </>
  );
}
