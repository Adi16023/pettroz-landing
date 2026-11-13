"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Banknote,
  BookOpenText,
  Building2,
  Droplets,
  Fuel,
  MapPin,
  Newspaper,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import {
  fallbackBlogPosts,
  loadBlogPostsClient,
  type PublicBlogPost,
} from "@/lib/blog";

const categoryIcons: Record<string, LucideIcon> = {
  "Petrol Pump Management": Fuel,
  "Fuel Inventory & Stock Control": Droplets,
  "Employee Attendance": MapPin,
  "Payroll & HR Management": Banknote,
  "Business Productivity": Building2,
};

function categoryIcon(category: string) {
  return categoryIcons[category] ?? Wallet;
}

export function BlogMegaPanel({ onNavigate }: { onNavigate: () => void }) {
  const [posts, setPosts] = useState<PublicBlogPost[]>(() => fallbackBlogPosts());

  useEffect(() => {
    let gone = false;
    loadBlogPostsClient().then((next) => {
      if (!gone && next.length) setPosts(next);
    });
    return () => {
      gone = true;
    };
  }, []);

  const featured = posts[0];
  const latest = posts.slice(1, 5);
  const topics = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const post of posts) {
      const category = post.category?.trim();
      if (!category || seen.has(category)) continue;
      seen.add(category);
      list.push(category);
      if (list.length >= 5) break;
    }
    return list;
  }, [posts]);

  if (!featured) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.95fr_0.72fr] lg:gap-7">
      <Link
        href={`/blog/${featured.slug}`}
        onClick={onNavigate}
        style={{ animationDelay: "40ms" }}
        className="pettroz-mega-item group relative overflow-hidden rounded-[1.6rem] border border-navy/10 bg-[linear-gradient(160deg,#fff_0%,#faf7f4_100%)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_22px_48px_-30px_#1a1c2955]"
      >
        <BlogThumbnail
          category={featured.category}
          title={featured.title}
          coverUrl={featured.coverUrl}
          className="aspect-[16/10] rounded-none border-b border-navy/5"
        />
        <div className="p-5 sm:p-6">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            <Sparkles className="size-3" aria-hidden="true" />
            Featured
          </p>
          <h3 className="mt-3 text-xl leading-snug font-semibold tracking-[-0.03em] text-navy transition-colors group-hover:text-primary sm:text-[1.35rem]">
            {featured.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {featured.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-all group-hover:gap-2.5 group-hover:text-primary">
            Read article
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>

      <div className="pettroz-mega-item" style={{ animationDelay: "90ms" }}>
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          <Newspaper className="size-3.5" aria-hidden="true" />
          Latest notes
        </div>
        <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
          {latest.map((post, index) => {
            const Icon = categoryIcon(post.category);
            return (
              <li
                key={post.slug}
                style={{ animationDelay: `${120 + index * 45}ms` }}
                className="pettroz-mega-item"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={onNavigate}
                  className="group flex gap-3 py-3.5 transition-colors"
                >
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold tracking-wide text-primary/80 uppercase">
                      {post.category}
                    </span>
                    <span className="mt-1 block text-sm leading-5 font-semibold text-navy transition-colors group-hover:text-primary">
                      {post.title}
                    </span>
                    <span className="mt-1 line-clamp-1 block text-xs leading-5 text-muted-foreground">
                      {post.excerpt}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="pettroz-mega-item" style={{ animationDelay: "130ms" }}>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            <BookOpenText className="size-3.5" aria-hidden="true" />
            Topics
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic, index) => {
              const Icon = categoryIcon(topic);
              return (
                <li
                  key={topic}
                  style={{ animationDelay: `${160 + index * 35}ms` }}
                  className="pettroz-mega-item"
                >
                  <Link
                    href="/blog"
                    onClick={onNavigate}
                    className="group inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-2 text-xs font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-[0_12px_24px_-16px_#d9302260]"
                  >
                    <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                    {topic}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Link
          href="/blog"
          onClick={onNavigate}
          style={{ animationDelay: "220ms" }}
          className="pettroz-mega-item group mt-auto overflow-hidden rounded-[1.4rem] border border-navy/10 bg-[radial-gradient(circle_at_top_right,#f8e8e4_0%,#ffffff_55%)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-28px_#1a1c2950]"
        >
          <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            Pettroz Notes
          </p>
          <p className="mt-2 text-base leading-snug font-semibold tracking-tight text-navy">
            Practical ideas for fuel stations and teams.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-all group-hover:gap-2.5 group-hover:text-primary">
            Browse all articles
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export function BlogMobileLinks({ onNavigate }: { onNavigate: () => void }) {
  const [posts, setPosts] = useState<PublicBlogPost[]>(() => fallbackBlogPosts().slice(0, 6));

  useEffect(() => {
    let gone = false;
    loadBlogPostsClient().then((next) => {
      if (!gone && next.length) setPosts(next.slice(0, 6));
    });
    return () => {
      gone = true;
    };
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          onClick={onNavigate}
          className="flex min-h-10 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
        >
          {post.title}
        </Link>
      ))}
    </>
  );
}
