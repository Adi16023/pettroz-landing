import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  XIcon,
} from "@/components/social-icons";
import { brand, products } from "@/lib/content";

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/petrozz",
    label: "Petrozz on LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://www.instagram.com/petrozz.app/",
    label: "Petrozz on Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61595052526662",
    label: "Petrozz on Facebook",
    Icon: FacebookIcon,
  },
  {
    href: "https://www.youtube.com/channel/UCdwXWwb7T318z3E4iIwyrfg",
    label: "Petrozz on YouTube",
    Icon: YouTubeIcon,
  },
  {
    href: "https://x.com/petrozzhq",
    label: "Petrozz on X",
    Icon: XIcon,
  },
];

const cols = [
  {
    title: "Product",
    links: [
      { href: products.pump.href, label: "Petrol Pump Management" },
      { href: products.attendance.href, label: "Attendance & Payroll" },
      { href: "/features", label: "Integrations" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions/individual-petrol-pumps", label: "Single Station" },
      { href: "/solutions/multi-outlet-petrol-pumps", label: "Multiple Stations" },
      { href: "/features/cng-ev-operations", label: "CNG & EV Operations" },
      { href: "/solutions", label: "Dealer Network" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/help-centre", label: "Help Centre" },
      { href: "/resources", label: "User Guides" },
      { href: "/resources", label: "Video Tutorials" },
      { href: "/resources", label: "Release Updates" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/about", label: "How We Work" },
      { href: "/contact", label: "Careers" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  /*
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund-policy", label: "Cancellation & Refund" },
      { href: "/cookie-policy", label: "Cookie Policy" },
    ],
  },
  */
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 bg-navy text-white">
      <div className="site-container grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 lg:py-20">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pettroz-fw.svg" alt="Petrozz" className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
            Smarter business management for petrol pumps and workforces.
            <br />
            Built for stations and teams across India.
          </p>
          <p className="mt-4 text-sm font-medium text-white/85">
            For queries{" "}
            <a
              href={`mailto:${brand.supportEmail}`}
              className="font-bold text-white transition-colors hover:text-primary"
            >
              {brand.supportEmail}
            </a>
          </p>
          <ul className="mt-5 flex items-center gap-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex text-white/85 transition-colors hover:text-primary"
                >
                  <Icon className="size-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-bold tracking-wide text-white">{col.title}</p>
            <ul className="mt-5 space-y-1">
              {col.links.map((l) => (
                <li key={`${col.title}-${l.label}`}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-xs leading-relaxed text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="site-container flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Petrozz. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-0 gap-y-2">
          {legalLinks.map((link, index) => (
            <span key={link.href} className="inline-flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-2.5 size-1 shrink-0 rounded-full bg-primary" />
              ) : null}
              <Link href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
