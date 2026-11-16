/** Sticky / fixed header clearance for in-page anchors. */
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

/** Cancel any in-flight hash landing so normal page scrolling is never fought. */
export function cancelHashScroll() {
  activeWatch?.();
  activeWatch = null;
}

/**
 * Land on a hash target after menu/route navigation.
 * Retries briefly while layout settles, then stops — and aborts immediately
 * if the user scrolls, so the page feels normal afterward.
 */
export function scrollToIdWithRetry(id: string, durationMs = 900) {
  cancelHashScroll();

  const started = performance.now();
  let frame = 0;
  let timer: number | null = null;
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    if (timer !== null) window.clearTimeout(timer);
    window.removeEventListener("wheel", stop, true);
    window.removeEventListener("touchstart", stop, true);
    window.removeEventListener("pointerdown", stop, true);
    window.removeEventListener("keydown", onKeyDown, true);
    if (activeWatch === stop) activeWatch = null;
  };

  function onKeyDown(event: KeyboardEvent) {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "PageUp" ||
      event.key === "PageDown" ||
      event.key === "Home" ||
      event.key === "End" ||
      event.key === " "
    ) {
      stop();
    }
  }

  const schedule = () => {
    if (stopped) return;
    const elapsed = performance.now() - started;
    if (elapsed >= durationMs) {
      stop();
      return;
    }
    frame += 1;
    timer = window.setTimeout(
      () => {
        if (stopped) return;
        scrollToId(id);
        schedule();
      },
      frame < 8 ? 40 : 80,
    );
  };

  window.addEventListener("wheel", stop, { capture: true, passive: true });
  window.addEventListener("touchstart", stop, { capture: true, passive: true });
  window.addEventListener("pointerdown", stop, { capture: true, passive: true });
  window.addEventListener("keydown", onKeyDown, true);

  scrollToId(id);
  schedule();
  activeWatch = stop;
  return stop;
}
