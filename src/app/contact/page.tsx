import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { ArrowRight, BadgeHelp, Layers3, Presentation } from "lucide-react";
import { H1, Kicker, Lead, Section } from "@/components/ui";
import { brand } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 lg:pt-20">
        <Kicker>Contact</Kicker>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <H1>Let’s find the right fit for your business.</H1>
            <Lead className="mt-4">
              Explore Petrozz products, compare options, or get ready for a personalised demo.
            </Lead>

            <div className="mt-9 space-y-3">
              {[
                { href: "/products", title: "Compare products", text: "See what each Petrozz product helps you manage.", Icon: Layers3 },
                { href: "/pricing", title: "Explore pricing", text: "Review plan options and what to consider.", Icon: BadgeHelp },
                { href: "/book-demo", title: "See a product demo", text: "Learn what a walkthrough can cover.", Icon: Presentation },
              ].map(({ href, title, text, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 rounded-2xl border border-navy/10 bg-white/70 p-4 transition-colors hover:border-primary/30 hover:bg-white"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f4f3ef] text-navy">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-navy">{title}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">{text}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:pt-2">
            <LeadForm kind="contact" />
          </div>
        </div>

        <section className="mt-16 border-t border-navy/10 pt-10" aria-labelledby="contact-faq-heading">
          <h2 id="contact-faq-heading" className="text-xl font-semibold tracking-tight text-navy">A few quick answers</h2>
          <div className="mt-4 max-w-4xl border-t border-navy/10">
            {[
              {
                q: "Can I ask about both Petrozz products?",
                a: "Yes. Petrozz offers Petrol Pump Management and standalone Attendance & Payroll. You can compare both on the Products page.",
              },
              {
                q: "Can I submit an enquiry through this page?",
                a: "Not yet. The form preview is inactive and does not collect or send information.",
              },
              {
                q: "How can an existing customer reach support?",
                a: `Email us at ${brand.supportEmail} and our team will help you.`,
              },
            ].map((faq) => (
              <details key={faq.q} className="group border-b border-navy/10">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-5 py-3 text-sm font-semibold text-navy">
                  {faq.q}
                  <span aria-hidden="true" className="text-lg text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-5 pr-8 text-sm leading-6 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Section>
    </>
  );
}
