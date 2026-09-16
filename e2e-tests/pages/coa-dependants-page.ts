import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaDependantsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Dependants – Update address or legal representative'
      : 'Dependants – Update address or legal representative';
  }

  async completesDependantsPage() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
  }
}