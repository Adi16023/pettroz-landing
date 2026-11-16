"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cancelHashScroll, scrollPageToTop, scrollToIdWithRetry } from "@/lib/scroll-to-id";

function currentHashId() {
  return decodeURIComponent(window.location.hash.replace(/^#/, ""));
}

/**
 * Route/menu landings only:
 * - new paths without a hash → top of page
 * - hash links (menu) → section under the header once, then leave scrolling alone
 */
export function RouteScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const id = currentHashId();
      if (id) {
        // Cross-route entry with a hash (e.g. /pricing → /features#…).
        scrollToIdWithRetry(id);
        return;
      }
      cancelHashScroll();
      scrollPageToTop();
      window.setTimeout(scrollPageToTop, 50);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    function onHashChange() {
      const id = currentHashId();
      if (id) scrollToIdWithRetry(id);
      else {
        cancelHashScroll();
        scrollPageToTop();
      }
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

      const samePath = url.pathname === window.location.pathname;
      const id = decodeURIComponent(url.hash.replace(/^#/, ""));

      // Same-page hash (menu item): land once. Cross-page is handled by pathname effect.
      if (!samePath) return;

      window.setTimeout(() => {
        if (id) scrollToIdWithRetry(id);
        else {
          cancelHashScroll();
          scrollPageToTop();
        }
      }, 0);
    }

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
