import { ArrowUpRight, CalendarClock, CircleHelp, Info } from "lucide-react";
import { ButtonLink } from "@/components/ui";

type Kind = "demo" | "contact";

export function LeadForm({ kind }: { kind: Kind }) {
  const demo = kind === "demo";

  if (!demo) {
    return (
      <div className="rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_12px_40px_-32px_#1a1c29aa] sm:p-8" aria-labelledby="contact-availability-title">
        <h2 id="contact-availability-title" className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">Send us a message</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">A few details help us point you in the right direction.</p>
        <p className="mt-5 rounded-xl bg-[#f4f3ef] px-4 py-3 text-xs leading-5 text-navy">
          The enquiry form is not active yet. This preview does not collect or send information.
        </p>
        <fieldset disabled className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-navy">
            Your name
            <input
              aria-label="Your name"
              placeholder="Name"
              className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-normal placeholder:text-muted-foreground"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-navy">
            Email address
            <input
              aria-label="Email address"
              type="email"
              placeholder="you@company.com"
              className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-normal placeholder:text-muted-foreground"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-navy">
            How can we help?
            <textarea
              aria-label="How can we help?"
              placeholder="Tell us what you’re looking for"
              rows={3}
              className="resize-none rounded-xl border border-border bg-background px-3 py-3 text-sm font-normal placeholder:text-muted-foreground"
            />
          </label>
          <button type="button" disabled className="min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white opacity-50">
            Enquiries coming soon
          </button>
        </fieldset>
      </div>
    );
  }

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
      {!demo ? (
        <div className="mt-6 border-t border-border pt-5">
          <h3 className="text-sm font-semibold text-navy">Enquiry details planned</h3>
          <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
            {[
              "Full name",
              "Business / Company Name",
              "Mobile Number",
              "Email Address",
              "Interested Product: Petrol Pump Management, Attendance & Payroll, Both Products, or Other Enquiries",
              "Your Message",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-5 text-muted-foreground">
                <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            These fields are shown for reference only. The enquiry form is not active and collects no information.
          </p>
        </div>
      ) : null}
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="/products" variant="navy">Explore the products <ArrowUpRight className="size-4" /></ButtonLink>
        <ButtonLink href="/pricing" variant="ghost">View plan options</ButtonLink>
      </div>
    </div>
  );
}
