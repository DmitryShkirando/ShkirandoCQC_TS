import { test } from '../fixtures/baseTest.ts';

test.describe('First card tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await test.step('Navigate to Game page and open First Card', async () => {
      await homePage.goto();
      await homePage.verifyMainPageLoaded();
      await homePage.openFirstCard();
    });
  });

  test('Cookies accept test', async ({ firstCardPage }) => {
    await test.step('Verify First Card is opened', async () => {
      await firstCardPage.verifyFirstCardPageIsOpened();
    });

    await test.step('Accept cookies and verify banner is closed', async () => {
      await firstCardPage.acceptCookies();
      await firstCardPage.verifyCookieBannerIsClosed();
    });
  });

  test('Timer starts from zero', async ({ firstCardPage }) => {
    await test.step('Verify timer starts at 00:00:00', async () => {
      await firstCardPage.verifyTimerText('00:00:00');
    });
  });

  test('Help form can be hidden', async ({ firstCardPage }) => {
    await test.step('Verify Help Form is initially open', async () => {
      await firstCardPage.verifyHelpFormIsOpened();
    });

    await test.step('Hide Help Form and verify it is hidden', async () => {
      await firstCardPage.hideHelpForm();
      await firstCardPage.verifyHelpFormIsHidden();
    });
  });
});
