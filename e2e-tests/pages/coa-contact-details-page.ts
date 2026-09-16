import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaContactDetailsPage extends basePage {
  readonly emailField: Locator;
  readonly telephoneField: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.locator('#email');
    this.telephoneField = page.locator('#telephone');
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Contact details – Update address or legal representative'
      : 'Contact details – Update address or legal representative';
  }

  async completesContactDetailsPage(emailAddress: string, telephoneNo: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.emailField, emailAddress);
    await this.type(this.telephoneField, telephoneNo);
    await this.clickContinueButton();
  }
}