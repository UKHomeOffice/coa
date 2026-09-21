import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaApplicantDetailsPage extends basePage {
  readonly fullNameField: Locator;
  readonly countryOfNationalityField: Locator;
  readonly uniqueApplicationNumberField: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameField = page.locator('#applicant-full-name');
    this.countryOfNationalityField = page.locator('#applicant-nationality');
    this.uniqueApplicationNumberField = page.locator('#applicant-unique-number');
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Applicant details – Update address or legal representative'
      : 'Applicant details – Update address or legal representative';
  }

  async completesApplicantDetailsPage(fullName: string, dob: string, countryOfNationality: string, uniqueApplicationNumber: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.fullNameField, fullName);
    await this.enterDateOrDob(dob);
    await this.enterById('applicant-nationality', countryOfNationality);
    await this.type(this.uniqueApplicationNumberField, uniqueApplicationNumber);
    await this.clickContinueButton();
  }
}