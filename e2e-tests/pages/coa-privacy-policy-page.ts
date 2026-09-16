import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaPrivacyPolicyPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Privacy policy – Update address or legal representative'
      : 'Privacy policy – Update address or legal representative';
  }

  async completesPrivacyPolicyPage() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectCheckboxOptionWithText('I confirm that I have read and understood');
    await this.clickConfirmAndSubmit();
  }
}