import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaUpdateSubmittedPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return 'Update submitted – Update address or legal representative';
  }

  async completeUpdateSubmittedPage() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
  }
}