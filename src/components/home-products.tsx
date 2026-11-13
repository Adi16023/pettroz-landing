import Link from "next/link";
import { ArrowUpRight, Fuel, Users } from "lucide-react";
import { AttendancePreview, PumpPreview } from "@/components/product-preview";
import { Section, SectionTitle } from "@/components/ui";
import { homeProductsIntro } from "@/lib/content";

const icons = {
  pump: Fuel,
  attendance: Users,
} as const;

const washes = {
  pump: "bg-[#f6e5dc] text-[#a6412b]",
  attendance: "bg-[#e6ede3] text-[#35604b]",
} as const;

export function HomeProducts() {
  return (
    <Section id="products">
      <SectionTitle nowrap>{homeProductsIntro.heading}</SectionTitle>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
        {homeProductsIntro.description}
      </p>

      <ul className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {homeProductsIntro.cards.map((card) => {
          const Icon = icons[card.product];
          return (
            <li
              key={card.label}
              className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-navy/10 bg-white shadow-[0_12px_40px_-28px_#1a1c2940] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="border-b border-navy/8 bg-[#f4f3ef] px-4 pt-4 sm:px-5 sm:pt-5">
                <div className="overflow-hidden rounded-t-xl">
                  {card.product === "pump" ? <PumpPreview /> : <AttendancePreview />}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className={`mb-5 inline-flex size-11 items-center justify-center rounded-xl ${washes[card.product]}`}>
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                </div>
                <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                  {card.label}
                </p>
                <h3 className="mt-2 max-w-md text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-[1.7rem]">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{card.text}</p>
                <Link
                  href={card.href}
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 whitespace-nowrap text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  {card.cta}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
