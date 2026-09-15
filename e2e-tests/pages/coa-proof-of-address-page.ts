import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaProofOfAddressPage extends basePage {
  readonly updateYourDetailsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.updateYourDetailsLink = page.getByRole('link', { name: 'Update your details', exact: true });
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Proof of address – Update address or legal representative'
      : 'Proof of address – Update address or legal representative';
  }

  async clickOnUpdateYourDetailsLink() {
    await this.click(this.updateYourDetailsLink);
  }
}