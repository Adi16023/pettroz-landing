"use client";

import { useState } from "react";
import { ArrowUpRight, Fuel, Users } from "lucide-react";
import Link from "next/link";
import { WorkflowPlayer } from "@/components/workflow-player";
import { cn } from "@/lib/utils";

const workflows = {
  pump: {
    title: "Sales, stock and daily closing.",
    intro: "Record fuel sales, track tank stock and reconcile collections at the end of each shift.",
    href: "/products/petrol-pump-management",
    steps: [
      { title: "Record the sale", text: "Capture fuel sales and payment details." },
      { title: "Track the stock", text: "Keep tank-wise fuel movements together." },
      { title: "Reconcile the shift", text: "Review collections and any differences." },
      { title: "See the full picture", text: "Bring daily totals into a clear report." },
    ],
  },
  attendance: {
    title: "Attendance through to payroll.",
    intro: "Review check-ins, approve hours and leave, then calculate salaries using your payroll settings.",
    href: "/products/attendance-payroll",
    steps: [
      { title: "Capture check-ins", text: "Record attendance with configured verification." },
      { title: "Review attendance", text: "Keep shifts, leave and hours in one place." },
      { title: "Approve the details", text: "Review corrections and eligible overtime." },
      { title: "Prepare payroll", text: "Calculate salaries, review and generate payslips." },
    ],
  },
};

export function WorkflowSection({ initialProduct = "pump", fixed = false }: { initialProduct?: "pump" | "attendance"; fixed?: boolean }) {
  const [product, setProduct] = useState(initialProduct);
  const workflow = workflows[product];
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-navy text-white">
      <div className="site-container relative py-20 lg:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">How it works</h2>
          </div>
          {!fixed && <div role="group" aria-label="Choose a workflow" className="flex shrink-0 self-start rounded-full border border-white/15 p-1 md:self-auto">
            {[{ id: "pump" as const, label: "Fuel operations", Icon: Fuel }, { id: "attendance" as const, label: "Your workforce", Icon: Users }].map(({ id, label, Icon }) => <button key={id} type="button" aria-pressed={product === id} aria-controls="workflow-details" onClick={() => setProduct(id)} className={cn("flex min-h-11 items-center gap-2 rounded-full px-3 text-[11px] font-medium transition-colors sm:px-4", product === id ? "bg-white text-navy" : "text-white/60 hover:text-white")}><Icon className="size-3.5" />{label}</button>)}
          </div>}
        </div>
        <div id="workflow-details" className="mt-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="flex flex-col items-start justify-center">
            <h3 className="max-w-sm text-2xl leading-snug font-medium tracking-tight">{workflow.title}</h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">{workflow.intro}</p>
            <Link href={workflow.href} className="mt-6 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-white underline decoration-white/25 underline-offset-8 transition-colors hover:text-[#f29180]">Explore this product <ArrowUpRight className="size-4" /></Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-6">
            <WorkflowPlayer key={product} product={product} />
            <ol className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-4 sm:gap-4">
              {workflow.steps.map((step, i) => <li key={step.title}><span className="text-[10px] font-semibold text-[#f29180]">0{i + 1}</span><h4 className="mt-2 text-xs font-semibold">{step.title}</h4><p className="mt-2 text-[11px] leading-relaxed text-white/55">{step.text}</p></li>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
