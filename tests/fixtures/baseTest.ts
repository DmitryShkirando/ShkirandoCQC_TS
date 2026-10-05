import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage.js';
import { FirstCardPage } from '../pages/firstCardPage.js';
import { SecondCardPage } from '../pages/secondCardPage.js';
import { ThirdCardPage } from '../pages/thirdCardPage.js';

type MyFixtures = {
  homePage: HomePage;
  firstCardPage: FirstCardPage;
  secondCardPage: SecondCardPage;
  thirdCardPage: ThirdCardPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  firstCardPage: async ({ page }, use) => {
    const firstCardPage = new FirstCardPage(page);
    await use(firstCardPage);
  },

  secondCardPage: async ({ page }, use) => {
    const secondCardPage = new SecondCardPage(page);
    await use(secondCardPage);
  },

  thirdCardPage: async ({ page }, use) => {
    const thirdCardPage = new ThirdCardPage(page);
    await use(thirdCardPage);
  },
});

export { expect } from '@playwright/test';
