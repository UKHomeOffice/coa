import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaWhatIsYourNewHomeAddressPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    if (title.startsWith("Error: What is the applicant's")) {
      return "Error: What is the applicant's new home address? – Update address or legal representative";
    }

    if (title.startsWith('Error: What is your')) {
      return 'Error: What is your new home address? – Update address or legal representative';
    }

    if (title.startsWith("What is the applicant's")) {
      return "What is the applicant's new home address? – Update address or legal representative";
    }

    return 'What is your new home address? – Update address or legal representative';
  }


  async completesWhatIsYourNewHomeAddressPage(address1: string, address2: string, townOrCity: string, county: string, postcode: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.enterById('home-address-line-1', address1);
    await this.enterById('home-address-line-2', address2);
    await this.enterById('home-address-town-or-city', townOrCity);
    await this.enterById('home-address-county', county);
    await this.enterById('home-address-postcode', postcode);
    await this.clickContinueButton();
  }
}