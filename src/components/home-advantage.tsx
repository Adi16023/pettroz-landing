import {
  ArrowUpRight,
  Banknote,
  BookOpen,
  Calculator,
  Droplets,
  FileText,
  Fuel,
  QrCode,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink, Section, SectionTitle } from "@/components/ui";
import { homeAdvantage } from "@/lib/content";

const icons: LucideIcon[] = [
  Banknote,
  Fuel,
  QrCode,
  Receipt,
  Users,
  Calculator,
  FileText,
  BookOpen,
  Droplets,
];

const iconTints = [
  "text-[#a6412b]/20",
  "text-[#355a8a]/20",
  "text-[#35604b]/20",
  "text-[#8a4a38]/20",
  "text-[#6b5535]/20",
  "text-[#2f5f66]/20",
  "text-[#6a5040]/20",
  "text-[#4a5640]/20",
  "text-[#3d5f72]/20",
];

export function HomeAdvantage() {
  return (
    <Section id="advantage" className="bg-[#f4f3ef]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="min-w-0">
          <SectionTitle nowrap>{homeAdvantage.heading}</SectionTitle>
          {/* <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
            {homeAdvantage.description}
          </p> */}
        </div>
        <ButtonLink href={homeAdvantage.cta.href} variant="navy" className="shrink-0 self-start lg:self-auto">
          {homeAdvantage.cta.label}
          <ArrowUpRight className="size-4" />
        </ButtonLink>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {homeAdvantage.items.map((item, index) => {
          const Icon = icons[index] ?? Fuel;
          const tint = iconTints[index % iconTints.length];

          return (
            <li
              key={item.number}
              className="group relative overflow-hidden rounded-[1.35rem] bg-white p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
            >
              <Icon
                aria-hidden="true"
                className={`pointer-events-none absolute -top-1 -right-1 size-[7.25rem] stroke-[1.15] select-none ${tint}`}
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold leading-none text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="text-lg leading-snug font-semibold tracking-tight text-navy">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm font-medium text-navy/75">{item.subtitle}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

    </Section>
  );
}
