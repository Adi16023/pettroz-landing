import Link from "next/link";
import { products } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

const cols = [
  {
    title: "Products",
    links: [
      { href: products.pump.href, label: "Petrol Pump Management" },
      { href: products.attendance.href, label: "Attendance & Payroll" },
      { href: "/pricing", label: "Pricing" },
      { href: "/features", label: "Features" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/solutions", label: "Solutions" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/book-demo", label: "Book Free Demo" },
      { href: "/login", label: "Login" },
      { href: "/signup", label: "Get Started" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund-policy", label: "Cancellation & Refund" },
      { href: "/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-background text-navy">
      <div className="site-container grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-6 lg:gap-10 lg:py-20">
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pettroz-bl.svg" alt="Pettroz" className="h-8 w-auto" />
          <Link href="/contact" className="mt-5 flex min-h-11 w-fit items-center gap-3 text-xs font-semibold hover:text-primary">Contact us <ArrowUpRight className="size-3.5" /></Link>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{col.title}</p>
            <ul className="mt-5 space-y-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center text-xs leading-relaxed text-navy/75 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="site-container border-t border-border py-6 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Pettroz. All rights reserved.</p>
      </div>
    </footer>
  );
}
