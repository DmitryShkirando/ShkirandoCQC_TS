import { test } from '../fixtures/baseTest.ts';
import { dataForFirstCard } from '../test_data/firstCardData.ts';
import { dataForThirdCard } from '../test_data/thirdCardData.ts';

test.describe('Third card tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await test.step('Navigate to Game page and open First Card', async () => {
      await homePage.goto();
      await homePage.verifyMainPageLoaded();
      await homePage.openFirstCard();
    });
  });

  test('Third card is opened after first and second', async ({
    firstCardPage,
    secondCardPage,
    thirdCardPage,
  }) => {
    await test.step('Fill First Card form and proceed to Second Card', async () => {
      const { password, email, domain } = dataForFirstCard;
      await firstCardPage.fillCardForm({ password, email, domain });
      await firstCardPage.clickOnNextButtonOnFirstCard();
    });

    await test.step('Fill Second Card form (Interests & Avatar) and proceed', async () => {
      await secondCardPage.verifySecondCardPageIsOpened();
      await secondCardPage.selectRandomInterests();
      await secondCardPage.uploadAvatarAndVerify(dataForThirdCard.avatarIconPath);
      await secondCardPage.clickNextButtonOnSecondCard();
    });

    await test.step('Verify Third Card is successfully opened', async () => {
      await thirdCardPage.verifyThirdCardPageIsOpened();
    });
  });
});
