"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Droplets, FileCheck, Fuel } from "lucide-react";
import { PumpPreview } from "@/components/product-preview";

const workflows = [
  {
    id: "Sales",
    label: "Sales & billing",
    Icon: Fuel,
    title: "From the first sale to the last receipt.",
    description: "Keep fuel and shop sales together. See what sold, how customers paid and which shift handled it, without piecing together separate registers.",
    points: ["Cash, UPI, card and credit payments", "Fuel-wise and shift-wise sales records", "Thermal, A4 and digitally shared invoices"],
    links: [{ slug: "fuel-sales-billing", label: "Sales & billing" }, { slug: "lubricants-products", label: "Shop inventory" }],
  },
  {
    id: "Dip",
    label: "Tanks & stock",
    Icon: Droplets,
    title: "Know what’s in every tank.",
    description: "Follow fuel from supplier delivery to the nozzle. Compare physical readings with system stock and investigate differences before the next shift takes over.",
    points: ["Tank levels, dip readings and movement history", "Supplier purchases and tank allocation", "Stock variation in litres and rupees"],
    links: [{ slug: "tank-fuel-stock", label: "Tank stock" }, { slug: "fuel-purchases", label: "Purchases" }, { slug: "stock-variation", label: "Stock variation" }],
  },
  {
    id: "DSR",
    label: "Daily closing",
    Icon: FileCheck,
    title: "Close the day with everything accounted for.",
    description: "Bring sales, collections and expenses into one daily report. Check the payment breakdown, reconcile cash and lock the DSR when the day is counted.",
    points: ["Shift-wise summaries and cash reconciliation", "Collection breakdowns and shortage/excess alerts", "Printable reports and Excel/PDF exports"],
    links: [{ slug: "dsr-daily-closing", label: "Daily closing" }, { slug: "reports-analytics", label: "Reports & exports" }],
  },
] as const;

export function PumpCapabilities() {
  const [workflow, setWorkflow] = useState<(typeof workflows)[number]>(workflows[0]);

  return (
    <div className="mt-10 sm:mt-14">
      <div role="group" aria-label="Explore station workflows" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-navy/15 sm:gap-x-10">
        {workflows.map((item) => (
          <button key={item.id} type="button" aria-pressed={workflow.id === item.id} aria-controls="pump-workflow-detail" onClick={() => setWorkflow(item)} className={`flex min-h-14 items-center gap-2.5 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${workflow.id === item.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-navy"}`}>
            <item.Icon aria-hidden="true" className="size-4" />{item.label}
          </button>
        ))}
      </div>
      <div id="pump-workflow-detail" className="grid items-center gap-10 pt-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-[5vw]">
        <div>
          <h3 className="max-w-lg text-3xl leading-tight font-semibold tracking-[-0.04em] text-navy sm:text-4xl">{workflow.title}</h3>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">{workflow.description}</p>
          <ul className="mt-7 space-y-4">
            {workflow.points.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-6 text-navy"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />{point}</li>)}
          </ul>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-1">
            {workflow.links.map(({ slug, label }) => <Link key={slug} href={`/features/${slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy hover:text-primary">{label}<ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>)}
          </div>
        </div>
        <div className="min-w-0 rounded-3xl bg-[#f0e9e1] p-3 sm:p-5 lg:p-7">
          <PumpPreview screen={workflow.id} />
        </div>
      </div>
    </div>
  );
}
