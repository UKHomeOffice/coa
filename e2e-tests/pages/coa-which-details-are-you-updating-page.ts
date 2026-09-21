import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaWhichDetailsAreYouUpdatingPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Which details are you updating? – Update address or legal representative'
      : 'Which details are you updating? – Update address or legal representative';
  }

  async completesWhichDetailsAreYouUpdatingPage(options: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
        const optionValueArray = options.split('¬');

    for (const optionValue of optionValueArray) {
      await this.selectCheckboxOptionWithText(optionValue.trim());
    }

    await this.clickContinueButton();
  }
}