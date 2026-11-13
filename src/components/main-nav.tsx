"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Fuel,
  LayoutGrid,
  MapPin,
  Store,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { BlogMegaPanel, BlogMobileLinks } from "@/components/blog-mega-menu";
import {
  allFeatures,
  featureThemes,
  fuelStationBrands,
  petrolPumpSolutions,
  products,
} from "@/lib/content";
import { getFeatureIcon } from "@/lib/feature-icons";
import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  href: string;
  mega?: boolean;
};

export const mainNavItems: NavItem[] = [
  { href: "/products", label: "Products", mega: true },
  { href: "/features", label: "Features", mega: true },
  { href: "/resources", label: "Resources", mega: true },
  { href: "/solutions", label: "Solutions", mega: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const productLinks: {
  href: string;
  label: string;
  text: string;
  Icon: LucideIcon;
}[] = [
  {
    href: products.pump.href,
    label: "Petrol Pump Management",
    text: products.pump.short,
    Icon: Fuel,
  },
  {
    href: products.attendance.href,
    label: "Attendance & Payroll",
    text: products.attendance.short,
    Icon: Users,
  },
];

const themeIconMap: Record<string, LucideIcon> = {
  "station-operations": Fuel,
  "money-accounts": Wallet,
  "customers-automation": Store,
  visibility: LayoutGrid,
  "attendance-capture": MapPin,
  "scheduling-leave": CalendarDays,
  "people-pay": Users,
};

const featureBySlug = Object.fromEntries(allFeatures.map((feature) => [feature.slug, feature]));

const featureMegaGroups = [
  {
    title: "Petrol Pump",
    href: "/features",
    Icon: Fuel,
    columns: featureThemes.pump.map((theme) => ({
      id: theme.id,
      title: theme.title,
      href: `/features#${theme.id}`,
      Icon: themeIconMap[theme.id] ?? LayoutGrid,
      features: theme.slugs
        .map((slug) => featureBySlug[slug])
        .filter((feature): feature is (typeof allFeatures)[number] => Boolean(feature))
        .map((feature) => ({
          href: `/features/${feature.slug}`,
          label: feature.name,
          Icon: getFeatureIcon(feature.slug),
        })),
    })),
  },
  {
    title: "Attendance & Payroll",
    href: "/features",
    Icon: Users,
    columns: featureThemes.attendance.map((theme) => ({
      id: theme.id,
      title: theme.title,
      href: `/features#${theme.id}`,
      Icon: themeIconMap[theme.id] ?? LayoutGrid,
      features: theme.slugs
        .map((slug) => featureBySlug[slug])
        .filter((feature): feature is (typeof allFeatures)[number] => Boolean(feature))
        .map((feature) => ({
          href: `/features/${feature.slug}`,
          label: feature.name,
          Icon: getFeatureIcon(feature.slug),
        })),
    })),
  },
];

const businessIcons: LucideIcon[] = [Store, Users, Building2, LayoutGrid, Fuel];

function MegaPanel({
  openHref,
  onNavigate,
}: {
  openHref: string | null;
  onNavigate: () => void;
}) {
  if (openHref === "/products") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {productLinks.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            style={{ animationDelay: `${index * 60}ms` }}
            className="pettroz-mega-item group flex gap-4 rounded-2xl border border-navy/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_16px_40px_-28px_#1a1c2950]"
          >
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
              <item.Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
              <p className="text-base font-semibold text-navy transition-colors group-hover:text-primary">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-all group-hover:gap-2.5 group-hover:text-primary">
                Learn more <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  if (openHref === "/features") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:gap-10">
        {featureMegaGroups.map((group, groupIndex) => (
          <div
            key={group.title}
            style={{ animationDelay: `${groupIndex * 70}ms` }}
            className="pettroz-mega-item"
          >
            <Link
              href={group.href}
              onClick={onNavigate}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase"
            >
              <group.Icon className="size-3.5" aria-hidden="true" />
              {group.title}
            </Link>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.columns.map((column, columnIndex) => (
                <div
                  key={column.id}
                  style={{ animationDelay: `${90 + groupIndex * 70 + columnIndex * 45}ms` }}
                  className="pettroz-mega-item"
                >
                  <Link
                    href={column.href}
                    onClick={onNavigate}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary"
                  >
                    <span className="inline-flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <column.Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                    </span>
                    {column.title}
                  </Link>
                  <ul className="mt-3 space-y-0.5 border-l border-navy/10 pl-3">
                    {column.features.map((feature) => (
                      <li key={feature.href}>
                        <Link
                          href={feature.href}
                          onClick={onNavigate}
                          className="group flex min-h-9 items-center gap-2 rounded-lg px-2 text-[13px] leading-5 text-muted-foreground transition-colors hover:bg-navy/[0.04] hover:text-primary"
                        >
                          <feature.Icon
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-navy/35 transition-colors group-hover:text-primary"
                            strokeWidth={1.8}
                          />
                          <span className="line-clamp-2">{feature.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (openHref === "/resources") {
    return <BlogMegaPanel onNavigate={onNavigate} />;
  }

  if (openHref === "/solutions") {
    return (
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="pettroz-mega-item" style={{ animationDelay: "40ms" }}>
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase"
          >
            <Building2 className="size-3.5" aria-hidden="true" />
            Petrol pump businesses
          </Link>
          <ul className="mt-4 space-y-1">
            {petrolPumpSolutions.map((item, index) => {
              const Icon = businessIcons[index % businessIcons.length];
              return (
                <li
                  key={item.name}
                  style={{ animationDelay: `${100 + index * 40}ms` }}
                  className="pettroz-mega-item"
                >
                  <Link
                    href="/solutions"
                    onClick={onNavigate}
                    className="group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-navy transition-all duration-200 hover:bg-navy/[0.04] hover:text-primary"
                  >
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                    </span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pettroz-mega-item" style={{ animationDelay: "80ms" }}>
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase"
          >
            <Fuel className="size-3.5" aria-hidden="true" />
            Fuel brands
          </Link>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {fuelStationBrands.map((brand, index) => (
              <li
                key={brand.slug}
                style={{ animationDelay: `${120 + index * 35}ms` }}
                className="pettroz-mega-item w-[calc(50%-0.25rem)] sm:w-[calc(33.333%-0.34rem)]"
              >
                <Link
                  href={`/solutions/${brand.slug}`}
                  onClick={onNavigate}
                  className="group flex min-h-14 w-full flex-col items-center justify-center gap-2 rounded-xl border border-navy/10 bg-white px-3 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_28px_-20px_#1a1c2945]"
                >
                  <span className="flex h-8 w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={brand.image}
                      alt=""
                      width={72}
                      height={32}
                      className="max-h-7 w-auto object-contain"
                    />
                  </span>
                  <span className="text-xs font-semibold text-navy transition-colors group-hover:text-primary">
                    {brand.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
}

export function DesktopNav({ activeHref }: { activeHref: string }) {
  const track = useRef<HTMLUListElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const highlightedHref = focused ?? hovered ?? activeHref;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    const list = track.current;
    const pill = highlight.current;
    if (!list || !pill) return;
    function update() {
      if (!list || !pill) return;
      const index = mainNavItems.findIndex((item) => item.href === highlightedHref);
      const item = index >= 0 ? list.children.item(index) : null;
      if (!(item instanceof HTMLElement)) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.width = `${item.offsetWidth}px`;
      pill.style.transform = `translateX(${item.offsetLeft}px)`;
      pill.style.opacity = "1";
    }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [highlightedHref]);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMega(href: string) {
    clearCloseTimer();
    setMegaOpen(href);
  }

  function scheduleCloseMega() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setMegaOpen(null), 140);
  }

  function navigate() {
    setMegaOpen(null);
    setHovered(null);
    setFocused(null);
  }

  const itemClass =
    "inline-flex min-h-11 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full px-4 text-[13px] font-medium";

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center xl:flex"
        onPointerLeave={() => {
          setHovered(null);
          scheduleCloseMega();
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(null);
            setMegaOpen(null);
          }
        }}
      >
        <div
          className="pettroz-pill-surface relative rounded-full p-1"
          onPointerEnter={clearCloseTimer}
        >
          <div className="relative">
            <span
              ref={highlight}
              aria-hidden="true"
              className="pettroz-nav-glide pointer-events-none absolute inset-y-0 left-0 rounded-full bg-primary opacity-0 shadow-[inset_0_1px_0_#ffffff30,0_4px_12px_-4px_#00000040]"
            />
            <ul ref={track} className="relative flex gap-0.5">
              {mainNavItems.map((item) => (
                <li
                  key={item.href}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "touch") return;
                    setHovered(item.href);
                    if (item.mega) openMega(item.href);
                    else setMegaOpen(null);
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={navigate}
                    onFocus={(event) => {
                      const visible = event.currentTarget.matches(":focus-visible");
                      setFocused(visible ? item.href : null);
                      if (visible && item.mega) openMega(item.href);
                    }}
                    onBlur={() => setFocused(null)}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    aria-expanded={item.mega ? megaOpen === item.href : undefined}
                    className={cn(
                      itemClass,
                      "relative transition-colors duration-200 focus-visible:outline-white",
                      highlightedHref === item.href ? "text-white" : "text-white/75",
                    )}
                  >
                    {item.label}
                    {item.mega ? (
                      <ChevronDown
                        className={cn(
                          "size-3.5 opacity-70 transition-transform duration-300",
                          megaOpen === item.href && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {megaOpen ? (
        <div
          key={megaOpen}
          className="pettroz-mega absolute top-full right-[max(1.25rem,4vw)] left-[max(1.25rem,4vw)] z-30 mt-2 hidden overflow-hidden rounded-[16px] border border-navy/10 bg-white shadow-[0_28px_56px_-32px_#1a1c2948] xl:block"
          onPointerEnter={clearCloseTimer}
          onPointerLeave={scheduleCloseMega}
        >
          <div className="site-container py-8">
            <MegaPanel openHref={megaOpen} onNavigate={navigate} />
            <div
              className="pettroz-mega-item mt-6 flex justify-end"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                href={megaOpen}
                onClick={navigate}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-all hover:gap-3 hover:text-primary"
              >
                View all{" "}
                {mainNavItems.find((item) => item.href === megaOpen)?.label.toLowerCase()}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function MobileNav({ activeHref }: { activeHref: string }) {
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function navigate() {
    setOpen(false);
    setSection(null);
  }

  return (
    <div ref={root} className="relative xl:hidden">
      <button
        ref={toggle}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="pettroz-pill-surface relative z-10 grid size-[52px] shrink-0 place-items-center rounded-full text-white focus-visible:outline-navy"
      >
        <span className="relative h-3 w-[18px]" aria-hidden="true">
          <span
            className={cn(
              "absolute left-0 h-0.5 w-full rounded-full bg-current transition-[top,rotate] duration-300",
              open ? "top-[5px] rotate-45" : "top-[2px]",
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-0.5 w-full rounded-full bg-current transition-[top,rotate] duration-300",
              open ? "top-[5px] -rotate-45" : "top-[10px]",
            )}
          />
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          className="pettroz-pill-surface pettroz-nav-panel absolute top-0 right-0 z-20 w-[min(340px,calc(100vw-1.5rem))] overflow-hidden rounded-[26px] px-2 pt-16 pb-2 text-white"
        >
          <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain">
            <ul className="space-y-0.5">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  {item.mega ? (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setSection((current) => (current === item.href ? null : item.href))
                        }
                        aria-expanded={section === item.href}
                        className={cn(
                          "flex min-h-12 w-full items-center justify-between rounded-[18px] px-4 text-sm font-medium transition-colors",
                          activeHref === item.href || section === item.href
                            ? "bg-primary text-white"
                            : "hover:bg-white/10",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform",
                            section === item.href && "rotate-180",
                          )}
                        />
                      </button>
                      {section === item.href ? (
                        <div className="mt-1 mb-2 space-y-1 px-2">
                          <Link
                            href={item.href}
                            onClick={navigate}
                            className="flex min-h-10 items-center rounded-2xl px-3 text-xs font-semibold text-white/90 hover:bg-white/10"
                          >
                            Overview
                          </Link>
                          {item.href === "/products"
                            ? productLinks.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={navigate}
                                  className="flex min-h-10 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
                                >
                                  {link.label}
                                </Link>
                              ))
                            : null}
                          {item.href === "/features"
                            ? featureMegaGroups.flatMap((group) =>
                                group.columns.flatMap((column) => [
                                  <p
                                    key={`${group.title}-${column.id}-label`}
                                    className="px-3 pt-2 text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase"
                                  >
                                    {column.title}
                                  </p>,
                                  ...column.features.map((feature) => (
                                    <Link
                                      key={feature.href}
                                      href={feature.href}
                                      onClick={navigate}
                                      className="flex min-h-10 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
                                    >
                                      {feature.label}
                                    </Link>
                                  )),
                                ]),
                              )
                            : null}
                          {item.href === "/resources" ? <BlogMobileLinks onNavigate={navigate} /> : null}
                          {item.href === "/solutions" ? (
                            <>
                              {petrolPumpSolutions.slice(0, 4).map((solution) => (
                                <Link
                                  key={solution.name}
                                  href="/solutions"
                                  onClick={navigate}
                                  className="flex min-h-10 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
                                >
                                  {solution.name}
                                </Link>
                              ))}
                              {fuelStationBrands.map((brand) => (
                                <Link
                                  key={brand.slug}
                                  href={`/solutions/${brand.slug}`}
                                  onClick={navigate}
                                  className="flex min-h-10 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
                                >
                                  {brand.name}
                                </Link>
                              ))}
                            </>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={navigate}
                      aria-current={activeHref === item.href ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center rounded-[18px] px-4 text-sm font-medium transition-colors focus-visible:-outline-offset-2 focus-visible:outline-white",
                        activeHref === item.href ? "bg-primary text-white" : "hover:bg-white/10",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mx-3 my-3 border-t border-white/15" />
            <div className="px-1 pb-1 sm:hidden">
              <Link
                href="/login"
                onClick={navigate}
                className="flex min-h-11 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
              >
                Log in
              </Link>
              <Link
                href="/book-demo"
                onClick={navigate}
                className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Book a free demo
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
