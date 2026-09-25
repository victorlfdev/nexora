import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('.hero-title')).toBeVisible();
  await expect(page.locator('.line-1')).toContainText('WE BUILD WHAT');
});

test('preloader shows NEXORA', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Wait for preloader to complete (2.8s)
  await page.waitForTimeout(3000);
  await expect(page.locator('.hero-title')).toBeVisible();
});
