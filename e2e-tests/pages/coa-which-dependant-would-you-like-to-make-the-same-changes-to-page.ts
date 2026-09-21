import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage extends basePage {
  readonly fullNameField: Locator;
  readonly countryOfNationalityField: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameField = page.locator('#dependant-full-name');
    this.countryOfNationalityField = page.locator('#dependant-country-of-nationality');
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Which dependant would you like to make the same changes to? – Update address or legal representative'
      : 'Which dependant would you like to make the same changes to? – Update address or legal representative';
  }

  async completesWhichDependantWouldYouLikeToMakeTheSameChangesToPage(fullName: string, dob: string, countryOfNationality: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.fullNameField, fullName);
    await this.enterDateOrDob(dob);
    await this.enterById('dependant-country-of-nationality', countryOfNationality);
    await this.clickContinueButton();
  }
}