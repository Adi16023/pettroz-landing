import Link from "next/link";
import { cn } from "@/lib/utils";

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
        "inline-flex h-11 cursor-pointer items-center justify-center rounded-lg px-5 text-sm font-medium whitespace-nowrap transition-colors",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "navy" && "bg-navy text-navy-foreground hover:bg-navy/90",
        variant === "ghost" && "bg-muted text-foreground hover:bg-muted/80",
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
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-16 sm:px-6", className)}>
      {children}
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{children}</p>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-navy sm:text-5xl">
      {children}
    </h1>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{children}</p>;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-sm", className)}>
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
    <section className="bg-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">{title}</h2>
          <p className="mt-2 max-w-xl text-white/75">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="ghost" className="bg-white text-navy hover:bg-white/90">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
