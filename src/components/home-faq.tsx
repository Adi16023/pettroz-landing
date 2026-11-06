import { ChevronDown } from "lucide-react";
import { homeFaqs } from "@/lib/content";

export function HomeFaq() {
  return (
    <div className="home-faq-list rounded-2xl border border-navy/10 bg-white px-5 sm:px-7" aria-label="Frequently asked questions">
      {homeFaqs.map((faq) => (
        <details key={faq.q} name="home-faq" className="home-faq-item group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-sm font-semibold text-navy sm:text-base">
            <span>{faq.q}</span>
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f4f3ef] text-navy transition-colors group-open:bg-primary/10 group-open:text-primary">
              <ChevronDown aria-hidden="true" className="home-faq-chevron size-4" />
            </span>
          </summary>
          <div className="home-faq-answer">
            <p className="max-w-3xl pb-5 pr-10 text-sm leading-6 text-muted-foreground sm:pb-6 sm:text-[15px] sm:leading-7">
              {faq.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
