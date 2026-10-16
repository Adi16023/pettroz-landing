import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { Card, H1, Kicker, Lead, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section className="pt-20">
      <Kicker>Contact</Kicker>
      <H1>We’re Here to Help Your Business Grow.</H1>
      <Lead>Have a question about Pettroz? Our team is ready to help you choose the right software.</Lead>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <h2 className="font-semibold text-navy">Sales Enquiries</h2>
          <p className="mt-2 text-sm text-muted-foreground">For pricing, demos, and new subscriptions.</p>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-navy">Customer Support</h2>
          <p className="mt-2 text-sm text-muted-foreground">For existing customer technical assistance.</p>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-navy">Partnerships</h2>
          <p className="mt-2 text-sm text-muted-foreground">For business partnerships and integration enquiries.</p>
        </Card>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        WhatsApp is available on the official business account once connected. Verified email,
        hours, and address will be published here.
      </p>
      <div className="mt-10">
        <LeadForm kind="contact" />
      </div>
    </Section>
  );
}
