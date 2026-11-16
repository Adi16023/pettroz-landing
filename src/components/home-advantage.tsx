import {
  ArrowUpRight,
  Banknote,
  BookOpen,
  Calculator,
  Droplets,
  FileText,
  Fuel,
  Group,
  QrCode,
  ReceiptText,
} from "@/lib/icons";
import { ButtonLink, Section, SectionTitle } from "@/components/ui";
import { homeAdvantage } from "@/lib/content";

const icons = [
  Banknote,
  Fuel,
  QrCode,
  ReceiptText,
  Group,
  Calculator,
  FileText,
  BookOpen,
  Droplets,
] as const;

export function HomeAdvantage() {
  return (
    <Section id="advantage" className="bg-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="min-w-0 max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {homeAdvantage.eyebrow}
          </p>
          <SectionTitle className="mt-3">{homeAdvantage.heading}</SectionTitle>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
            {homeAdvantage.description}
          </p>
        </div>
        <ButtonLink
          href={homeAdvantage.cta.href}
          variant="navy"
          className="shrink-0 self-start lg:self-auto"
        >
          {homeAdvantage.cta.label}
          <ArrowUpRight className="size-4" />
        </ButtonLink>
      </div>

      <ul className="mt-12 grid gap-px bg-navy/10 sm:grid-cols-2 xl:grid-cols-3">
        {homeAdvantage.items.map((item, index) => {
          const Icon = icons[index] ?? Fuel;

          return (
            <li
              key={item.number}
              className="group relative flex flex-col bg-white p-6 transition-colors duration-300 hover:bg-[#fafaf9] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold leading-none text-white transition-colors duration-300 group-hover:bg-primary">
                    {index + 1}
                  </span>
                  <h3 className="text-base leading-snug font-semibold tracking-tight text-navy sm:text-[1.05rem]">
                    {item.title}
                  </h3>
                </div>
                <span className="inline-flex size-10 shrink-0 items-center justify-center border border-navy/10 text-navy transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-navy/70">{item.subtitle}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
