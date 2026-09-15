import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaOverviewPage extends basePage {
  readonly whatYouWillNeedLink: Locator;

  constructor(page: Page) {
    super(page);
    this.whatYouWillNeedLink = page.getByRole('link', { name: 'What you will need', exact: true });
  }

  async expectedPageTitle(): Promise<string> {
    return 'Overview – Update address or legal representative';
  }

  async clickOnWhaYouWillNeedLink() {
    await this.click(this.whatYouWillNeedLink);
  }
}