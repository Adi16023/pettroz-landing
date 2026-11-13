import Image from "next/image";
import { Fuel, IdCard, User, UserRound, Users, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui";
import { homeRoles } from "@/lib/content";

const roleIcons: Record<(typeof homeRoles.roles)[number]["icon"], LucideIcon> = {
  owner: User,
  manager: IdCard,
  cashier: Users,
  operator: Fuel,
  hr: UserRound,
};

export function HomeRoles() {
  return (
    <Section id="roles" className="overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-[minmax(13rem,0.26fr)_minmax(0,0.74fr)] lg:items-start lg:gap-7 xl:gap-10">
        <div className="max-w-sm lg:pt-1">
          <h2 className="text-[clamp(2rem,3.4vw,2.85rem)] leading-[1.12] font-semibold tracking-[-0.045em] text-navy">
            {homeRoles.heading}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{homeRoles.description}</p>
        </div>

        <ul className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {homeRoles.roles.map((role, index) => {
            const Icon = roleIcons[role.icon];
            return (
              <li
                key={role.name}
                className="group w-[min(58vw,15.5rem)] shrink-0 animate-[fade-up_700ms_cubic-bezier(0.22,1,0.36,1)_both] lg:w-auto"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <article className="relative overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-[0_10px_30px_-18px_#1a1c2930] transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#eceae4]">
                    <Image
                      src={role.image}
                      alt={`${role.name} role at a petrol station`}
                      fill
                      sizes="(max-width: 1024px) 58vw, 16vw"
                      className="object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>

                  <div className="relative -mt-10 mx-2.5 mb-2.5 rounded-xl border border-navy/6 bg-white px-3.5 py-3.5 shadow-[0_8px_24px_-16px_#1a1c2940] sm:mx-3 sm:mb-3 sm:px-4">
                    <div className="flex items-center gap-2">
                      <Icon aria-hidden="true" className="size-4 shrink-0 text-[#2f6fed]" strokeWidth={1.8} />
                      <h3 className="text-sm font-semibold tracking-tight text-navy">{role.name}</h3>
                    </div>
                    <p className="mt-1.5 text-[0.8rem] leading-5 text-muted-foreground">{role.text}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
