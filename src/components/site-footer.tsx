import Link from "next/link";
import { products } from "@/lib/content";

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
      { href: "/solutions", label: "Solutions" },
      { href: "/blog", label: "Blog" },
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
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pettroz-fw.svg" alt="Pettroz" className="h-8 w-auto" />
          <p className="mt-4 text-sm text-white/70">Smarter Business. Simpler Management.</p>
          <p className="mt-3 text-sm text-white/60">One trusted brand. Two powerful solutions.</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="cursor-pointer text-sm text-white/70 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
