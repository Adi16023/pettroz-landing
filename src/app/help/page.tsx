"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, H1, Kicker, Lead, Section } from "@/components/ui";
import { helpArticles } from "@/lib/content";

export default function HelpPage() {
  const [q, setQ] = useState("");
  const [product, setProduct] = useState("All");
  const cats = useMemo(() => Array.from(new Set(helpArticles.map((a) => a.category))), []);
  const filtered = helpArticles.filter((a) => {
    const hit = !q || a.title.toLowerCase().includes(q.toLowerCase());
    if (!hit) return false;
    if (product === "All") return true;
    return a.category === product;
  });

  return (
    <Section className="pt-20">
      <Kicker>Help Center</Kicker>
      <H1>How Can We Help You Today?</H1>
      <Lead>Search guides by product, or raise a ticket from Contact Support.</Lead>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles"
          className="h-11 flex-1 rounded-lg border border-border bg-card px-3 text-sm"
        />
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="h-11 cursor-pointer rounded-lg border border-border bg-card px-3 text-sm"
        >
          <option>All</option>
          {cats.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="mt-8 space-y-8">
        {cats.map((c) => {
          const items = filtered.filter((a) => a.category === c);
          if (!items.length) return null;
          return (
            <div key={c}>
              <h2 className="text-lg font-semibold text-navy">{c}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {items.map((a) => (
                  <Link key={a.slug} href={`/help/${a.slug}`} className="cursor-pointer">
                    <Card className="p-4 hover:border-primary">{a.title}</Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex gap-3">
        <Link href="/contact" className="inline-flex h-11 cursor-pointer items-center rounded-lg bg-primary px-5 text-sm font-medium text-white">
          Raise Support Ticket
        </Link>
        <Link href="/contact" className="inline-flex h-11 cursor-pointer items-center rounded-lg bg-navy px-5 text-sm font-medium text-white">
          Contact Support
        </Link>
      </div>
    </Section>
  );
}
