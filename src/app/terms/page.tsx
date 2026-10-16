import type { Metadata } from "next";
import { H1, Kicker, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <Section className="max-w-3xl pt-20">
      <Kicker>Legal</Kicker>
      <H1>Terms of Service</H1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Pettroz provides two independently subscribed products: Petrol Pump Management and
          Attendance & Payroll. Access, entitlements, and user permissions are managed per product.
        </p>
        <p>
          An Acceptable Use Policy applies: do not misuse workspaces, attempt unauthorized access,
          or process other people’s data without a lawful basis.
        </p>
        <p>These terms will be finalized with legal review before they govern paid subscriptions.</p>
      </div>
    </Section>
  );
}
