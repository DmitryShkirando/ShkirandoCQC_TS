import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly welcomeParagraphLocator: Locator;
  readonly hereLinkLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    // If possible remove class from locator
    this.welcomeParagraphLocator = page.locator(
      "//p[@class = 'start__paragraph'][contains(text(), 'welcome to User Inyerface')]",
    );
    this.hereLinkLocator = page.locator("//a[@href= '/game.html']");
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyMainPageLoaded() {
    await expect(this.welcomeParagraphLocator).toBeVisible();
  }

  async openFirstCard() {
    await this.hereLinkLocator.click();
  }
}
