import type { Metadata } from "next";
import { H1, Kicker, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy" };

const topics = [
  "Employee personal information",
  "Attendance records",
  "GPS location data",
  "Selfie and facial verification data",
  "Biometric integration data",
  "Payroll and bank-related information",
  "Data retention",
  "Account access and permissions",
  "Data deletion requests",
  "Data security",
  "Third-party service providers",
];

export default function PrivacyPage() {
  return (
    <Section className="max-w-3xl pt-20">
      <Kicker>Legal</Kicker>
      <H1>Privacy Policy</H1>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Pettroz processes business and, for Attendance & Payroll, sensitive employee data. This
        page explains the categories we handle. Legal wording will be reviewed against applicable
        laws and the live product implementation before it is treated as binding.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        {topics.map((t) => (
          <li key={t}>• {t}</li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">
        Location and biometric collection require appropriate permissions, consent, retention, and
        access controls. Contact us to request deletion or a copy of personal data held in a
        workspace you own.
      </p>
    </Section>
  );
}
