"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { DesktopNav, MobileNav, mainNavItems } from "@/components/main-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const activeHref =
    mainNavItems.find((item) =>
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.href ?? "";

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white">
      <div className="site-container relative flex min-h-24 items-center justify-between gap-4 py-4">
        <Link href="/" className="relative z-20 shrink-0" aria-label="Pettroz home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pettroz-bl.svg" alt="Pettroz" className="h-8 w-auto" />
        </Link>

        <DesktopNav activeHref={activeHref} />

        <div className="relative z-20 flex shrink-0 items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-5 sm:flex">
            <Link
              href="/login"
              className="py-3 text-[13px] font-medium transition-colors hover:text-primary"
            >
              Log in
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex min-h-11 items-center gap-3 rounded-full bg-primary px-5 text-xs font-semibold whitespace-nowrap text-white shadow-[0_4px_12px_#d9302218] transition-colors hover:bg-primary/90"
            >
              Book a free demo <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <MobileNav activeHref={activeHref} />
        </div>
      </div>
    </header>
  );
}
