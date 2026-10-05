import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';
import fs from 'fs';

export class SecondCardPage {
  readonly page: Page;

  readonly secondCardLocator: Locator;
  readonly unselectAllCheckboxLocator: Locator;
  readonly allInterestsLabelsLocator: Locator;
  readonly uploadAvatarButtonLocator: Locator;
  readonly nextButtonOnTheSecondCardLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.secondCardLocator = page.locator("//div[@class = 'avatar-and-interests']");
    this.unselectAllCheckboxLocator = page.locator("//label[@for = 'interest_unselectall']");
    this.allInterestsLabelsLocator = page.locator(
      "//div[contains(@class, 'avatar-and-interests')]//label[not(@for='interest_unselectall') and not(@for='interest_selectall')]",
    );
    this.uploadAvatarButtonLocator = page.locator("//a[contains(@class, 'upload-button')]");
    this.nextButtonOnTheSecondCardLocator = page.locator("//button[text() = 'Next']");
  }

  async verifySecondCardPageIsOpened() {
    await expect(this.secondCardLocator).toBeVisible();
  }

  async selectRandomInterests(count: number = 3) {
    await this.unselectAllCheckboxLocator.click();

    const totalInterests = await this.allInterestsLabelsLocator.count();
    expect(totalInterests, 'Quantity should be >= 3').toBeGreaterThanOrEqual(count);

    const randomIndexes = new Set<number>();
    while (randomIndexes.size < count) {
      const randomIndex = Math.floor(Math.random() * totalInterests);
      randomIndexes.add(randomIndex);
    }

    for (const index of randomIndexes) {
      await this.allInterestsLabelsLocator.nth(index).click();
    }
  }

  async uploadAvatarAndVerify(relativeFilePath: string) {
    const filePath = path.resolve(process.cwd(), relativeFilePath);
    expect(fs.existsSync(filePath), `Cannot find avatar file with path: ${filePath}`);

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadAvatarButtonLocator.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async clickNextButtonOnSecondCard() {
    await this.nextButtonOnTheSecondCardLocator.click();
  }
}
