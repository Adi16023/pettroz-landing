/** Sticky header clearance for in-page anchors. */
export function getStickyHeaderOffset() {
  const bar = document.getElementById("pettroz-header-bar");
  if (!bar) return 96;
  return Math.ceil(bar.getBoundingClientRect().height) + 12;
}

function withoutSmoothScroll(run: () => void) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  run();
  html.style.scrollBehavior = previous;
}

export function scrollPageToTop() {
  withoutSmoothScroll(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

/** Scroll so `id` sits just under the sticky header. Returns false if missing. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  withoutSmoothScroll(() => {
    const top = window.scrollY + el.getBoundingClientRect().top - getStickyHeaderOffset();
    window.scrollTo(0, Math.max(0, top));
  });
  return true;
}

let activeWatch: (() => void) | null = null;

/**
 * Keep correcting scroll while layout settles (mockups, fonts, tab switches).
 * Replaces any previous hash watch so navigations don't fight each other.
 */
export function scrollToIdWithRetry(id: string, durationMs = 3200) {
  activeWatch?.();
  activeWatch = null;

  const started = performance.now();
  let frame = 0;
  let timer: number | null = null;
  let observer: ResizeObserver | null = null;

  const tick = () => {
    scrollToId(id);
  };

  const schedule = () => {
    const elapsed = performance.now() - started;
    if (elapsed >= durationMs) {
      stop();
      return;
    }
    frame += 1;
    timer = window.setTimeout(
      () => {
        tick();
        schedule();
      },
      frame < 10 ? 32 : 120,
    );
  };

  const stop = () => {
    if (timer !== null) window.clearTimeout(timer);
    observer?.disconnect();
    if (activeWatch === stop) activeWatch = null;
  };

  tick();
  schedule();

  observer = new ResizeObserver(() => {
    if (decodeURIComponent(window.location.hash.replace(/^#/, "")) !== id) {
      stop();
      return;
    }
    tick();
  });
  observer.observe(document.body);
  const target = document.getElementById(id);
  if (target) observer.observe(target);

  activeWatch = stop;
  return stop;
}
