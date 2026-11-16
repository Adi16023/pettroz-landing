"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import type { FaqItem } from "@/lib/content";
import { cn } from "@/lib/utils";

function parseList(value: string | null) {
  if (!value?.trim()) return [] as string[];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function encodeList(values: string[]) {
  return values.join(",");
}

export function FaqBrowse({ faqs }: { faqs: FaqItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const topicsFromUrl = parseList(searchParams.get("topic"));
  const [query, setQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(topicsFromUrl);

  const topics = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const faq of faqs) {
      const topic = faq.topic?.trim();
      if (!topic || seen.has(topic)) continue;
      seen.add(topic);
      list.push(topic);
    }
    return list;
  }, [faqs]);

  useEffect(() => {
    setSelectedTopics(topicsFromUrl.filter((item) => topics.includes(item)));
  }, [topicsFromUrl.join("|"), topics]); // eslint-disable-line react-hooks/exhaustive-deps -- sync from URL

  function syncUrl(nextTopics: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTopics.length) params.set("topic", encodeList(nextTopics));
    else params.delete("topic");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function addTopic(value: string) {
    if (!value || selectedTopics.includes(value)) return;
    const next = [...selectedTopics, value];
    setSelectedTopics(next);
    syncUrl(next);
  }

  function removeTopic(value: string) {
    const next = selectedTopics.filter((item) => item !== value);
    setSelectedTopics(next);
    syncUrl(next);
  }

  const availableTopics = useMemo(
    () => topics.filter((item) => !selectedTopics.includes(item)),
    [topics, selectedTopics],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      if (selectedTopics.length && !selectedTopics.includes(faq.topic)) return false;
      if (!q) return true;
      return `${faq.q} ${faq.a} ${faq.topic}`.toLowerCase().includes(q);
    });
  }, [faqs, query, selectedTopics]);

  const columns = useMemo(() => {
    const left: FaqItem[] = [];
    const right: FaqItem[] = [];
    filtered.forEach((faq, index) => {
      (index % 2 === 0 ? left : right).push(faq);
    });
    return [left, right] as const;
  }, [filtered]);

  const hasChips = selectedTopics.length > 0;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="font-medium text-navy transition-colors hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-navy/30">
            <ChevronRight className="size-3.5" />
          </li>
          <li className="font-medium text-navy/60" aria-current="page">
            FAQ
          </li>
        </ol>
      </nav>

      <header className="border-b border-navy/10 pb-8">
        <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-navy sm:text-5xl">
          FAQ
        </h1>

        <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-navy/40"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions"
              aria-label="Search questions"
              className="h-11 w-full rounded-full border border-navy/10 bg-white pr-4 pl-10 text-sm text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-primary/40"
            />
          </div>

          <TopicSelect
            label="Topics"
            emptyLabel="No topics"
            options={availableTopics}
            disabled={availableTopics.length === 0}
            onSelect={addTopic}
          />
        </div>

        {hasChips ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
            {selectedTopics.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => removeTopic(item)}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {item}
                <X aria-hidden="true" className="size-3.5 opacity-70" />
                <span className="sr-only">Remove {item}</span>
              </button>
            ))}
          </div>
        ) : null}
      </header>

      {filtered.length === 0 ? (
        <p className="py-16 text-sm text-muted-foreground">No questions match your search.</p>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="home-faq-list h-fit rounded-2xl border border-navy/10 bg-white px-5 sm:px-6"
            >
              {column.map((faq) => (
                <details key={faq.q} name="faq-page" className="home-faq-item group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-navy sm:text-[15px]">
                    <span>{faq.q}</span>
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f4f3ef] text-navy transition-colors group-open:bg-primary/10 group-open:text-primary">
                      <ChevronDown aria-hidden="true" className="home-faq-chevron size-4" />
                    </span>
                  </summary>
                  <div className="home-faq-answer">
                    <p className="pb-5 pr-8 text-sm leading-6 text-muted-foreground sm:leading-7">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function TopicSelect({
  label,
  emptyLabel,
  options,
  disabled,
  onSelect,
}: {
  label: string;
  emptyLabel: string;
  options: string[];
  disabled?: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="relative min-w-[10.5rem] shrink-0">
      <select
        aria-label={label}
        disabled={disabled}
        className={cn(
          "h-11 w-full cursor-pointer appearance-none rounded-full border border-navy/10 bg-white pr-10 pl-4 text-sm font-medium text-navy outline-none transition-colors focus:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
        )}
        value=""
        onChange={(event) => {
          const value = event.target.value;
          if (!value) return;
          onSelect(value);
          event.currentTarget.value = "";
        }}
      >
        <option value="" disabled>
          {disabled ? emptyLabel : label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-navy/40"
      />
    </div>
  );
}
