import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaCheckYourAnswersPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Check your answers – Update address or legal representative'
      : 'Check your answers – Update address or legal representative';
  }

  async completesCheckYourAnswersPage() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
  }
}