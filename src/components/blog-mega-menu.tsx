"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Banknote,
  BookOpenText,
  Building2,
  CircleHelp,
  Droplets,
  Fuel,
  Headset,
  LifeBuoy,
  MapPin,
  PlayCircle,
  Star,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { loadBlogPostsClient, type PublicBlogPost } from "@/lib/blog";

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

const helpLinks: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/help", label: "Help centre", Icon: LifeBuoy },
  { href: "/#faq", label: "FAQs", Icon: CircleHelp },
  { href: "/help", label: "Video Tutorials", Icon: PlayCircle },
];

export function BlogMegaPanel({ onNavigate }: { onNavigate: () => void }) {
  const [posts, setPosts] = useState<PublicBlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let gone = false;
    loadBlogPostsClient("blog")
      .then((next) => {
        if (!gone) setPosts(next);
      })
      .finally(() => {
        if (!gone) setLoaded(true);
      });
    return () => {
      gone = true;
    };
  }, []);

  const featured = posts[0];
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

  if (!loaded) {
    return <p className="py-6 text-sm text-muted-foreground">Loading resources…</p>;
  }

  if (!featured) {
    return (
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-7">
        <HelpSupportColumn onNavigate={onNavigate} />
        <div className="rounded-[1.4rem] border border-navy/10 bg-white p-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            Blogs & Articles
          </p>
          <p className="mt-3 text-base font-semibold text-navy">No posts found</p>
          <p className="mt-2 text-sm text-muted-foreground">Published articles will show up here.</p>
          <Link
            href="/resources"
            onClick={onNavigate}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-all hover:gap-2.5 hover:text-primary"
          >
            Open resources
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.85fr_1.05fr] lg:gap-7">
      <Link
        href={`/resources/${featured.slug}`}
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
            <Star className="size-3" aria-hidden="true" />
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

      <HelpSupportColumn onNavigate={onNavigate} />

      <div className="pettroz-mega-item" style={{ animationDelay: "130ms" }}>
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          <BookOpenText className="size-3.5" aria-hidden="true" />
          Blogs & Articles
        </div>
        {topics.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No categories yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
            {topics.map((topic, index) => {
              const Icon = categoryIcon(topic);
              return (
                <li
                  key={topic}
                  style={{ animationDelay: `${150 + index * 40}ms` }}
                  className="pettroz-mega-item"
                >
                  <Link
                    href={`/resources?topic=${encodeURIComponent(topic)}`}
                    onClick={onNavigate}
                    className="group flex items-center gap-3 py-3.5 transition-colors"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-navy transition-colors group-hover:text-primary">
                        {topic}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <Link
          href="/resources"
          onClick={onNavigate}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-all hover:gap-2.5 hover:text-primary"
        >
          View all articles
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

function HelpSupportColumn({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="pettroz-mega-item" style={{ animationDelay: "90ms" }}>
      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        <Headset className="size-3.5" aria-hidden="true" />
        Help & Support
      </div>
      <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
        {helpLinks.map(({ href, label, Icon }, index) => (
          <li
            key={label}
            style={{ animationDelay: `${110 + index * 40}ms` }}
            className="pettroz-mega-item"
          >
            <Link
              href={href}
              onClick={onNavigate}
              className="group flex items-center gap-3 py-3.5 transition-colors"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
              </span>
              <span className="text-sm font-semibold text-navy transition-colors group-hover:text-primary">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogMobileLinks({ onNavigate }: { onNavigate: () => void }) {
  const [topics, setTopics] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let gone = false;
    loadBlogPostsClient("blog")
      .then((next) => {
        if (gone) return;
        const seen = new Set<string>();
        const list: string[] = [];
        for (const post of next) {
          const category = post.category?.trim();
          if (!category || seen.has(category)) continue;
          seen.add(category);
          list.push(category);
        }
        setTopics(list);
      })
      .finally(() => {
        if (!gone) setLoaded(true);
      });
    return () => {
      gone = true;
    };
  }, []);

  return (
    <>
      <p className="px-3 pt-2 text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
        Help & Support
      </p>
      {helpLinks.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          onClick={onNavigate}
          className="flex min-h-10 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
        >
          {label}
        </Link>
      ))}
      <p className="px-3 pt-3 text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">
        Blogs & Articles
      </p>
      {!loaded ? (
        <p className="px-3 py-2 text-xs text-white/55">Loading…</p>
      ) : topics.length === 0 ? (
        <p className="px-3 py-2 text-xs text-white/55">No categories yet</p>
      ) : (
        topics.map((topic) => (
          <Link
            key={topic}
            href={`/resources?topic=${encodeURIComponent(topic)}`}
            onClick={onNavigate}
            className="flex min-h-10 items-center rounded-2xl px-3 text-xs text-white/75 hover:bg-white/10"
          >
            {topic}
          </Link>
        ))
      )}
      <Link
        href="/resources"
        onClick={onNavigate}
        className="flex min-h-10 items-center rounded-2xl px-3 text-xs font-semibold text-white hover:bg-white/10"
      >
        View all articles
      </Link>
    </>
  );
}
