import type { Metadata } from "next";
import { Suspense } from "react";
import { FaqBrowse } from "@/components/faq-browse";
import { Section } from "@/components/ui";
import { allFaqs } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <Section className="pt-16 lg:pt-20">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading FAQs…</p>}>
        <FaqBrowse faqs={allFaqs} />
      </Suspense>
    </Section>
  );
}
