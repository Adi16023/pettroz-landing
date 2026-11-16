"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Play, Search, X } from "lucide-react";
import {
  formatVideoDuration,
  formatVideoUploadedAt,
  type PublicVideoTutorial,
} from "@/lib/video-tutorials";
export function VideoTutorialsBrowse({ videos }: { videos: PublicVideoTutorial[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const playSlug = searchParams.get("play");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<PublicVideoTutorial | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter((video) =>
      `${video.title} ${video.provider}`.toLowerCase().includes(q),
    );
  }, [videos, query]);

  useEffect(() => {
    if (!playSlug) {
      setActive(null);
      return;
    }
    const match = videos.find((video) => video.slug === playSlug) ?? null;
    setActive(match);
  }, [playSlug, videos]);

  function openVideo(video: PublicVideoTutorial) {
    setActive(video);
    const params = new URLSearchParams(searchParams.toString());
    params.set("play", video.slug);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function closeVideo() {
    setActive(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("play");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  useEffect(() => {
    if (!active) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setActive(null);
      const params = new URLSearchParams(window.location.search);
      params.delete("play");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, pathname, router]);

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
            Video Tutorials
          </li>
        </ol>
      </nav>

      <header className="border-b border-navy/10 pb-8">
        <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-navy sm:text-5xl">
          Video Tutorials
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
            placeholder="Search tutorials"
            aria-label="Search tutorials"
            className="h-11 w-full rounded-full border border-navy/10 bg-white pr-4 pl-10 text-sm text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-primary/40"
          />
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="py-16 text-sm text-muted-foreground">No video tutorials match your search.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((video) => {
            const duration = formatVideoDuration(video.durationSeconds);
            const uploaded = formatVideoUploadedAt(video.createdAt);
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => openVideo(video)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white text-left transition-colors hover:border-primary/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-navy/5 bg-[#eceae4]">
                  {video.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={video.thumbnailUrl}
                      alt=""
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/15 transition-colors group-hover:bg-navy/25">
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_30px_-12px_#1a1c2960]">
                      <Play aria-hidden="true" className="size-5 fill-current" />
                    </span>
                  </span>
                  {duration ? (
                    <span className="absolute right-2.5 bottom-2.5 rounded-md bg-navy/85 px-2 py-0.5 text-[11px] font-semibold text-white">
                      {duration}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <p className="text-[11px] font-semibold tracking-wide text-primary uppercase">
                    {video.provider === "vimeo" ? "Vimeo" : "YouTube"}
                  </p>
                  <h2 className="mt-1.5 line-clamp-2 text-sm leading-snug font-semibold tracking-tight text-navy transition-colors group-hover:text-primary sm:text-base">
                    {video.title}
                  </h2>
                  {uploaded ? (
                    <p className="mt-auto pt-3 text-xs text-muted-foreground">{uploaded}</p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {active?.embedUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-28px_#00000080]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-navy/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy sm:text-base">{active.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground capitalize">{active.provider}</p>
              </div>
              <button
                type="button"
                onClick={closeVideo}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f4f3ef] text-navy transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Close video"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="aspect-video bg-navy">
              <iframe
                title={active.title}
                src={`${active.embedUrl}${active.embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
