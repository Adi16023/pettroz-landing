import Link from "next/link";
import { brand, products } from "@/lib/content";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.125 2.062 2.062 0 0 1 .004 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.76.07-2.25.1-3.3 1.14-3.4 3.4-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.1 2.25 1.15 3.3 3.4 3.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c2.25-.1 3.3-1.15 3.4-3.4.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.1-2.25-1.15-3.3-3.4-3.4-1.24-.06-1.61-.07-4.76-.07zm0 3.06a5.18 5.18 0 1 1 0 10.36 5.18 5.18 0 0 1 0-10.36zm0 1.8a3.38 3.38 0 1 0 0 6.76 3.38 3.38 0 0 0 0-6.76zm5.34-2.1a1.21 1.21 0 1 1 0 2.42 1.21 1.21 0 0 1 0-2.42z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

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
      { href: "/help", label: "Help Centre" },
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
