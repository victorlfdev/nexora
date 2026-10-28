import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("renders the full page without client errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("WE BUILD WHAT");
  await expect(page.locator("#contact")).toBeAttached();
  await expect(page.getByRole("contentinfo")).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
  expect(errors).toEqual([]);
});

test("services expand and collapse using the keyboard", async ({ page }) => {
  await page.goto("/");
  const service = page.locator("#services details").first();
  const control = service.locator("summary");
  await control.focus();
  await page.keyboard.press("Enter");
  await expect(service).toHaveAttribute("open", "");
  await expect(service.getByText("SaaS platforms, internal systems, web applications")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(service).not.toHaveAttribute("open", "");
});

test("main navigation reaches services and all fragment links have targets", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Services", exact: true }).click();
  await expect(page.locator("#services-heading")).toBeInViewport();
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!).filter((href) => href === "#" || !document.getElementById(href.slice(1))),
  );
  expect(missingTargets).toEqual([]);
});

test("reduced motion shows all five process steps with no pinned sections", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const title of ["DISCOVER", "DEFINE", "DESIGN", "BUILD", "LAUNCH"]) {
    await expect(page.locator("#process").getByRole("heading", { name: title, exact: true })).toBeVisible();
  }
  await expect(page.locator(".particle-layer canvas")).toHaveCount(0);
  await expect(page.locator(".tech-orbit")).toHaveCSS("animation-name", "none");
  await expect(page.locator("#work article")).toHaveCount(3);
});

test("static sections fit the viewport", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const id of ["services", "process", "work", "technology", "contact"]) {
    const bounds = await page.locator(`#${id}`).boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  }
});

test("page remains usable without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#process .scene")).toHaveCount(5);
  await expect(page.locator("#process").getByRole("heading", { name: "LAUNCH", exact: true })).toBeVisible();
  const service = page.locator("#services details").first();
  await service.locator("summary").click();
  await expect(service).toHaveAttribute("open", "");
  await expect(service.locator("p")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test("motion preference changes clean up and restore animations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop animation lifecycle");
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(4);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("#process .scene").last()).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".pin-spacer")).toHaveCount(4);
});

test("resizing from desktop to mobile restores the readable layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop to mobile breakpoint");
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(4);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("#process .scene").last()).toHaveCSS("visibility", "visible");
  await expect(page.locator("#work article").last()).toHaveCSS("position", "static");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".pin-spacer")).toHaveCount(4);
  expect(errors).toEqual([]);
});

test("deep links reach the portfolio after hydration", async ({ page }) => {
  await page.goto("/#work");
  await expect(page.locator("#work-heading")).toBeInViewport();
});

test("hero restores its original state when scrolling back", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop scroll timeline");
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(4);
  await page.evaluate(() => window.scrollTo(0, innerHeight * 0.5));
  await expect.poll(() => page.locator(".hero-copy").evaluate((element) => Number(getComputedStyle(element).opacity))).toBeLessThan(0.9);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
});

test("small screens keep the title and navigation inside the viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Small mobile breakpoint");
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  const title = await page.locator("h1").boundingBox();
  const header = await page.getByRole("banner").boundingBox();
  expect(title!.x).toBeGreaterThanOrEqual(0);
  expect(title!.x + title!.width).toBeLessThanOrEqual(320);
  expect(header!.y + header!.height).toBeLessThan(title!.y);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test("has no automated WCAG A or AA accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#services details").first().locator("summary").click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});
