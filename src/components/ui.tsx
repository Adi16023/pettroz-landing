import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "navy" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-center transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0",
        variant === "primary" && "bg-primary text-primary-foreground shadow-[0_4px_12px_#d9302218] hover:bg-primary/90 hover:shadow-[0_6px_20px_#d9302226]",
        variant === "navy" && "bg-navy text-navy-foreground hover:bg-navy/90",
        variant === "ghost" && "border border-border bg-transparent text-navy hover:bg-muted",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("site-container py-20 lg:py-24", className)}>
      {children}
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">{children}</span>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-0 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-balance text-navy sm:text-5xl lg:text-6xl">
      {children}
    </h1>
  );
}

export function Lead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mt-6 max-w-2xl text-base leading-[1.8] text-pretty text-muted-foreground sm:text-lg", className)}>{children}</p>;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-[0_2px_8px_#1a1c2903]", className)}>
      {children}
    </div>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="site-container py-12">
      <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded-[2rem] bg-navy px-7 py-14 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20">
        <div className="relative max-w-2xl">
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.04em] text-balance text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">{text}</p>
        </div>
        <div className="relative flex shrink-0 flex-col gap-3">
          <ButtonLink href={primary.href}>{primary.label}<ArrowUpRight className="size-4 shrink-0" /></ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="ghost" className="border-white/20 text-white hover:bg-white/10">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
