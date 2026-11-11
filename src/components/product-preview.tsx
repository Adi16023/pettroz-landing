"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Banknote, Bell, BookOpen, CalendarCheck, CheckCircle2, ChevronDown, Clock, Coins, ContactRound, Droplets, FileSpreadsheet, FileText, Fuel, Gauge, LayoutDashboard, LifeBuoy, MousePointer2, Package, PanelLeftClose, ReceiptText, Settings, ShoppingBag, Sun, Timer, TreePalm, TrendingUp, UserCheck, Users, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DeskCard, Donut, HorizontalBars, KpiCard, MetricCard, Stamp, TankGauges } from "@/components/product-ui";
import { ProductDemoScreen, type DemoScreen } from "@/components/product-demo-screens";
import { cn } from "@/lib/utils";

export function PumpPreview({ animated = false, screen }: { animated?: boolean; screen?: DemoScreen }) {
  return <ProductPreview product="pump" animated={animated} previewScreen={screen} />;
}

export function AttendancePreview({ animated = false, screen }: { animated?: boolean; screen?: DemoScreen }) {
  return <ProductPreview product="attendance" animated={animated} previewScreen={screen} />;
}

type PreviewStep = { target: string | null; label: string; duration: number; click?: boolean; screen?: DemoScreen; actionComplete?: boolean };

const pumpSteps: PreviewStep[] = [
  { target: null, label: "Daily overview", duration: 1200 },
  { target: "rate", label: "Update the petrol rate", duration: 1200, click: true },
  { target: "rate", label: "Update the petrol rate", duration: 450 },
  { target: "rate", label: "Update the petrol rate", duration: 450 },
  { target: "save", label: "Save the new rate", duration: 1200, click: true },
  { target: "save", label: "Fuel rate saved", duration: 1600 },
  { target: "nav-Sales", label: "Open sales", duration: 1200, click: true },
  { screen: "Sales", target: null, label: "Review sales", duration: 2200 },
  { screen: "Sales", target: "sales-records", label: "Open sales records", duration: 1200, click: true },
  { screen: "Sales", target: "sales-list", label: "Review sales records", duration: 2400, actionComplete: true },
  { screen: "Sales", target: "nav-Dip", label: "Open tank stock", duration: 1200, click: true, actionComplete: true },
  { screen: "Dip", target: "stock-tanks", label: "Review physical stock", duration: 3200 },
  { screen: "Dip", target: "nav-DSR", label: "Open daily closing", duration: 1200, click: true },
  { screen: "DSR", target: "closing-summary", label: "Reconcile collections", duration: 2200 },
  { screen: "DSR", target: "lock-dsr", label: "Lock the daily report", duration: 1200, click: true },
  { screen: "DSR", target: "lock-dsr", label: "Daily report locked", duration: 2200, actionComplete: true },
  { screen: "DSR", target: "nav-Dashboard", label: "Back to dashboard", duration: 1200, click: true, actionComplete: true },
  { target: null, label: "Daily overview", duration: 1800 },
];

const creditSteps: PreviewStep[] = [
  { screen: "Credit customers", target: null, label: "Review credit customers", duration: 2200 },
  { screen: "Credit customers", target: "credit-list", label: "Scan outstanding balances", duration: 2800 },
  { screen: "Credit customers", target: "credit-add", label: "Add a credit customer", duration: 1600, click: true },
  { screen: "Credit customers", target: "credit-list", label: "Back to customer list", duration: 2200 },
];

function scopedSteps(product: "pump" | "attendance", screen?: DemoScreen): PreviewStep[] {
  if (screen === "Credit customers") return creditSteps;
  const all = product === "pump" ? pumpSteps : attendanceSteps;
  if (!screen) {
    // Pump dashboard loop for multi-outlet; full attendance journey for staff sections.
    return product === "pump"
      ? all.filter((step) => !step.screen || step.label === "Daily overview")
      : all;
  }
  const matched = all.filter((step) => step.screen === screen);
  if (!matched.length) return [{ screen, target: null, label: screen, duration: 4000 }];
  return [
    { screen, target: null, label: screen, duration: 1600 },
    ...matched.filter((step) => step.target !== null),
    { screen, target: null, label: screen, duration: 2000 },
  ];
}

const attendanceSteps: PreviewStep[] = [
  { target: null, label: "Team overview", duration: 1200 },
  { target: "today", label: "Review today's attendance", duration: 2400 },
  { target: "punches", label: "An employee checks in", duration: 2000 },
  { target: "recent", label: "See the new check-in", duration: 2600 },
  { target: "nav-Attendance", label: "Open attendance records", duration: 1200, click: true },
  { screen: "Attendance", target: "attendance-list", label: "Review attendance records", duration: 2600 },
  { screen: "Attendance", target: "nav-Shifts & Rosters", label: "Open shifts", duration: 1200, click: true },
  { screen: "Shifts & Rosters", target: "shift-list", label: "Review shift assignments", duration: 2600 },
  { screen: "Shifts & Rosters", target: "nav-Leave", label: "Open leave", duration: 1200, click: true },
  { screen: "Leave", target: "leave-list", label: "Review leave requests", duration: 2600 },
  { screen: "Leave", target: "nav-Payroll", label: "Open payroll", duration: 1200, click: true },
  { screen: "Payroll", target: "payroll-list", label: "Review salaries", duration: 2200 },
  { screen: "Payroll", target: "process-payroll", label: "Process payroll", duration: 1200, click: true },
  { screen: "Payroll", target: "payroll-list", label: "Payroll sent", duration: 2200, actionComplete: true },
  { screen: "Payroll", target: "nav-Overview", label: "Back to overview", duration: 1200, click: true, actionComplete: true },
  { target: null, label: "Team overview", duration: 1800 },
];

function usePreviewPlayback(animated: boolean, steps: PreviewStep[]) {
  const frame = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const element = frame.current;
    if (!element || !animated) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    function syncPlayback() {
      setReducedMotion(media.matches);
      setVisible(inView && !document.hidden);
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.25 });
    observer.observe(element);
    media.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [animated]);

  const playing = animated && visible && !reducedMotion;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % steps.length), steps[step].duration);
    return () => window.clearTimeout(timer);
  }, [playing, step, steps]);

  return { frame, step: animated && !reducedMotion ? step : 0, playing, reducedMotion };
}

const fuelNav: { label: string; items: { label: string; Icon: LucideIcon }[] }[] = [
  { label: "Today", items: [{ label: "Dashboard", Icon: LayoutDashboard }, { label: "DSR", Icon: FileSpreadsheet }, { label: "Shifts", Icon: Timer }] },
  { label: "Fuel", items: [{ label: "Sales", Icon: Fuel }, { label: "Billing", Icon: ReceiptText }, { label: "Dip", Icon: Gauge }, { label: "Stock variation", Icon: Droplets }] },
  { label: "Shop", items: [{ label: "Lube / Products", Icon: Package }] },
  { label: "Credit", items: [{ label: "Credit customers", Icon: BookOpen }] },
  { label: "People", items: [{ label: "Staff", Icon: Users }, { label: "Attendance", Icon: UserCheck }, { label: "Contacts", Icon: ContactRound }] },
  { label: "Money", items: [{ label: "Cash", Icon: Coins }, { label: "Banking", Icon: Banknote }, { label: "Expenses", Icon: Wallet }] },
];
const attendanceNav = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Attendance", Icon: CalendarCheck },
  { label: "Employees", Icon: Users },
  { label: "Shifts & Rosters", Icon: Clock },
  { label: "Leave", Icon: TreePalm },
  { label: "Payroll", Icon: Wallet },
  { label: "Reports", Icon: FileText },
  { label: "Settings", Icon: Settings },
];

function ProductPreview({ product, animated, previewScreen }: { product: "pump" | "attendance"; animated: boolean; previewScreen?: DemoScreen }) {
  const pump = product === "pump";
  const steps = useMemo(
    () => (animated ? scopedSteps(product, previewScreen) : pump ? pumpSteps : attendanceSteps),
    [animated, product, previewScreen, pump],
  );
  const { frame, step, playing, reducedMotion } = usePreviewPlayback(animated, steps);
  const cursor = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const scene: PreviewStep = animated
    ? steps[step] ?? steps[0]!
    : previewScreen
      ? { screen: previewScreen, target: null, label: previewScreen, duration: 0 }
      : steps[0]!;
  const activeScreen = scene.screen ?? (pump ? "Dashboard" : "Overview");
  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const resize = () => setScale(element.clientWidth / 1600);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [frame]);

  useLayoutEffect(() => {
    const element = frame.current;
    const pointer = cursor.current;
    if (!element || !pointer || !scale || !scene.target) return;
    const target = element.querySelector<HTMLElement>(`[data-preview-target="${scene.target}"]`);
    if (!target) return;
    const bounds = element.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    pointer.style.transform = `translate(${(rect.left - bounds.left + rect.width * 0.65) / scale}px, ${(rect.top - bounds.top + rect.height * 0.5) / scale}px)`;
  }, [frame, scale, scene.target, activeScreen, scene.actionComplete]);

  return (
    <figure className="dashboard-shadow overflow-hidden rounded-2xl border border-navy/10 bg-[#1a1c29]" data-preview-product={product} data-preview-step={step} data-preview-screen={activeScreen}>
      <div ref={frame} className="relative aspect-[1600/1050] overflow-hidden" role="img" aria-label={`Petroz ${pump ? "petrol pump" : "attendance"} app walkthrough. ${activeScreen}: ${scene.label}. Simulated actions with demo data.`}>
        <div aria-hidden="true" className="petroz-product-ui absolute top-0 left-0 flex h-[1050px] w-[1600px] origin-top-left overflow-hidden bg-[#1a1c29]" style={{ transform: `scale(${scale ?? 0})`, visibility: scale === null ? "hidden" : "visible" }}>
          <aside className="flex h-full w-60 shrink-0 flex-col overflow-hidden text-[#f3f3f3]">
            <div className="flex h-16 shrink-0 items-center gap-1 px-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pettroz-fw.svg" alt="" className="h-7 w-auto max-w-[9.5rem]" />
              <PanelLeftClose className="ml-auto size-4 text-white/70" />
            </div>
            <div className="flex-1 space-y-3 overflow-hidden px-3 py-3">
              {pump ? fuelNav.map((group) => (
                <div key={group.label}>
                  <p className="mb-0.5 flex items-center justify-between px-3 py-1 text-[11px] tracking-[0.16em] text-white/40 uppercase">{group.label}<ChevronDown className="size-3.5" /></p>
                  {group.items.map(({ label, Icon }) => <div key={label} data-preview-target={`nav-${label}`} data-preview-active={label === activeScreen} className={cn("mt-0.5 flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium tracking-tight", label === activeScreen ? "bg-primary text-white shadow-[0_8px_18px_rgba(230,52,37,0.35)]" : "text-white/65")}><Icon className="size-4 shrink-0" />{label}</div>)}
                </div>
              )) : (
                <div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-primary px-3 py-2 text-sm font-medium shadow-[0_8px_18px_rgba(230,52,37,0.35)]"><UserCheck className="size-4" />Attendance</div>
                  <div className="relative mt-2 ml-6 border-l border-white/30 pl-4">
                    {attendanceNav.map(({ label, Icon }) => <div key={label} data-preview-target={`nav-${label}`} data-preview-active={label === activeScreen} className={cn("relative flex h-10 items-center gap-2.5 text-[15px]", label === activeScreen ? "text-primary" : "text-[#f3f3f3]")}><span className="absolute top-1/2 -left-4 w-3 border-t border-white/30" /><Icon className="size-4" />{label}</div>)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2.5 px-6 py-5 text-sm text-white/65"><LifeBuoy className="size-4" />Support</div>
          </aside>
          <div className="flex min-w-0 flex-1 px-4 pt-4">
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-t-[1.75rem] bg-[#f7f5f2]">
              <div className="flex h-16 shrink-0 items-center gap-4 border-b border-black/5 px-6">
                {pump ? <div className="flex items-center gap-2 text-sm font-medium">Demo outlet <span className="ml-2 font-normal text-muted-foreground">Chennai</span><ChevronDown className="size-3.5" /><span className="mx-1 h-4 w-px bg-foreground/20" /><span className="text-xs">Morning</span><Stamp>Open</Stamp></div> : <p className="text-sm font-medium">Demo team</p>}
                <p className="ml-auto flex items-center gap-2 text-sm tabular-nums"><span>09:41:00</span><span className="text-xs text-muted-foreground">IST</span><span className="text-muted-foreground">03 Nov 2026</span></p>
                <Bell className="size-5" />
                <div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-white">DP</span><span><span className="block text-sm leading-tight font-semibold">Demo user</span><span className="block text-[13px] text-muted-foreground">{pump ? "Owner" : "HR Manager"}</span></span><ChevronDown className="size-3.5 text-muted-foreground" /></div>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden px-8 py-6">
                <div key={activeScreen} className="preview-screen">
                  {scene.screen ? <ProductDemoScreen screen={scene.screen} actionComplete={scene.actionComplete ?? false} /> : pump ? <PumpDashboard step={step} target={scene.target} /> : <AttendanceDashboard step={step} target={scene.target} />}
                </div>
              </div>
            </div>
          </div>
          {pump && step === 5 && <div className="preview-notification absolute right-6 bottom-6 flex items-center gap-3 rounded-xl border border-border bg-white px-6 py-5 text-sm shadow-xl"><CheckCircle2 className="size-5" />Fuel rates updated.</div>}
          {animated && !reducedMotion && <div ref={cursor} className={cn("preview-cursor", !scene.target && "opacity-0")}>
            {scene.click && <span key={step} className="preview-click" style={{ animationPlayState: playing ? "running" : "paused" }} />}
            <MousePointer2 className="relative size-10 fill-white text-navy drop-shadow-lg" strokeWidth={1.5} />
          </div>}
        </div>
      </div>
      <figcaption className="sr-only">Demo data</figcaption>
    </figure>
  );
}

function PumpDashboard({ step, target }: { step: number; target: string | null }) {
  const petrolRate = step < 2 ? "100.80" : step === 2 ? "101" : step === 3 ? "101.2" : "101.20";
  return (
    <div>
      <p className="mb-6 text-[36.4px] leading-tight tracking-tight">Welcome back, Demo.</p>
      <div className="mb-6 grid grid-cols-6 gap-4">
        <MetricCard label="Total sales" value="₹2,40,850" icon={Fuel} wash="border-emerald-300 bg-[#b7e6cb]" iconWash="bg-emerald-300 text-emerald-800" />
        <MetricCard label="Fuel sales" value="₹2,32,400" icon={Droplets} wash="border-sky-300 bg-[#c5dcff]" iconWash="bg-sky-300 text-sky-800" />
        <MetricCard label="Lube/Product Sales" value="₹8,450" icon={ShoppingBag} wash="border-violet-300 bg-[#d4c6fb]" iconWash="bg-violet-300 text-violet-800" />
        <MetricCard label="Cash collected" value="₹1,58,200" icon={Wallet} wash="border-amber-300 bg-[#ffe0a3]" iconWash="bg-amber-300 text-amber-800" />
        <MetricCard label="Credit sales" value="₹22,450" icon={Users} wash="border-rose-300 bg-[#ffd0d6]" iconWash="bg-rose-300 text-rose-800" />
        <MetricCard label="Net Profit" value="₹12,680" icon={TrendingUp} wash="border-emerald-300 bg-[#b7e6cb]" iconWash="bg-emerald-300 text-emerald-800" />
      </div>
      <div className="mb-6 grid grid-cols-[288px_minmax(0,1fr)] items-start gap-4">
        <DeskCard title="Fuel rates" hint="These are the rates used on shift entry and bills." className={cn("preview-focus", (target === "rate" || target === "save") && "preview-focus-active")}>
          <table className="w-full text-sm"><thead><tr className="border-b border-border text-left"><th className="h-10 font-medium">Fuel</th><th className="font-medium">Rate / litre</th></tr></thead><tbody>{[["Petrol", petrolRate], ["Diesel", "92.39"]].map(([fuel, rate]) => <tr key={fuel} className="border-b border-border"><td className="py-2">{fuel}</td><td className="py-2"><span data-preview-target={fuel === "Petrol" ? "rate" : undefined} className={cn("block rounded border border-border px-3 py-1.5 tabular-nums", target === "rate" && fuel === "Petrol" && "border-primary ring-2 ring-primary/20")}>{rate}<span className={cn("ml-0.5 border-r border-primary", target !== "rate" && "invisible")} /></span></td></tr>)}</tbody></table>
          <div className="mt-3 flex justify-end"><span data-preview-target="save" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">Save rates</span></div>
        </DeskCard>
        <DeskCard title="Fuel left in the tanks" hint="The tanker fills as fuel is left" previewTarget="tanks" className={cn("preview-focus", target === "tanks" && "preview-focus-active")}>
          <TankGauges tanks={[{ label: "Petrol", live: 16.8, capacity: 24, color: "#e63425" }, { label: "Diesel", live: 22.4, capacity: 32, color: "#333333" }, { label: "Power", live: 9.6, capacity: 16, color: "#f59e0b" }]} />
        </DeskCard>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DeskCard title="What we sold" hint="Petrol, diesel, and the shop" previewTarget="sales" className={cn("preview-focus", target === "sales" && "preview-focus-active")}>
          <HorizontalBars items={[{ label: "Petrol", value: 128600, display: "₹1,28,600", color: "#e63425" }, { label: "Diesel", value: 86700, display: "₹86,700", color: "#333333" }, { label: "Power", value: 17100, display: "₹17,100", color: "#f59e0b" }, { label: "Lube / Products", value: 8450, display: "₹8,450", color: "#6366f1" }]} />
        </DeskCard>
        <DeskCard title="Today's schedule" previewTarget="schedule" className={cn("preview-focus", target === "schedule" && "preview-focus-active")} aside={<span className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white">View Calendar</span>}>
          {[{ name: "Morning", hours: "06:00 – 14:00", open: true }, { name: "Evening", hours: "14:00 – 22:00", open: false }].map((shift) => <div key={shift.name} className="flex items-start gap-3 border-b border-border py-3 first:pt-0 last:border-0"><span className="grid size-9 place-items-center rounded-xl bg-amber-100 text-amber-700"><Sun className="size-4" /></span><div><div className="flex items-center gap-2"><p className="text-sm font-medium">{shift.name}</p><Stamp tone={shift.open ? "ok" : "warn"}>{shift.open ? "Open" : "Upcoming"}</Stamp></div><p className="mt-1 text-xs text-muted-foreground">{shift.hours}</p><p className="mt-1 text-xs text-muted-foreground">4 staff · Pumps / nozzles: MS 01, HSD 02</p><p className="mt-1 text-xs text-muted-foreground">Demo cashier (Cashier), Demo operator (Staff)</p></div></div>)}
        </DeskCard>
        <DeskCard title="Weekly sales" hint="Last 7 days, every shift on each day" className="col-span-2">
          <TrendChart money />
        </DeskCard>
      </div>
    </div>
  );
}

function AttendanceDashboard({ step, target }: { step: number; target: string | null }) {
  const checkedIn = step >= 3;
  return (
    <div>
      <p className="mb-6 text-[36.4px] leading-tight tracking-tight">Overview</p>
      <p className="-mt-3 mb-5 text-sm text-muted-foreground">Here&apos;s what&apos;s happening across the organisation today.</p>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <KpiCard label="Staff" value="48" hint="Demo outlet" />
          <KpiCard label="Present today" value={checkedIn ? "45" : "44"} hint={checkedIn ? "93.8% of staff" : "91.7% of staff"} wash="bg-emerald-200!" />
          <KpiCard label="Absent today" value={checkedIn ? "3" : "4"} hint={checkedIn ? "6.3% of staff" : "8.3% of staff"} wash="bg-rose-200!" />
          <KpiCard label="Late today" value="3" hint="Checked in after the shift start" wash="bg-blue-200!" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_18rem] gap-4">
          <DeskCard title="Today" hint="Demo outlet" previewTarget="today" className={cn("preview-focus", target === "today" && "preview-focus-active")}><Donut centerValue="48" slices={[{ label: "Present", value: checkedIn ? 42 : 41, color: "#1f7a4d" }, { label: "Absent", value: checkedIn ? 3 : 4, color: "#b42318" }, { label: "Late", value: 3, color: "#b54708" }]} /></DeskCard>
          <DeskCard title="Today's punches" hint="03 Nov 2026" previewTarget="punches" className={cn("preview-focus", target === "punches" && "preview-focus-active")}>
            <ul className="space-y-3 text-sm">{[["Checked in", checkedIn ? "45 / 48" : "44 / 48"], ["Still open", checkedIn ? "42" : "41"], ["Manual punches", "2"], ["GPS spoof", "0"], ["Outside fence", "0"]].map(([label, value]) => <li key={label} className="flex items-center justify-between gap-3"><span>{label}</span><span className="meter">{value}</span></li>)}</ul>
          </DeskCard>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DeskCard title="By designation" hint="Today" previewTarget="designation" className={cn("preview-focus", target === "designation" && "preview-focus-active")}>
            <table className="w-full text-sm"><thead><tr className="border-b border-border text-left">{["Designation", "Present", "Rate"].map((label) => <th key={label} className="h-10 px-2 font-medium">{label}</th>)}</tr></thead><tbody>{[["Operations", checkedIn ? "25" : "24", checkedIn ? "96.2%" : "92.3%"], ["Sales", "12", "92.3%"], ["Administration", "8", "88.9%"]].map((row) => <tr key={row[0]} className="border-b border-border">{row.map((cell) => <td key={cell} className="p-2">{cell}</td>)}</tr>)}</tbody></table>
          </DeskCard>
          <DeskCard title="Recent punches" previewTarget="recent" className={cn("preview-focus", target === "recent" && "preview-focus-active")}><ul className="space-y-3 text-sm">{checkedIn && <li className="preview-new-punch rounded-md bg-emerald-50 p-2 text-emerald-800">Demo employee 05 checked in at 09:41.</li>}<li>Demo employee 01 checked in at 09:00.</li><li>Demo employee 02 checked in at 09:02.</li><li>Demo employee 03 checked in at 09:04.</li>{!checkedIn && <li>Demo employee 04 checked in at 09:08.</li>}</ul></DeskCard>
        </div>
        <DeskCard title="Attendance trend" hint="Staff with a punch, last 14 days"><TrendChart /></DeskCard>
      </div>
    </div>
  );
}

function TrendChart({ money = false }: { money?: boolean }) {
  const values = [32, 38, 35, 41, 39, 43, 40, 42, 38, 44, 41, 43, 42, 44];
  const points = values.map((value, i) => ({ x: i / (values.length - 1) * 1000, y: 160 - value / 48 * 160 }));
  const line = points.map((point, i) => `${i === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3">
      <div className="flex h-44 flex-col justify-between py-0.5 text-[11px] text-muted-foreground">{[48, 36, 24, 12, 0].map((tick) => <span key={tick} className="meter leading-none">{money ? `₹${tick * 5}K` : tick}</span>)}</div>
      <div className="relative h-44"><svg viewBox="0 0 1000 160" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">{[0, 40, 80, 120, 160].map((y) => <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.08" vectorEffect="non-scaling-stroke" />)}<path d={`${line} L1000,160 L0,160 Z`} fill="var(--primary)" fillOpacity="0.1" /><path d={line} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>{points.map((point, i) => <span key={i} className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-card" style={{ left: `${point.x / 10}%`, top: `${point.y / 1.6}%` }} />)}</div>
      <div /><div className="mt-2 flex justify-between text-[11px] text-muted-foreground"><span>21 Oct</span><span>24 Oct</span><span>27 Oct</span><span>30 Oct</span><span>03 Nov</span></div>
    </div>
  );
}
