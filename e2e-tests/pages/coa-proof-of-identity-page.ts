import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaProofOfIdentityPage extends basePage {
  readonly proofOfAddressLink: Locator;

  constructor(page: Page) {
    super(page);
    this.proofOfAddressLink = page.getByRole('link', { name: 'Proof of Address', exact: true });
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Proof of identity – Update address or legal representative'
      : 'Proof of identity – Update address or legal representative';
  }

  async clickOnProofOfAddressLink() {
    await this.click(this.proofOfAddressLink);
  }
}