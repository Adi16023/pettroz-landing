"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollPageToTop, scrollToIdWithRetry } from "@/lib/scroll-to-id";

function currentHashId() {
  return decodeURIComponent(window.location.hash.replace(/^#/, ""));
}

function applyRouteScroll() {
  const id = currentHashId();
  if (id) {
    scrollToIdWithRetry(id);
    return;
  }
  scrollPageToTop();
  window.setTimeout(scrollPageToTop, 50);
  window.setTimeout(scrollPageToTop, 200);
}

/**
 * Keeps route and hash navigations landing exactly where intended:
 * - new paths scroll to top (fixes mid-page landings from prior scroll)
 * - hash targets align under the sticky header, with retries for late layout
 */
export function RouteScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Defer one frame so route content (and features tab sync) can commit first.
    const frame = window.requestAnimationFrame(() => applyRouteScroll());
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    function onHashChange() {
      const id = currentHashId();
      if (id) scrollToIdWithRetry(id);
      else scrollPageToTop();
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]") as
        | HTMLAnchorElement
        | null;
      if (!anchor || anchor.target === "_blank") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.replace(/^#/, ""));
      window.setTimeout(() => {
        if (id) scrollToIdWithRetry(id);
        else scrollPageToTop();
      }, 0);
    }

    window.addEventListener("hashchange", onHashChange);
    // Capture so we read the href before mega/drawer unmount removes the link.
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
