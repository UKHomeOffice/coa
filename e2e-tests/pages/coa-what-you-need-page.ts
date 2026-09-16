import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaWhatYouNeedPage extends basePage {
  readonly proofOfIdentityLink: Locator;

  constructor(page: Page) {
    super(page);
    this.proofOfIdentityLink = page.getByRole('link', { name: 'Proof of Identity', exact: true });
  }

  async expectedPageTitle(): Promise<string> {
    return 'What you need – Update address or legal representative';
  }

  async clickOnProofOfIdentityLink() {
    await this.click(this.proofOfIdentityLink);
  }
}