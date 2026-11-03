"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type PillNavItem = { label: string; href: string };

export function PillNav({
  items,
  activeHref,
  onNavigate,
}: {
  items: PillNavItem[];
  activeHref: string;
  onNavigate?: () => void;
}) {
  const panelId = useId();
  const root = useRef<HTMLElement>(null);
  const measure = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const highlightedHref = focused ?? hovered ?? activeHref;

  useLayoutEffect(() => {
    const parent = root.current?.parentElement;
    const measurement = measure.current;
    if (!parent || !measurement) return;
    const observer = new ResizeObserver(() => {
      const needsCollapse = measurement.scrollWidth > parent.clientWidth;
      setCollapsed(needsCollapse);
      if (!needsCollapse) setOpen(false);
    });
    observer.observe(parent);
    observer.observe(measurement);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const list = track.current;
    const pill = highlight.current;
    if (!list || !pill) return;
    function update() {
      if (!list || !pill) return;
      const index = items.findIndex((item) => item.href === highlightedHref);
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
  }, [collapsed, highlightedHref, items]);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
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
    setHovered(null);
    setFocused(null);
    onNavigate?.();
  }

  const itemClass = "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-[13px] font-medium";

  return (
    <nav
      ref={root}
      aria-label="Main navigation"
      className={cn("relative flex max-w-full items-center", collapsed ? "w-full justify-end" : "w-fit")}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
          setFocused(null);
        }
      }}
    >
      <div ref={measure} aria-hidden="true" className="pointer-events-none invisible absolute top-0 left-0 flex w-max max-w-full gap-0.5 overflow-hidden p-1">
        {items.map((item) => <span key={item.href} className={itemClass}>{item.label}</span>)}
      </div>
      {!collapsed ? (
        <div className="pettroz-pill-surface relative rounded-full p-1">
          <div className="relative">
            <span ref={highlight} aria-hidden="true" className="pettroz-nav-glide pointer-events-none absolute inset-y-0 left-0 rounded-full bg-primary opacity-0 shadow-[inset_0_1px_0_#ffffff30,0_4px_12px_-4px_#00000040]" />
            <ul
              ref={track}
              className="relative flex gap-0.5"
              onPointerLeave={() => setHovered(null)}
            >
              {items.map((item) => (
                <li key={item.href} onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(item.href); }}>
                  <Link href={item.href} onClick={navigate} onFocus={(event) => setFocused(event.currentTarget.matches(":focus-visible") ? item.href : null)} onBlur={() => setFocused(null)} aria-current={activeHref === item.href ? "page" : undefined} className={cn(itemClass, "relative transition-colors duration-200 focus-visible:outline-white", highlightedHref === item.href ? "text-white" : "text-white/75")}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <button ref={toggle} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)} className="pettroz-pill-surface relative z-10 grid size-[52px] shrink-0 place-items-center rounded-full text-white focus-visible:outline-navy">
            <span className="relative h-3 w-[18px]" aria-hidden="true">
              <span className={cn("absolute left-0 h-0.5 w-full rounded-full bg-current transition-[top,rotate] duration-300", open ? "top-[5px] rotate-45" : "top-[2px]")} />
              <span className={cn("absolute left-0 h-0.5 w-full rounded-full bg-current transition-[top,rotate] duration-300", open ? "top-[5px] -rotate-45" : "top-[10px]")} />
            </span>
          </button>
          {open && (
            <div id={panelId} className="pettroz-pill-surface pettroz-nav-panel absolute top-0 right-0 w-[min(320px,calc(100vw-2.5rem))] overflow-hidden rounded-[26px] px-2 pt-16 pb-2 text-white">
              <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain">
                <ul className="space-y-0.5">
                  {items.map((item) => <li key={item.href}><Link href={item.href} onClick={navigate} aria-current={activeHref === item.href ? "page" : undefined} className={cn("flex min-h-12 items-center rounded-[18px] px-4 text-sm font-medium transition-colors focus-visible:-outline-offset-2 focus-visible:outline-white", activeHref === item.href ? "bg-primary text-white" : "hover:bg-white/10")}>{item.label}</Link></li>)}
                </ul>
                <div className="mx-3 my-3 border-t border-white/15" />
                <div className="px-1">
                  <Link href="/products/petrol-pump-management" onClick={navigate} className="flex min-h-11 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10">Petrol Pump Management</Link>
                  <Link href="/products/attendance-payroll" onClick={navigate} className="flex min-h-11 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10">Attendance & Payroll</Link>
                  <Link href="/contact" onClick={navigate} className="flex min-h-11 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10">Contact</Link>
                  <Link href="/login" onClick={navigate} className="flex min-h-11 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10">Log in</Link>
                  <Link href="/book-demo" onClick={navigate} className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90">Book a free demo</Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
}
