import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaWhatIsYourNewPostalAddressPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: What is your new postal address? – Update address or legal representative'
      : 'What is your new postal address? – Update address or legal representative';
  }

  async completesWhatIsYourNewPostalAddressPage(address1: string, address2: string, townOrCity: string, county: string, postcode: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.enterById('postal-address-line-1', address1);
    await this.enterById('postal-address-line-2', address2);
    await this.enterById('postal-address-town-or-city', townOrCity);
    await this.enterById('postal-address-county', county);
    await this.enterById('postal-address-postcode', postcode);
    await this.clickContinueButton();
  }
}