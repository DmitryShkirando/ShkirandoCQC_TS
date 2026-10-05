import { Page, Locator, expect } from '@playwright/test';

export class ThirdCardPage {
  readonly page: Page;

  readonly thirdCardLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.thirdCardLocator = page.locator("//div[@class = 'personal-details']");
  }

  async verifyThirdCardPageIsOpened() {
    await expect(this.thirdCardLocator).toBeVisible();
  }
}
