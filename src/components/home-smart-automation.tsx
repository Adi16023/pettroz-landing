import {
  ArrowUpRight,
  Bell,
  CreditCard,
  FileStack,
  MessageCircle,
  Receipt,
  ScanLine,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink, Section, SectionTitle } from "@/components/ui";
import { homeSmartAutomation } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [
  Bell,
  Sparkles,
  Receipt,
  MessageCircle,
  ScanLine,
  Wallet,
  CreditCard,
  FileStack,
];

const accents = [
  "bg-[#f6e5dc] text-[#a6412b]",
  "bg-[#e6ede3] text-[#35604b]",
  "bg-[#e8eef6] text-[#355a8a]",
  "bg-[#f0e6e2] text-[#8a4a38]",
  "bg-[#efe9df] text-[#6b5535]",
  "bg-[#e4eef0] text-[#2f5f66]",
  "bg-[#ede8e2] text-[#6a5040]",
  "bg-[#e7eef2] text-[#3d5f72]",
];

type AutomationItem = (typeof homeSmartAutomation.items)[number];

function AutomationCard({ item, index }: { item: AutomationItem; index: number }) {
  const Icon = icons[index] ?? Bell;
  const accent = accents[index % accents.length];

  return (
    <article className="group relative z-[1] h-full rounded-[1.2rem] bg-white p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-5 lg:p-6">
      <span className={`inline-flex size-9 items-center justify-center rounded-xl ${accent}`}>
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-navy">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
    </article>
  );
}

export function HomeSmartAutomation() {
  const columns = 3;
  const rows: AutomationItem[][] = [];
  for (let i = 0; i < homeSmartAutomation.items.length; i += columns) {
    rows.push(homeSmartAutomation.items.slice(i, i + columns));
  }

  return (
    <Section id="smart-automation" className="overflow-hidden bg-[#f4f3ef]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="min-w-0">
          <SectionTitle nowrap>{homeSmartAutomation.heading}</SectionTitle>
          {/* <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
            {homeSmartAutomation.description}
          </p> */}
        </div>
        <ButtonLink href={homeSmartAutomation.cta.href} variant="navy" className="shrink-0 self-start lg:self-auto">
          {homeSmartAutomation.cta.label}
          <ArrowUpRight className="size-4" />
        </ButtonLink>
      </div>

      <div className="mt-10 lg:mt-12">
        {rows.map((row, rowIndex) => {
          const reversed = rowIndex % 2 === 1;
          const isLastRow = rowIndex === rows.length - 1;
          const startIndex = rowIndex * columns;
          const count = row.length;

          return (
            <div key={rowIndex}>
              <div className="relative">
                {count > 1 ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 z-0 hidden h-px -translate-y-1/2 bg-navy/15 lg:block"
                    style={{
                      // Span only between the first and last filled card centers in the 3-col grid
                      left: "calc(100% / 6)",
                      right: `calc(100% - ((2 * ${count} - 1) * 100% / 6))`,
                    }}
                  />
                ) : null}

                <div
                  className={cn(
                    "relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5",
                    reversed && count === 3 &&
                      "lg:[&>*:nth-child(1)]:order-3 lg:[&>*:nth-child(2)]:order-2 lg:[&>*:nth-child(3)]:order-1",
                    reversed && count === 2 &&
                      "lg:[&>*:nth-child(1)]:order-2 lg:[&>*:nth-child(2)]:order-1",
                  )}
                >
                  {row.map((item, colIndex) => (
                    <div key={item.title} className="relative min-w-0">
                      {count > 1 && colIndex < count - 1 ? (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none absolute top-1/2 z-10 hidden size-2 -translate-y-1/2 rounded-full bg-navy/30 lg:block",
                            reversed ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
                          )}
                        />
                      ) : null}
                      {count > 1 && colIndex > 0 ? (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none absolute top-1/2 z-10 hidden size-2 -translate-y-1/2 rounded-full bg-navy/30 lg:block",
                            reversed ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2",
                          )}
                        />
                      ) : null}
                      <AutomationCard item={item} index={startIndex + colIndex} />
                    </div>
                  ))}
                </div>
              </div>

              {!isLastRow ? (
                <div className="relative hidden h-9 lg:block" aria-hidden="true">
                  <span
                    className={cn(
                      "absolute top-0 h-full w-px bg-navy/15",
                      reversed ? "left-[calc(100%/6-0.5px)]" : "right-[calc(100%/6-0.5px)]",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-0 size-2 -translate-y-1/2 rounded-full bg-navy/30",
                      reversed ? "left-[calc(100%/6-4px)]" : "right-[calc(100%/6-4px)]",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 size-2 translate-y-1/2 rounded-full bg-navy/30",
                      reversed ? "left-[calc(100%/6-4px)]" : "right-[calc(100%/6-4px)]",
                    )}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

    </Section>
  );
}
