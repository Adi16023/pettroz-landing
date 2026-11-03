"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Presentation extracted from Petroz's DeskCard, MetricCard, KpiCard and desk-charts.
export function DeskCard({ title, hint, aside, className, children, previewTarget }: {
  title?: string;
  hint?: string;
  aside?: ReactNode;
  className?: string;
  children?: ReactNode;
  previewTarget?: string;
}) {
  return (
    <div data-preview-target={previewTarget} className={cn("desk-surface p-5", className)}>
      {title || hint || aside ? (
        <div className={cn("flex flex-wrap items-start justify-between gap-3", children && "mb-5")}>
          <div className="min-w-0">
            {title && <p className="text-lg tracking-tight">{title}</p>}
            {hint && <p className={cn("text-sm text-muted-foreground", title && "mt-0.5")}>{hint}</p>}
          </div>
          {aside}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function MetricCard({ label, value, icon: Icon, wash, iconWash }: {
  label: string;
  value: string;
  icon: LucideIcon;
  wash: string;
  iconWash: string;
}) {
  return (
    <div className={cn("min-w-0 overflow-hidden rounded-2xl border px-5 py-5", wash)}>
      <span className={cn("inline-flex size-11 items-center justify-center rounded-full", iconWash)}>
        <Icon className="size-5" />
      </span>
      <p className="mt-4 min-w-0 text-sm text-pretty text-muted-foreground">{label}</p>
      <p className="meter mt-1 text-[24px] leading-tight tracking-tight">{value}</p>
    </div>
  );
}

export function KpiCard({ label, value, hint, wash }: {
  label: string;
  value: string;
  hint: string;
  wash?: string;
}) {
  return (
    <div className={cn("desk-surface min-w-0 overflow-hidden p-4", wash)}>
      <p className="min-w-0 text-sm text-pretty text-muted-foreground">{label}</p>
      <p className="meter mt-3 text-[24px] leading-tight tracking-tight">{value}</p>
      <div className="mt-2 flex min-h-6 flex-wrap items-center gap-2">
        <p className="truncate text-[13px] text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}

export function Stamp({ children, tone = "ok" }: { children: ReactNode; tone?: "ok" | "warn" }) {
  return <span className={cn("inline-flex h-6 items-center rounded-full px-2.5 text-[12px] font-medium", tone === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800")}>{children}</span>;
}

export function HorizontalBars({ items }: { items: { label: string; value: number; display: string; color: string }[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span>{item.label}</span>
            <span className="meter shrink-0 text-muted-foreground">{item.display}</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full" style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Donut({ slices, centerValue }: {
  slices: { label: string; value: number; color: string }[];
  centerValue: string;
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let cursor = 0;
  const stops: string[] = [];
  for (const slice of slices) {
    const start = cursor;
    cursor += slice.value / total * 100;
    stops.push(`${slice.color} ${start}% ${cursor}%`);
  }
  return (
    <div className="flex items-center gap-5">
      <div className="relative size-40 shrink-0">
        <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${stops.join(", ")})` }} />
        <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-card text-center shadow-[inset_0_0_0_1px_rgba(51,51,51,0.04)]">
          <p className="meter text-lg leading-none">{centerValue}</p>
          <p className="mt-1 text-[12px] text-muted-foreground">Staff</p>
        </div>
      </div>
      <ul className="w-full space-y-2.5 text-sm">
        {slices.map((slice) => <li key={slice.label} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2"><span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />{slice.label}</span><span className="meter text-muted-foreground">{slice.value}</span></li>)}
      </ul>
    </div>
  );
}

const TANK_OUTLINE =
  "M963.06,397.9h-252.77v-32.82c0-22.36-18.19-40.55-40.55-40.55h-139.5c-22.36,0-40.55,18.19-40.55,40.55v32.82H226.31c-97.73,0-177.25,79.51-177.25,177.25v47.37c0,97.73,79.51,177.25,177.25,177.25h26.37v32.11c0,2.85,2.31,5.17,5.17,5.17h56.15c2.85,0,5.17-2.31,5.17-5.17v-32.11h561.66v32.11c0,2.85,2.31,5.17,5.17,5.17h56.15c2.85,0,5.17-2.31,5.17-5.17v-32.11h15.75c103.59,0,187.87-84.28,187.87-187.87v-26.12c0-103.59-84.28-187.87-187.87-187.87ZM500.03,365.08c0-16.66,13.55-30.21,30.21-30.21h139.5c16.66,0,30.21,13.55,30.21,30.21v32.82h-199.92v-32.82ZM59.4,622.52v-47.37c0-90.74,72.8-164.75,163.05-166.81-21.65,126.42-21.77,254.54-.39,380.99-90.08-2.27-162.67-76.19-162.67-166.8ZM308.84,826.7h-45.82v-26.94h45.82v26.94ZM936.98,826.7h-45.82v-26.94h45.82v26.94ZM963.06,789.43H229.93c-21.56-126.5-21.44-254.71.38-381.19h732.75c2.23,0,4.44.09,6.65.17,21.79,126.37,21.9,254.46.39,380.84-2.34.09-4.67.18-7.03.18ZM1140.6,611.89c0,92.85-71.66,169.23-162.57,176.86,21.26-126.07,21.14-253.81-.39-379.87,91.1,7.44,162.96,83.91,162.96,176.89v26.12Z";
const TANK_CAVITY =
  "M59.4,622.52v-47.37c0-90.74,72.8-164.75,163.05-166.81-21.65,126.42-21.77,254.54-.39,380.99-90.08-2.27-162.67-76.19-162.67-166.8ZM963.06,789.43H229.93c-21.56-126.5-21.44-254.71.38-381.19h732.75c2.23,0,4.44.09,6.65.17,21.79,126.37,21.9,254.46.39,380.84-2.34.09-4.67.18-7.03.18ZM1140.6,611.89c0,92.85-71.66,169.23-162.57,176.86,21.26-126.07,21.14-253.81-.39-379.87,91.1,7.44,162.96,83.91,162.96,176.89v26.12Z";

function wavePath(surface: number, amplitude: number, band = false) {
  let path = "";
  for (let i = 0; i <= 48; i++) {
    const x = 45 + 2210 * i / 48;
    const y = surface + Math.sin((x - 45) / 1105 * Math.PI * 2) * amplitude;
    path += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  if (band) {
    for (let i = 48; i >= 0; i--) {
      const x = 45 + 2210 * i / 48;
      const y = surface + Math.max(12, amplitude * 0.65) + Math.sin((x - 45) / 1105 * Math.PI * 2) * amplitude;
      path += `L${x.toFixed(1)},${y.toFixed(1)}`;
    }
    return `${path}Z`;
  }
  return `${path}L2255,789.43L45,789.43Z`;
}

export function TankGauges({ tanks }: { tanks: { label: string; live: number; capacity: number; color: string }[] }) {
  const uid = useId();
  const container = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let inView = false;
    function syncPlayback() {
      element?.style.setProperty("--tank-play-state", inView && !document.hidden ? "running" : "paused");
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    observer.observe(element);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);
  return (
    <ul ref={container} className="flex flex-wrap justify-evenly gap-6">
      {tanks.map((tank, index) => {
        const pct = Math.min(1, Math.max(0, tank.live / tank.capacity));
        const liquid = 381.19 * pct;
        const surface = 789.43 - liquid;
        const amplitude = Math.min(46, liquid * 0.2);
        const clipId = `${uid}-tank-${index}`;
        return (
          <li key={tank.label} className="flex flex-col items-center text-center">
            <p className="text-sm">{tank.label}</p>
            <svg viewBox="45 318 1105 520" className="mt-3 h-24 w-44">
              <defs><clipPath id={clipId}><path d={TANK_CAVITY} /></clipPath></defs>
              <g clipPath={`url(#${clipId})`}>
                <rect x="45" y="318" width="1105" height="520" fill="var(--muted)" />
                {liquid > 0 && <g className="preview-tank-fill" style={{ animationDelay: `${index * 100}ms` }}>
                  <rect x="45" y={surface} width="1105" height={liquid} fill={tank.color} />
                  <g className="preview-tank-wave" style={{ animationDelay: `${-index * 700}ms` }}>
                    <path d={wavePath(surface, amplitude)} fill={tank.color} />
                    <path d={wavePath(surface, amplitude * 0.72, true)} fill="#ffffff" fillOpacity={0.34} />
                  </g>
                </g>}
              </g>
              <path d={TANK_OUTLINE} fill="var(--foreground)" />
            </svg>
            <p className="meter mt-2 text-sm">{Math.round(pct * 100)}%</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">{tank.live.toFixed(2)} / {tank.capacity.toFixed(2)} KL</p>
          </li>
        );
      })}
    </ul>
  );
}
