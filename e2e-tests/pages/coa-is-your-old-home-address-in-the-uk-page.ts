import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaIsYourOldHomeAddressInTheUKPage extends basePage {
  readonly postcodeField: Locator;

  constructor(page: Page) {
    super(page);
    this.postcodeField = page.locator('#old-postcode');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    if (title.startsWith("Error: Is the applicant's")) {
      return "Error: Is the applicant's old home address in the UK? – Update address or legal representative";
    }

    if (title.startsWith('Error: Is your')) {
      return 'Error: Is your old home address in the UK? – Update address or legal representative';
    }

    if (title.startsWith("Is the applicant's")) {
      return "Is the applicant's old home address in the UK? – Update address or legal representative";
    }

    return 'Is your old home address in the UK? – Update address or legal representative';
  }

  
  async completesIsYourOldHomeAddressInTheUkPage(optionValue: string, postCode: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectRadioOptionWithText(optionValue);
    if (optionValue === 'Yes') await this.type(this.postcodeField, postCode);
    await this.clickContinueButton();
  }
}