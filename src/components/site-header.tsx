"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "@/lib/icons";
import { DesktopNav, MobileNav, mainNavItems } from "@/components/main-nav";

function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const activeHref =
    mainNavItems.find((item) =>
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.href ?? "";

  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (pathname === "/") {
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }
      scrollPageToTop();
      return;
    }
    router.push("/");
    // Ensure we land at the top after the home route paints
    requestAnimationFrame(() => {
      scrollPageToTop();
      window.setTimeout(scrollPageToTop, 50);
      window.setTimeout(scrollPageToTop, 200);
    });
  }

  return (
    <header className="sticky top-0 z-40 isolate">
      <div className="relative border-b border-navy/10 bg-white">
        <div className="site-container relative flex min-h-14 items-center justify-between gap-3 py-2.5 sm:min-h-20 sm:gap-4 sm:py-3.5 xl:min-h-24 xl:py-4">
          <Link
            href="/"
            onClick={goHome}
            className="relative z-20 shrink-0"
            aria-label="Petrozz home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pettroz-wh.svg" alt="Petrozz" className="h-7 w-auto sm:h-8" />
          </Link>

          <DesktopNav activeHref={activeHref} />

          <div className="relative z-20 flex shrink-0 items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-5 sm:flex">
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
      </div>
      <div id="pettroz-header-mega" className="relative" />
    </header>
  );
}
