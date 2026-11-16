import { expect, test, type Page } from "@playwright/test";

const PAGES = [
  "/",
  "/pricing",
  "/about",
  "/contact",
  "/features",
  "/solutions",
  "/resources",
  "/faq",
  "/help-centre",
  "/video-tutorials",
  "/book-demo",
  "/products/petrol-pump-management",
] as const;

type OverflowReport = {
  viewportWidth: number;
  documentScrollWidth: number;
  bodyScrollWidth: number;
  canDragHorizontally: boolean;
  overflowAmount: number;
  offenders: { tag: string; id: string; className: string; right: number; width: number }[];
};

async function measureOverflow(page: Page): Promise<OverflowReport> {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const viewportWidth = window.innerWidth;
    const documentScrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const bodyScrollWidth = body.scrollWidth;
    const overflowAmount = Math.max(0, documentScrollWidth - viewportWidth);

    const offenders: OverflowReport["offenders"] = [];
    const nodes = Array.from(document.querySelectorAll("body *")) as HTMLElement[];
    for (const el of nodes) {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (style.position === "fixed") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      // Allow 1px subpixel slack
      if (rect.right > viewportWidth + 1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || "",
          className: typeof el.className === "string" ? el.className.slice(0, 160) : "",
          right: Math.round(rect.right * 10) / 10,
          width: Math.round(rect.width * 10) / 10,
        });
      }
    }

    offenders.sort((a, b) => b.right - a.right);

    return {
      viewportWidth,
      documentScrollWidth,
      bodyScrollWidth,
      canDragHorizontally: overflowAmount > 1,
      overflowAmount,
      offenders: offenders.slice(0, 12),
    };
  });
}

async function tryHorizontalDrag(page: Page) {
  const before = await page.evaluate(() => window.scrollX);
  const box = page.viewportSize();
  if (!box) return { before, after: before, moved: 0 };

  await page.mouse.move(box.width * 0.8, box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.width * 0.2, box.height * 0.5, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(150);

  const after = await page.evaluate(() => window.scrollX);
  return { before, after, moved: Math.abs(after - before) };
}

for (const path of PAGES) {
  test.describe(`mobile clarity ${path}`, () => {
    test(`no horizontal drag/overflow on ${path}`, async ({ page }, testInfo) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("load");
      await page.waitForTimeout(500);

      // Scroll through page so lazy/layout sections paint
      await page.evaluate(async () => {
        const step = Math.max(200, Math.floor(window.innerHeight * 0.7));
        const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        for (let y = 0; y < max; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(200);

      const report = await measureOverflow(page);
      const drag = await tryHorizontalDrag(page);

      await testInfo.attach("overflow-report", {
        body: JSON.stringify({ project: testInfo.project.name, path, report, drag }, null, 2),
        contentType: "application/json",
      });

      expect(
        report.canDragHorizontally,
        [
          `${testInfo.project.name} ${path}: horizontal overflow ${report.overflowAmount}px`,
          `viewport=${report.viewportWidth} scrollWidth=${report.documentScrollWidth}`,
          `top offenders: ${report.offenders
            .slice(0, 5)
            .map((o) => `<${o.tag}${o.id ? "#" + o.id : ""} class="${o.className}" right=${o.right}>`)
            .join(" | ") || "(none)"}`,
        ].join("\n"),
      ).toBe(false);

      expect(
        drag.moved,
        `${testInfo.project.name} ${path}: horizontal drag moved scrollX by ${drag.moved}px`,
      ).toBeLessThanOrEqual(1);

      // Key content should remain visible in the first viewport
      const main = page.locator("#main-content");
      await expect(main).toBeVisible();
      const mainBox = await main.boundingBox();
      expect(mainBox, "main content should have a box").not.toBeNull();
      if (mainBox) {
        expect(mainBox.x).toBeGreaterThanOrEqual(-1);
        expect(mainBox.width).toBeLessThanOrEqual((page.viewportSize()?.width ?? 0) + 2);
      }
    });
  });
}
