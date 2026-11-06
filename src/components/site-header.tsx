"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PillNav, type PillNavItem } from "@/components/pill-nav";

const items: PillNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const activeHref = items.find((item) => item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`))?.href ?? "";

  return (
    <header className="sticky top-0 z-40 border-b border-navy/[0.06] bg-background/90 backdrop-blur-xl">
      <div className="site-container flex min-h-24 items-center justify-between gap-4 py-4 xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link href="/" className="shrink-0 justify-self-start" aria-label="Pettroz home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pettroz-bl.svg" alt="Pettroz" className="h-8 w-auto" />
        </Link>
        <div className="flex min-w-0 flex-1 justify-center">
          <PillNav key={pathname} items={items} activeHref={activeHref} />
        </div>
        <div className="hidden shrink-0 items-center gap-5 justify-self-end sm:flex">
          <Link href="/login" className="py-3 text-[13px] font-medium transition-colors hover:text-primary">Log in</Link>
          <Link href="/book-demo" className="inline-flex min-h-11 items-center gap-3 rounded-full bg-primary px-5 text-xs font-semibold whitespace-nowrap text-white shadow-[0_4px_12px_#d9302218] transition-colors hover:bg-primary/90">Book a free demo <ArrowUpRight className="size-3.5" /></Link>
        </div>
      </div>
    </header>
  );
}
