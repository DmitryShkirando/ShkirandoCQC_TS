import { Page, Locator, expect } from '@playwright/test';

export class FirstCardPage {
  readonly page: Page;

  readonly firstCardLocator: Locator;
  readonly acceptCookiesButtonLocator: Locator;
  readonly cookieBannerLocator: Locator;
  readonly timerAboveCardLocator: Locator;
  readonly helpFormLocator: Locator;
  readonly sendToBottomButtonInHelperLocator: Locator;
  readonly titleTextInHelperLocator: Locator;
  readonly hiddenHelpFormLocator: Locator;
  readonly choosePaswordInputFieldLocator: Locator;
  readonly yourEmailInputFieldLocator: Locator;
  readonly domainInputFieldLocator: Locator;
  readonly domenTopLevelDropDownLocator: Locator;
  readonly netDomenTopLevelSelectedLocator: Locator;
  readonly termsAndConditionsCheckBoxLocator: Locator;
  readonly nextButtonOnFirstCardLocator: Locator;

  private initialHelpFormBox: { x: number; y: number; width: number; height: number } | null = null;

  constructor(page: Page) {
    this.page = page;

    this.firstCardLocator = page.locator("//div[@class = 'login-form']");
    this.acceptCookiesButtonLocator = page.locator("//button[contains(text(), 'Not really')]");
    this.cookieBannerLocator = page.locator("//div[@class = 'cookies']");
    this.timerAboveCardLocator = page.locator("//div[contains(@class, 'timer--white')]");

    this.helpFormLocator = page.locator("//div[@class = 'help-form']");
    this.sendToBottomButtonInHelperLocator = page.locator(
      "//button[contains(@class, 'help-form__send')]",
    );
    this.titleTextInHelperLocator = page.locator("//h2[@class = 'help-form__title']");
    this.hiddenHelpFormLocator = page.locator("//div[@class = 'help-form is-hidden']");
    this.choosePaswordInputFieldLocator = page.locator("//input[@placeholder = 'Choose Password']");
    this.yourEmailInputFieldLocator = page.locator("//input[@placeholder = 'Your email']");
    this.domainInputFieldLocator = page.locator("//input[@placeholder = 'Domain']");
    this.domenTopLevelDropDownLocator = page.locator("//div[@class = 'dropdown__opener']");
    this.netDomenTopLevelSelectedLocator = page
      .locator('.dropdown__list-item')
      .filter({ hasText: '.net' });
    this.termsAndConditionsCheckBoxLocator = page.locator("//span[contains(@class, 'icon-check')]");
    this.nextButtonOnFirstCardLocator = page.locator("//a[@class = 'button--secondary']");
  }

  async verifyFirstCardPageIsOpened() {
    await expect(this.firstCardLocator).toBeVisible();
  }

  async acceptCookies() {
    await this.acceptCookiesButtonLocator.click();
  }

  async verifyCookieBannerIsClosed() {
    await expect(this.cookieBannerLocator).not.toBeVisible();
  }

  async verifyTimerText(time: string) {
    await expect(this.timerAboveCardLocator).toBeVisible();
    await expect(this.timerAboveCardLocator).toHaveText(time);
  }

  async verifyHelpFormIsOpened() {
    await expect(this.helpFormLocator).toBeVisible();
    await expect(this.titleTextInHelperLocator).toBeVisible();
  }

  async hideHelpForm() {
    this.initialHelpFormBox = await this.helpFormLocator.boundingBox();
    expect(
      this.initialHelpFormBox,
      'Help form should be rendered and visible before hiding',
    ).not.toBeNull();
    await this.sendToBottomButtonInHelperLocator.click();
  }

  async verifyHelpFormIsHidden() {
    await expect(this.hiddenHelpFormLocator).toBeAttached();
  }

  // sdelat chetyre metoda dlya kazhdogo dejstvia
  async fillCardForm({
    password,
    email,
    domain,
  }: {
    password: string;
    email: string;
    domain: string;
  }) {
    await this.choosePaswordInputFieldLocator.fill(password);
    await this.yourEmailInputFieldLocator.fill(email);
    await this.domainInputFieldLocator.fill(domain);

    await this.domenTopLevelDropDownLocator.click();
    await this.netDomenTopLevelSelectedLocator.click();

    await this.termsAndConditionsCheckBoxLocator.click();
  }

  async clickOnNextButtonOnFirstCard() {
    await this.nextButtonOnFirstCardLocator.click();
  }
}
