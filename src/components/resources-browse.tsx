"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, ChevronRight, Search } from "lucide-react";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import type { PublicBlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function ResourcesBrowse({ posts }: { posts: PublicBlogPost[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const topicFromUrl = searchParams.get("topic")?.trim() || "All";
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(topicFromUrl);

  const topics = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const post of posts) {
      const category = post.category?.trim();
      if (!category || seen.has(category)) continue;
      seen.add(category);
      list.push(category);
    }
    return list;
  }, [posts]);

  useEffect(() => {
    const next =
      topicFromUrl === "All" || topics.includes(topicFromUrl) ? topicFromUrl : "All";
    setTopic(next);
  }, [topicFromUrl, topics]);

  function selectTopic(next: string) {
    setTopic(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("topic");
    else params.set("topic", next);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (topic !== "All" && post.category !== topic) return false;
      if (!q) return true;
      const haystack = [post.title, post.subtitle, post.excerpt, post.category, ...(post.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, topic]);

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
            Resources
          </li>
        </ol>
      </nav>

      <header className="border-b border-navy/10 pb-8">
        <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-navy sm:text-5xl">
          Resources
        </h1>

        <div className="relative mt-7 max-w-xl">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-navy/40"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
            className="h-11 w-full rounded-full border border-navy/10 bg-white pr-4 pl-10 text-sm text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-primary/40"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {["All", ...topics].map((item) => {
            const active = topic === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => selectTopic(item)}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-navy/10 bg-white text-navy hover:border-primary/30 hover:text-primary",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="py-16 text-sm text-muted-foreground">No articles match your search.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group overflow-hidden rounded-2xl border border-navy/10 bg-white transition-colors hover:border-primary/30"
            >
              <BlogThumbnail
                category={article.category}
                title={article.title}
                coverUrl={article.coverUrl}
                className="aspect-[16/9] rounded-none border-b border-navy/5"
              />
              <div className="p-3.5 sm:p-4">
                <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">
                  {article.category}
                </p>
                <h2 className="mt-1.5 text-sm leading-snug font-semibold tracking-tight text-navy transition-colors group-hover:text-primary sm:text-base">
                  {article.title}
                </h2>
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  {article.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy sm:text-sm">
                  Read article
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
