import { ArrowUpRight, CalendarClock, CircleHelp, Info } from "lucide-react";
import { ButtonLink } from "@/components/ui";

type Kind = "demo" | "contact";

export function LeadForm({ kind }: { kind: Kind }) {
  const demo = kind === "demo";
  return (
    <div className="rounded-3xl border border-border bg-white p-7 sm:p-9" aria-labelledby={`${kind}-availability-title`}>
      <span className="grid size-12 place-items-center rounded-2xl bg-muted text-navy">
        {demo ? <CalendarClock className="size-5" /> : <CircleHelp className="size-5" />}
      </span>
      <p className="mt-7 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{demo ? "Online demo booking" : "Online enquiries"}</p>
      <h2 id={`${kind}-availability-title`} className="mt-3 text-2xl font-semibold tracking-tight text-navy">Not connected just yet.</h2>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
        {demo
          ? "Online demo requests are currently unavailable. Booking will be enabled once our enquiry service is connected."
          : "We’re not able to receive enquiries through this page yet. Online requests will be enabled once our enquiry service is connected."}
      </p>
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-background p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">No request has been submitted, and no contact details are being collected on this page.</p>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="/products" variant="navy">Explore the products <ArrowUpRight className="size-4" /></ButtonLink>
        <ButtonLink href="/pricing" variant="ghost">View plan options</ButtonLink>
      </div>
    </div>
  );
}
