import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 60_000,
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    // Chromium with iOS viewports (stable in CI); WebKit mirrors real Safari.
    {
      name: "iPhone SE",
      use: { ...devices["iPhone SE"], browserName: "chromium", isMobile: true, hasTouch: true },
    },
    {
      name: "iPhone 13",
      use: { ...devices["iPhone 13"], browserName: "chromium", isMobile: true, hasTouch: true },
    },
    {
      name: "iPhone 14 Pro Max",
      use: { ...devices["iPhone 14 Pro Max"], browserName: "chromium", isMobile: true, hasTouch: true },
    },
    { name: "Pixel 5", use: { ...devices["Pixel 5"] } },
    { name: "Pixel 7", use: { ...devices["Pixel 7"] } },
    { name: "Galaxy S9+", use: { ...devices["Galaxy S9+"] } },
    {
      name: "iPad Mini",
      use: { ...devices["iPad Mini"], browserName: "chromium", isMobile: true, hasTouch: true },
    },
    {
      name: "Safari iPhone 13",
      use: { ...devices["iPhone 13"] },
    },
  ],
});
