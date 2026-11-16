"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, ChevronDown, ChevronRight, Search, X } from "@/lib/icons";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { blogCardDescription, type PublicBlogPost } from "@/lib/blog";
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

export function ResourcesBrowse({
  posts,
  basePath = "/resources",
  title = "Resources",
}: {
  posts: PublicBlogPost[];
  basePath?: string;
  title?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const topicsFromUrl = parseList(searchParams.get("topic"));
  const tagsFromUrl = parseList(searchParams.get("tag"));
  const [query, setQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(topicsFromUrl);
  const [selectedTags, setSelectedTags] = useState<string[]>(tagsFromUrl);

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

  const tags = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const post of posts) {
      for (const item of post.tags ?? []) {
        const next = item?.trim();
        if (!next || seen.has(next)) continue;
        seen.add(next);
        list.push(next);
      }
    }
    return list;
  }, [posts]);

  useEffect(() => {
    setSelectedTopics(topicsFromUrl.filter((item) => topics.includes(item)));
  }, [topicsFromUrl.join("|"), topics]); // eslint-disable-line react-hooks/exhaustive-deps -- sync from URL

  useEffect(() => {
    setSelectedTags(tagsFromUrl.filter((item) => tags.includes(item)));
  }, [tagsFromUrl.join("|"), tags]); // eslint-disable-line react-hooks/exhaustive-deps -- sync from URL

  function syncUrl(nextTopics: string[], nextTags: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTopics.length) params.set("topic", encodeList(nextTopics));
    else params.delete("topic");
    if (nextTags.length) params.set("tag", encodeList(nextTags));
    else params.delete("tag");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function addTopic(value: string) {
    if (!value || selectedTopics.includes(value)) return;
    const next = [...selectedTopics, value];
    setSelectedTopics(next);
    syncUrl(next, selectedTags);
  }

  function addTag(value: string) {
    if (!value || selectedTags.includes(value)) return;
    const next = [...selectedTags, value];
    setSelectedTags(next);
    syncUrl(selectedTopics, next);
  }

  function removeTopic(value: string) {
    const next = selectedTopics.filter((item) => item !== value);
    setSelectedTopics(next);
    syncUrl(next, selectedTags);
  }

  function removeTag(value: string) {
    const next = selectedTags.filter((item) => item !== value);
    setSelectedTags(next);
    syncUrl(selectedTopics, next);
  }

  const availableTopics = topics.filter((item) => !selectedTopics.includes(item));
  const availableTags = tags.filter((item) => !selectedTags.includes(item));
  const hasChips = selectedTopics.length > 0 || selectedTags.length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (selectedTopics.length > 0 && !selectedTopics.includes(post.category)) return false;
      if (
        selectedTags.length > 0 &&
        !selectedTags.some((tag) => (post.tags ?? []).includes(tag))
      ) {
        return false;
      }
      if (!q) return true;
      const haystack = [post.title, post.subtitle, post.excerpt, post.category, ...(post.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, selectedTopics, selectedTags]);

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
            {title}
          </li>
        </ol>
      </nav>

      <header className="border-b border-navy/10 pb-8">
        <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-navy sm:text-5xl">
          {title}
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
              placeholder="Search articles"
              aria-label="Search articles"
              className="h-11 w-full rounded-full border border-navy/10 bg-white pr-4 pl-10 text-sm text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-primary/40"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <FilterSelect
              label="Categories"
              emptyLabel="No categories"
              options={availableTopics}
              disabled={availableTopics.length === 0}
              onSelect={addTopic}
            />
            <FilterSelect
              label="Tags"
              emptyLabel="No tags"
              options={availableTags}
              disabled={availableTags.length === 0}
              onSelect={addTag}
            />
          </div>
        </div>

        {hasChips ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
            {selectedTopics.map((item) => (
              <Chip key={`topic-${item}`} label={item} tone="category" onRemove={() => removeTopic(item)} />
            ))}
            {selectedTags.map((item) => (
              <Chip key={`tag-${item}`} label={item} tone="tag" onRemove={() => removeTag(item)} />
            ))}
          </div>
        ) : null}
      </header>

      {filtered.length === 0 ? (
        <p className="py-16 text-sm text-muted-foreground">No articles match your search.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((article) => {
            const description = blogCardDescription(article);
            return (
            <Link
              key={article.slug}
              href={`${basePath}/${article.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white transition-colors hover:border-primary/30"
            >
              <BlogThumbnail
                category={article.category}
                title={article.title}
                coverUrl={article.coverUrl}
                className="aspect-[16/9] rounded-none border-b border-navy/5"
              />
              <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">
                  {article.category || article.tags?.[0] || "Article"}
                </p>
                <h2 className="mt-1.5 line-clamp-2 text-sm leading-snug font-semibold tracking-tight text-navy transition-colors group-hover:text-primary sm:text-base">
                  {article.title}
                </h2>
                {description ? (
                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {description}
                  </p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-semibold text-navy sm:text-sm">
                  Read article
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

function FilterSelect({
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

function Chip({
  label,
  tone,
  onRemove,
}: {
  label: string;
  tone: "category" | "tag";
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
        tone === "category"
          ? "border-primary/20 bg-primary/10 text-primary hover:bg-primary/15"
          : "border-navy/15 bg-navy/5 text-navy hover:bg-navy/10",
      )}
      title={`Remove ${label}`}
    >
      {label}
      <X aria-hidden="true" className="size-3.5 opacity-70" />
    </button>
  );
}
