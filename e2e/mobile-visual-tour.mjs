/**
 * Headed mobile visual tour — opens a real browser window so you can watch
 * text/layout on multiple phone sizes.
 *
 * Usage: node e2e/mobile-visual-tour.mjs
 */
import { chromium, devices } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

const PHONES = [
  { name: "iPhone SE", device: devices["iPhone SE"] },
  { name: "iPhone 13", device: devices["iPhone 13"] },
  { name: "iPhone 14 Pro Max", device: devices["iPhone 14 Pro Max"] },
  { name: "Pixel 5", device: devices["Pixel 5"] },
  { name: "Pixel 7", device: devices["Pixel 7"] },
  { name: "Galaxy S9+", device: devices["Galaxy S9+"] },
];

const PAGES = [
  "/",
  "/pricing",
  "/about",
  "/features",
  "/resources",
  "/faq",
  "/contact",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function showBadge(page, text) {
  if (page.isClosed()) return;
  await page.evaluate((label) => {
    let el = document.getElementById("__petrozz_device_badge");
    if (!el) {
      el = document.createElement("div");
      el.id = "__petrozz_device_badge";
      el.style.cssText = [
        "position:fixed",
        "top:8px",
        "left:8px",
        "z-index:2147483647",
        "background:#1a1c29",
        "color:#fff",
        "font:600 12px/1.3 system-ui,sans-serif",
        "padding:8px 12px",
        "border-radius:999px",
        "box-shadow:0 8px 24px #0006",
        "pointer-events:none",
        "max-width:calc(100vw - 24px)",
      ].join(";");
      document.body.appendChild(el);
    }
    el.textContent = label;
  }, text);
}

async function slowScroll(page) {
  if (page.isClosed()) return;
  await page.evaluate(async () => {
    const max = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
    const step = Math.max(120, Math.floor(window.innerHeight * 0.55));
    for (let y = 0; y < max; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 350));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

async function measure(page) {
  if (page.isClosed()) return null;
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const clipped = [];
    const headings = Array.from(document.querySelectorAll("h1,h2")).slice(0, 8).map((h) => {
      const r = h.getBoundingClientRect();
      const style = getComputedStyle(h);
      const overflows = r.right > vw + 1 || r.left < -1;
      return {
        text: (h.textContent || "").trim().slice(0, 60),
        fontSize: style.fontSize,
        overflows,
        right: Math.round(r.right),
      };
    });
    return {
      vw,
      sw,
      overflowPx: Math.max(0, sw - vw),
      headings,
      clipped,
    };
  });
}

const browser = await chromium.launch({
  headless: false,
  slowMo: 80,
  args: ["--window-position=80,40"],
});

let stoppedEarly = false;
browser.on("disconnected", () => {
  stoppedEarly = true;
});

console.log("\nOpening headed Chromium — watch the window on your Mac.\n");
console.log("(Close the window anytime to stop the tour.)\n");

try {
  for (const phone of PHONES) {
    if (stoppedEarly || !browser.isConnected()) break;

    const { name, device } = phone;
    const context = await browser.newContext({
      ...device,
      browserName: undefined,
    });
    const page = await context.newPage();
    await page.setViewportSize(device.viewport);

    for (const path of PAGES) {
      if (stoppedEarly || page.isClosed() || !browser.isConnected()) {
        stoppedEarly = true;
        break;
      }

      const label = `${name}  ${device.viewport.width}×${device.viewport.height}  ${path}`;
      console.log("→", label);
      try {
        await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("load");
        await sleep(400);
        await showBadge(page, label);
        await sleep(900);

        const report = await measure(page);
        if (report?.overflowPx > 1) {
          console.log(`  ⚠ horizontal overflow ${report.overflowPx}px`);
        }
        for (const h of report?.headings ?? []) {
          if (h.overflows) console.log(`  ⚠ heading spills: "${h.text}"`);
        }

        await slowScroll(page);
        await sleep(500);
      } catch (err) {
        if (stoppedEarly || page.isClosed() || !browser.isConnected()) {
          stoppedEarly = true;
          break;
        }
        throw err;
      }
    }

    await context.close().catch(() => {});
  }

  if (stoppedEarly) {
    console.log("\nTour stopped (browser closed).");
  } else {
    console.log("\nTour finished. Closing browser in 3s…");
    await sleep(3000);
    await browser.close().catch(() => {});
  }
} catch (err) {
  if (stoppedEarly || /has been closed|Target closed|Browser closed/i.test(String(err))) {
    console.log("\nTour stopped (browser closed).");
    process.exit(0);
  }
  throw err;
}
