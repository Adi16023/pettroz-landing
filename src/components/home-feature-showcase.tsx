"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  Bell,
  CalendarDays,
  CarFront,
  ChartNoAxesCombined,
  Clock3,
  Contact,
  CreditCard,
  Fuel,
  GitCompareArrows,
  HandCoins,
  LayoutDashboard,
  Map,
  MapPin,
  MessageCircle,
  PieChart,
  Receipt,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LaptopMockup } from "@/components/laptop-mockup";
import type { DemoScreen } from "@/components/product-demo-screens";
import { AttendancePreview, PumpPreview } from "@/components/product-preview";
import { cn } from "@/lib/utils";

type HomeSectionItem = {
  title: string;
  text: string;
};

type HomeSection = {
  id: string;
  title: string;
  heading: string;
  description: string;
  href: string;
  link: string;
  items: HomeSectionItem[];
};

const sectionIcons: Record<string, LucideIcon[]> = {
  automation: [ScanLine, CreditCard, MessageCircle, Bell, ChartNoAxesCombined],
  "financial-control": [TrendingUp, PieChart, Banknote, CreditCard, HandCoins, Receipt],
  "staff-management": [MapPin, CalendarDays, ShieldCheck, Users, Wallet, ChartNoAxesCombined],
  "customer-management": [Contact, CreditCard, CarFront, ShoppingBag, Bell, Wrench, MessageCircle],
  "reports-analytics": [ChartNoAxesCombined, Fuel, Clock3, Truck, CreditCard, GitCompareArrows],
  "multi-outlet-management": [MapPin, Map, LayoutDashboard, Wallet, Users, ChartNoAxesCombined, GitCompareArrows],
};

const sectionAppPreview: Record<string, { product: "pump" | "attendance"; screen?: DemoScreen }> = {
  automation: { product: "pump", screen: "Dip" },
  "financial-control": { product: "pump", screen: "Sales" },
  "staff-management": { product: "attendance" },
  "customer-management": { product: "pump", screen: "Credit customers" },
  "reports-analytics": { product: "pump", screen: "DSR" },
  "multi-outlet-management": { product: "pump" },
};

/** Spans only from md — bare col-span-2 on a 1-col mobile grid creates a broken implicit column. */
const bentoSpans: Record<string, string[]> = {
  automation: ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1"],
  "financial-control": ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-2"],
  "staff-management": ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-2"],
  "customer-management": ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1"],
  "reports-analytics": ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-2"],
  "multi-outlet-management": ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1", "md:col-span-1"],
};

const sectionLayouts: Record<string, "laptop-left" | "laptop-right"> = {
  automation: "laptop-right",
  "financial-control": "laptop-left",
  "staff-management": "laptop-right",
  "customer-management": "laptop-left",
  "reports-analytics": "laptop-right",
  "multi-outlet-management": "laptop-left",
};

function SectionPreview({ sectionId }: { sectionId: string }) {
  const preview = sectionAppPreview[sectionId] ?? sectionAppPreview.automation;

  return (
    <LaptopMockup>
      {preview.product === "attendance" ? (
        <AttendancePreview animated screen={preview.screen} />
      ) : (
        <PumpPreview animated screen={preview.screen} />
      )}
    </LaptopMockup>
  );
}

function FeatureCard({
  title,
  text,
  Icon,
  featured = false,
  tinted = false,
}: {
  title: string;
  text: string;
  Icon: LucideIcon;
  featured?: boolean;
  tinted?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-auto flex-col justify-center p-4 sm:p-4 md:h-full md:p-3.5 lg:p-4",
        tinted ? "bg-white" : "bg-[#f4f3ef]",
      )}
    >
      <span
        className={cn(
          "mb-2.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary md:mb-2 md:size-8",
          featured && "lg:size-9",
        )}
      >
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
      </span>
      <h3 className="shrink-0 text-base font-semibold tracking-tight text-navy md:text-sm lg:text-[0.95rem]">
        {title}
      </h3>
      <p className="mt-1.5 shrink-0 text-sm leading-6 text-muted-foreground md:text-xs md:leading-5">
        {text}
      </p>
    </article>
  );
}

function BentoGrid({ section, tinted }: { section: HomeSection; tinted: boolean }) {
  const icons = sectionIcons[section.id] ?? [];
  const spans = bentoSpans[section.id] ?? [];

  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-navy/10 md:h-full md:grid-cols-2 md:auto-rows-fr">
      {section.items.map((item, index) => {
        const Icon = icons[index] ?? Fuel;
        return (
          <li key={item.title} className={cn("min-w-0", spans[index])}>
            <FeatureCard title={item.title} text={item.text} Icon={Icon} featured={index === 0} tinted={tinted} />
          </li>
        );
      })}
    </ul>
  );
}

export function HomeFeatureShowcase({
  section,
  tinted = false,
}: {
  section: HomeSection;
  tinted?: boolean;
}) {
  const layout = sectionLayouts[section.id] ?? "laptop-right";
  const previewRef = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<number | null>(null);
  const [isSideBySide, setIsSideBySide] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsSideBySide(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const update = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setRowHeight(null);
        return;
      }
      const mac = preview.querySelector<HTMLElement>(".macbook");
      if (!mac) return;
      const height = Math.round(mac.getBoundingClientRect().height);
      if (!height) return;
      const target = Math.round(height * 1.06);
      setRowHeight((prev) => (prev === target ? prev : target));
    };

    update();
    const frame = window.requestAnimationFrame(update);
    const observer = new ResizeObserver(update);
    observer.observe(preview);
    const mac = preview.querySelector(".macbook");
    if (mac) observer.observe(mac);
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [section.id]);

  const preview = (
    <div ref={previewRef} className="w-full min-w-0">
      <SectionPreview sectionId={section.id} />
    </div>
  );

  const bento = (
    <div
      className="w-full min-w-0"
      style={isSideBySide && rowHeight ? { height: rowHeight } : undefined}
    >
      <BentoGrid section={section} tinted={tinted} />
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <h2 className="section-title mt-0">{section.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-4">
            {section.description}
          </p>
        </div>
        <Link
          href={section.href}
          className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-navy transition-colors hover:text-primary"
        >
          {section.link}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div
        className={cn(
          "mt-8 grid grid-cols-1 items-start sm:mt-9 lg:mt-10 lg:items-center",
          "gap-8 sm:gap-9 lg:gap-12 xl:gap-16",
          // Stack until lg — md side-by-side was too tight for card copy
          layout === "laptop-left"
            ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
            : "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
        )}
      >
        {layout === "laptop-left" ? (
          <>
            <div className="min-w-0">{preview}</div>
            <div className="min-w-0">{bento}</div>
          </>
        ) : (
          <>
            <div className="order-2 min-w-0 lg:order-1">{bento}</div>
            <div className="order-1 min-w-0 lg:order-2">{preview}</div>
          </>
        )}
      </div>
    </div>
  );
}
