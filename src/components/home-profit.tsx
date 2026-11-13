import { ArrowUpRight, ChartNoAxesCombined, Fuel, GitCompareArrows, TrendingUp } from "lucide-react";
import { ButtonLink, Section, SectionTitle } from "@/components/ui";
import { PumpPreview } from "@/components/product-preview";
import { homeProfit } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [Fuel, TrendingUp, GitCompareArrows, ChartNoAxesCombined];

export function HomeProfit() {
  return (
    <Section id="profit">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <SectionTitle nowrap>{homeProfit.heading}</SectionTitle>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
            {homeProfit.description}
          </p>

          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {homeProfit.items.map((item, index) => {
              const Icon = icons[index] ?? Fuel;
              return (
                <li key={item.title} className="border-t border-navy/15 pt-4">
                  <span className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
                  </span>
                  <h3 className="text-sm font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </li>
              );
            })}
          </ul>

          <ButtonLink href={homeProfit.cta.href} className="mt-9">
            {homeProfit.cta.label}
            <ArrowUpRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="min-w-0 rounded-[1.5rem] bg-[#f4f3ef] p-3 sm:p-5 lg:p-6">
          <PumpPreview animated screen="Sales" />
        </div>
      </div>
    </Section>
  );
}
