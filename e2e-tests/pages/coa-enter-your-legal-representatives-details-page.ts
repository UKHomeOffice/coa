import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaEnterYourLegalRepresentativesDetailsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Enter your legal representative’s details – Update address or legal representative'
      : 'Enter your legal representative’s details – Update address or legal representative';
  }

  async completesEnterYourLegalRepresentativesDetailsPage(companyName: string, oiscOrSraNumber: string, address1: string, address2: string, townOrCity: string, county: string, postcode: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.enterById('legal-company-name', companyName);
    await this.enterById('oisc-sra-number', oiscOrSraNumber);
    await this.enterById('legal-address-line-1', address1);
    await this.enterById('legal-address-line-2', address2);
    await this.enterById('legal-address-town-or-city', townOrCity);
    await this.enterById('legal-address-county', county);
    await this.enterById('legal-address-postcode', postcode);
    await this.clickContinueButton();
  }
}