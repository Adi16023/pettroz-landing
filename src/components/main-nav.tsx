"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { RiGasStationFill, RiTeamFill } from "@remixicon/react";
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

const productLinks = [
  {
    href: products.pump.href,
    label: "Petrol Pump Management",
    text: products.pump.short,
    Icon: RiGasStationFill,
  },
  {
    href: products.attendance.href,
    label: "Attendance & Payroll",
    text: products.attendance.short,
    Icon: RiTeamFill,
  },
] as const;

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

const featureCategoryCardClass =
  "group inline-flex w-full items-center gap-2 rounded-xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-[0_16px_40px_-28px_#1a1c2950]";

function FeatureMegaColumn({
  column,
  onNavigate,
  delay,
  extra = [],
}: {
  column: (typeof featureMegaGroups)[number]["columns"][number];
  onNavigate: () => void;
  delay: number;
  extra?: (typeof featureMegaGroups)[number]["columns"];
}) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className="pettroz-mega-item">
      <Link href={column.href} onClick={onNavigate} className={featureCategoryCardClass}>
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
          <column.Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        </span>
        {column.title}
      </Link>
      <ul className="mt-3 space-y-0.5">
        {column.features.map((feature) => (
          <li key={feature.href}>
            <Link
              href={feature.href}
              onClick={onNavigate}
              className="group flex min-h-9 items-center gap-2 rounded-lg px-1.5 text-[13px] leading-5 text-muted-foreground transition-colors hover:text-primary"
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
      {extra.map((block) => (
        <div key={block.id} className="mt-5">
          <Link href={block.href} onClick={onNavigate} className={featureCategoryCardClass}>
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
              <block.Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            </span>
            {block.title}
          </Link>
          <ul className="mt-3 space-y-0.5">
            {block.features.map((feature) => (
              <li key={feature.href}>
                <Link
                  href={feature.href}
                  onClick={onNavigate}
                  className="group flex min-h-9 items-center gap-2 rounded-lg px-1.5 text-[13px] leading-5 text-muted-foreground transition-colors hover:text-primary"
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
  );
}

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
            <span className="inline-flex size-12 shrink-0 items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
              <item.Icon aria-hidden="true" className="size-5" />
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
    const pumpGroup = featureMegaGroups[0];
    const attendanceGroup = featureMegaGroups[1];
    const pumpColumns = pumpGroup.columns.filter((column) => column.id !== "visibility");
    const visibilityColumn = pumpGroup.columns.find((column) => column.id === "visibility");
    const attendanceMain = attendanceGroup.columns.slice(0, 2);
    const attendancePeople = attendanceGroup.columns.slice(2);

    return (
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <section
            style={{ animationDelay: "40ms" }}
            className="pettroz-mega-item overflow-hidden rounded-2xl border border-navy/10 bg-white"
          >
            <div className="flex justify-center border-b border-navy/10 px-5 py-4">
              <Link
                href={products.pump.href}
                onClick={onNavigate}
                className="inline-flex items-center justify-center gap-2.5 text-center text-lg font-bold tracking-tight text-navy transition-colors hover:text-primary"
              >
                <RiGasStationFill
                  aria-hidden
                  className="size-6 shrink-0 text-primary"
                />
                Petrol Pump Management
              </Link>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {pumpColumns.map((column, columnIndex) => (
                <FeatureMegaColumn
                  key={column.id}
                  column={column}
                  onNavigate={onNavigate}
                  delay={80 + columnIndex * 40}
                />
              ))}
            </div>
          </section>

          <section
            style={{ animationDelay: "90ms" }}
            className="pettroz-mega-item overflow-hidden rounded-2xl border border-navy/10 bg-white"
          >
            <div className="flex justify-center border-b border-navy/10 px-5 py-4">
              <Link
                href={products.attendance.href}
                onClick={onNavigate}
                className="inline-flex items-center justify-center gap-2.5 text-center text-lg font-bold tracking-tight text-navy transition-colors hover:text-primary"
              >
                <RiTeamFill
                  aria-hidden
                  className="size-6 shrink-0 text-primary"
                />
                Attendance & Payroll
              </Link>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-2">
              {attendanceMain.map((column, columnIndex) => (
                <FeatureMegaColumn
                  key={column.id}
                  column={column}
                  onNavigate={onNavigate}
                  delay={120 + columnIndex * 40}
                  extra={columnIndex === 1 ? attendancePeople : undefined}
                />
              ))}
            </div>
          </section>
        </div>

        {visibilityColumn ? (
          <section
            style={{ animationDelay: "160ms" }}
            className="pettroz-mega-item flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              <Link
                href={visibilityColumn.href}
                onClick={onNavigate}
                className="inline-flex shrink-0 items-center gap-2.5 text-sm font-semibold text-navy transition-colors hover:text-primary"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LayoutGrid aria-hidden="true" className="size-4" strokeWidth={1.8} />
                </span>
                {visibilityColumn.title}
              </Link>
              <ul className="flex flex-wrap items-center gap-2">
                {visibilityColumn.features.map((feature) => (
                  <li key={feature.href}>
                    <Link
                      href={feature.href}
                      onClick={onNavigate}
                      className="group inline-flex items-center gap-2 rounded-xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm font-medium text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-[0_16px_40px_-28px_#1a1c2950]"
                    >
                      <span className="inline-flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                        <feature.Icon
                          aria-hidden="true"
                          className="size-3.5"
                          strokeWidth={1.8}
                        />
                      </span>
                      {feature.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/features"
              onClick={onNavigate}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Explore All Features
              <ArrowUpRight className="size-4" />
            </Link>
          </section>
        ) : null}
      </div>
    );
  }

  if (openHref === "/resources") {
    return <BlogMegaPanel onNavigate={onNavigate} />;
  }

  if (openHref === "/solutions") {
    return (
      <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="pettroz-mega-item flex h-full flex-col" style={{ animationDelay: "40ms" }}>
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase"
          >
            <Building2 className="size-3.5" aria-hidden="true" />
            Petrol pump businesses
          </Link>
          <ul className="mt-4 flex flex-1 flex-col justify-between">
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
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-navy transition-all duration-200 hover:bg-navy/[0.04] hover:text-primary"
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
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

const MEGA_COLLAPSE_MS = 320;

export function DesktopNav({ activeHref }: { activeHref: string }) {
  const track = useRef<HTMLUListElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const [megaHref, setMegaHref] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaHost, setMegaHost] = useState<HTMLElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const highlightedHref = focused ?? hovered ?? activeHref;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMegaHost(document.getElementById("pettroz-header-mega"));
  }, []);

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

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function clearCollapseTimer() {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
  }

  function openMega(href: string) {
    clearCloseTimer();
    clearCollapseTimer();
    setMegaHref(href);
    requestAnimationFrame(() => setMegaOpen(true));
  }

  function closeMegaNow() {
    clearCloseTimer();
    clearCollapseTimer();
    setMegaOpen(false);
    collapseTimer.current = setTimeout(() => {
      setMegaHref(null);
      collapseTimer.current = null;
    }, MEGA_COLLAPSE_MS);
  }

  function scheduleCloseMega() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      closeMegaNow();
    }, 140);
  }

  function navigate() {
    closeMegaNow();
    setHovered(null);
    setFocused(null);
  }

  const itemClass =
    "inline-flex min-h-11 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full px-4 text-[13px] font-medium";

  const megaPanel =
    megaHref && megaHost
      ? createPortal(
          <div
            className="pettroz-mega-shell hidden xl:grid"
            data-open={megaOpen ? "true" : "false"}
            onPointerEnter={clearCloseTimer}
            onPointerLeave={scheduleCloseMega}
          >
            <div className="pettroz-mega-clip">
              <div className="pettroz-mega mx-[max(1.25rem,4vw)] overflow-hidden rounded-b-[16px] border border-navy/10 border-t-0 bg-white shadow-[0_24px_48px_-28px_#1a1c2948]">
                <div className="site-container py-8">
                  <MegaPanel openHref={megaHref} onNavigate={navigate} />
                  {megaHref !== "/features" ? (
                    <div
                      className="pettroz-mega-item mt-6 flex justify-end"
                      style={{ animationDelay: "220ms" }}
                    >
                      <Link
                        href={megaHref}
                        onClick={navigate}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-all hover:gap-3 hover:text-primary"
                      >
                        View all{" "}
                        {mainNavItems.find((item) => item.href === megaHref)?.label.toLowerCase()}
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>,
          megaHost,
        )
      : null;

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
            closeMegaNow();
          }
        }}
      >
        <div
          className="pettroz-pill-surface relative rounded-full p-1"
          onPointerEnter={() => {
            clearCloseTimer();
            if (megaHref) {
              clearCollapseTimer();
              setMegaOpen(true);
            }
          }}
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
                    else closeMegaNow();
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
                    aria-expanded={item.mega ? megaOpen && megaHref === item.href : undefined}
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
                          megaOpen && megaHref === item.href && "rotate-180",
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

      {megaPanel}
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
