import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const screenshotDirectory = resolve(process.cwd(), "artifacts", "screenshots");
const sourceHtml = "/Users/marklesteracak/Downloads/iAcquireOS_LandingWebsitePortfolio (1).html";

async function revealSourceContent(page: import("@playwright/test").Page) {
  const revealItems = page.locator(".reveal");
  const revealCount = await revealItems.count();
  for (let index = 0; index < revealCount; index += 1) {
    await revealItems.nth(index).scrollIntoViewIfNeeded();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(750);
}

test("before and after screenshots at desktop and mobile widths", async ({ page }) => {
  test.setTimeout(60_000);
  await mkdir(screenshotDirectory, { recursive: true });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(pathToFileURL(sourceHtml).toString());
  await expect(page.locator("body")).toBeVisible();
  await revealSourceContent(page);
  await page.screenshot({ path: resolve(screenshotDirectory, "before-desktop-fold.png"), caret: "initial" });
  await page.screenshot({ path: resolve(screenshotDirectory, "before-desktop.png"), fullPage: true, caret: "initial" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await revealSourceContent(page);
  await page.screenshot({ path: resolve(screenshotDirectory, "before-mobile-fold.png"), caret: "initial" });
  await page.screenshot({ path: resolve(screenshotDirectory, "before-mobile.png"), fullPage: true, caret: "initial" });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.screenshot({ path: resolve(screenshotDirectory, "after-desktop-fold.png"), caret: "initial" });
  await page.screenshot({ path: resolve(screenshotDirectory, "after-desktop.png"), fullPage: true, caret: "initial" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.screenshot({ path: resolve(screenshotDirectory, "after-mobile-fold.png"), caret: "initial" });
  await page.screenshot({ path: resolve(screenshotDirectory, "after-mobile.png"), fullPage: true, caret: "initial" });
});

test("page fits the requested responsive viewport widths", async ({ page }) => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      overflow: Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .map((element) => {
          const bounds = element.getBoundingClientRect();
          return {
            tag: element.tagName,
            className: typeof element.className === "string" ? element.className : "",
            text: element.textContent?.trim().slice(0, 48),
            left: Math.round(bounds.left),
            right: Math.round(bounds.right),
            width: Math.round(bounds.width),
          };
        })
        .filter((element) => element.width > 0 && (element.left < 0 || element.right > document.documentElement.clientWidth))
        .slice(0, 8),
    }));
    expect(dimensions.document, `horizontal overflow at ${width}px: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("founder portrait is a large hero image on desktop and mobile", async ({ page }) => {
  const portrait = page.locator(".hero-founder-portrait");

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(portrait).toBeVisible();
  const desktopBounds = await portrait.boundingBox();
  expect(desktopBounds?.width).toBeGreaterThan(400);
  expect(desktopBounds?.height).toBeGreaterThan(500);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const mobileBounds = await portrait.boundingBox();
  expect(mobileBounds?.width).toBeGreaterThan(320);
  expect(mobileBounds?.height).toBeGreaterThan(420);
});

test("mobile navigation opens, follows a link, and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menuButton = page.locator(".menu-toggle");
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Investment" }).click();
  await expect(page).toHaveURL(/#pricing$/);
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await menuButton.click();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("registration validates required fields and accepts an isolated mock request", async ({ page }) => {
  await page.goto("/#demo");
  const form = page.locator(".demo-form");
  await form.getByRole("button", { name: /Send me the demo link/i }).click();
  await expect(page.locator(".form-status-error")).toContainText("Check the highlighted fields");
  await expect(page.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");

  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("person@example.com");
  await page.getByLabel("Business name").fill("Example Studio");
  await page.getByLabel("Industry").selectOption("Professional services");
  const registrationResponse = page.waitForResponse((response) => response.url().includes("/api/demo/register"));
  await form.getByRole("button", { name: /Send me the demo link/i }).click();
  const response = await registrationResponse;
  expect(response.status()).toBe(202);
  const result = await response.json();
  expect(result).toMatchObject({ status: "accepted", mode: "mock" });

  await expect(page.getByRole("status")).toContainText("Form path confirmed.");
  await expect(page.getByRole("status")).toContainText("No email was sent.");
});

test("registration shows safe retry guidance when the endpoint fails", async ({ page }) => {
  await page.route("**/api/demo/register", (route) => route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({
      message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
    }),
  }));
  await page.goto("/#demo");
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("person@example.com");
  await page.getByLabel("Business name").fill("Example Studio");
  await page.getByLabel("Industry").selectOption("Professional services");
  await page.locator(".demo-form").getByRole("button", { name: /Send me the demo link/i }).click();

  await expect(page.locator(".form-status-error")).toContainText("temporarily unavailable");
  await expect(page.locator(".registration-success")).toHaveCount(0);
});

test("project filters and project detail dialog are keyboard accessible", async ({ page }) => {
  await page.goto("/#work");
  const filters = page.getByRole("group", { name: "Filter project examples" });
  await filters.getByRole("button", { name: "SaaS", exact: true }).click();
  await expect(page.locator(".portfolio-count")).toContainText("SaaS examples");
  const project = page.locator(".project-card").first();
  await expect(project).toBeVisible();
  await project.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("This project example is separate from the iAcquireOS demo.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});
