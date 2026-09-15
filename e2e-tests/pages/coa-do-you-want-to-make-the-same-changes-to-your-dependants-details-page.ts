import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? "Error: Do you want to make the same changes to your dependant's details – Update address or legal representative"
      : "Do you want to make the same changes to your dependant's details – Update address or legal representative";
  }

  async completesDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage(optionValue: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOptionWithText(optionValue);
    await this.clickContinueButton();
  }
}