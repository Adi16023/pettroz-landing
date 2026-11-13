"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import { ArrowRight, Check, Clock3, FileText, Fuel, Pause, Play, RotateCcw, Wallet } from "lucide-react";

export function WorkflowPlayer({ product }: { product: "pump" | "attendance" }) {
  const container = useRef<HTMLDivElement>(null);
  const animationHost = useRef<HTMLDivElement>(null);
  const animation = useRef<AnimationItem | null>(null);
  const finished = useRef(false);
  const manuallyPaused = useRef(false);
  const [status, setStatus] = useState<"loading" | "playing" | "paused" | "complete" | "static" | "error">("loading");

  useEffect(() => {
    const element = container.current;
    const host = animationHost.current;
    if (!element || !host) return;
    const animationContainer = host;
    const controller = new AbortController();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let inView = false;
    let started = false;
    let failed = false;

    function syncPlayback() {
      const item = animation.current;
      if (!item || failed) return;
      if (media.matches) {
        item.goToAndStop(119, true);
        setStatus("static");
      } else if (inView && !document.hidden && !finished.current && !manuallyPaused.current) {
        item.play();
        setStatus("playing");
      } else {
        item.pause();
        setStatus(finished.current ? "complete" : "paused");
      }
    }

    async function load() {
      if (started || media.matches) {
        if (media.matches) setStatus("static");
        return;
      }
      started = true;
      try {
        const [lottie, response] = await Promise.all([
          import("lottie-web"),
          fetch(`/animations/${product}-workflow.json`, { signal: controller.signal }),
        ]);
        if (!response.ok) throw new Error(`Animation request failed (${response.status})`);
        const data = await response.json();
        if (disposed) return;
        const item = lottie.default.loadAnimation({
          container: animationContainer,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: data,
          rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
        });
        animation.current = item;
        item.addEventListener("DOMLoaded", syncPlayback);
        item.addEventListener("complete", () => {
          finished.current = true;
          setStatus("complete");
        });
        function reportRenderError() {
          failed = true;
          item.pause();
          console.error("Petrozz workflow animation could not be rendered", product);
          setStatus("error");
        }
        item.addEventListener("data_failed", reportRenderError);
        item.addEventListener("error", reportRenderError);
      } catch (error) {
        if (disposed || controller.signal.aborted) return;
        console.error("Petrozz workflow animation could not be loaded", error);
        setStatus("error");
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) void load();
      syncPlayback();
    }, { threshold: 0.15 });
    const onPreferenceChange = () => {
      if (!media.matches && inView) void load();
      else if (media.matches && !animation.current) setStatus("static");
      syncPlayback();
    };
    observer.observe(element);
    media.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      disposed = true;
      controller.abort();
      observer.disconnect();
      media.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", syncPlayback);
      animation.current?.destroy();
      animation.current = null;
    };
  }, [product]);

  const showPoster = status === "loading" || status === "static" || status === "error";
  const icons = [product === "pump" ? Fuel : Clock3, FileText, Check, Wallet];

  function toggle() {
    const item = animation.current;
    if (!item) return;
    if (status === "complete") {
      finished.current = false;
      manuallyPaused.current = false;
      item.goToAndPlay(0, true);
      setStatus("playing");
    } else if (status === "playing") {
      manuallyPaused.current = true;
      item.pause();
      setStatus("paused");
    } else {
      manuallyPaused.current = false;
      item.play();
      setStatus("playing");
    }
  }

  return (
    <div ref={container}>
      <div className="relative aspect-[3/1]" aria-hidden="true">
        <div ref={animationHost} className={`absolute inset-0 ${showPoster ? "invisible" : ""}`} />
        {showPoster && <div className="absolute inset-0 flex items-center justify-around">
          {icons.map((Icon, i) => <div key={i} className="flex items-center gap-2 sm:gap-5"><span className="grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/5 text-[#f29180] sm:size-20"><Icon className="size-5 sm:size-8" /></span>{i < 3 && <ArrowRight className="size-3 text-white/20 sm:size-5" />}</div>)}
        </div>}
      </div>
      <div className="flex min-h-11 items-center justify-end">
        {status === "static" ? <p className="text-[10px] text-white/50">Static view · reduced motion</p> : status === "error" ? <p role="status" className="text-[10px] text-white/60">Animation unavailable. The workflow is explained below.</p> : <button type="button" onClick={toggle} disabled={status === "loading"} className="flex min-h-11 items-center gap-2 rounded-full px-3 text-[11px] text-white/65 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50">
          {status === "playing" ? <Pause className="size-3" /> : status === "complete" ? <RotateCcw className="size-3" /> : <Play className="size-3" />}
          {status === "playing" ? "Pause animation" : status === "complete" ? "Replay animation" : status === "loading" ? "Loading animation" : "Play animation"}
        </button>}
      </div>
    </div>
  );
}
