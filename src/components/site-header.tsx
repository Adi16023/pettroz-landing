"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { nav, products } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0 cursor-pointer" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pettroz-bl.svg" alt="Pettroz" className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.href === "/products" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <Link
                  href="/products"
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium",
                    pathname.startsWith("/products") ? "text-primary" : "text-foreground hover:bg-muted",
                  )}
                >
                  Products <ChevronDown className="size-3.5" />
                </Link>
                {productsOpen ? (
                  <div className="absolute top-full left-0 w-80 rounded-xl border border-border bg-card p-2 shadow-lg">
                    <Link
                      href={products.pump.href}
                      className="block cursor-pointer rounded-lg p-3 hover:bg-muted"
                    >
                      <p className="text-sm font-semibold text-navy">{products.pump.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{products.pump.short}</p>
                    </Link>
                    <Link
                      href={products.attendance.href}
                      className="block cursor-pointer rounded-lg p-3 hover:bg-muted"
                    >
                      <p className="text-sm font-semibold text-navy">{products.attendance.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{products.attendance.short}</p>
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === item.href ? "text-primary" : "text-foreground hover:bg-muted",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Login
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex h-10 cursor-pointer items-center rounded-lg bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90"
          >
            Book Free Demo
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex size-10 cursor-pointer items-center justify-center rounded-lg lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link href={products.pump.href} onClick={() => setOpen(false)} className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-muted">
              Petrol Pump Management
            </Link>
            <Link href={products.attendance.href} onClick={() => setOpen(false)} className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-muted">
              Attendance & Payroll
            </Link>
            <Link href="/login" onClick={() => setOpen(false)} className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-muted">
              Login
            </Link>
            <Link
              href="/book-demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-medium text-white"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
