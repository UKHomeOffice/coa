import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaContactDetailsLegalRepresentativePage extends basePage {
  readonly emailField: Locator;
  readonly telephoneField: Locator;
  readonly clientEmailField: Locator;
  readonly clientTelephoneField: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.locator('#email');
    this.telephoneField = page.locator('#legal-representative-telephone');
    this.clientEmailField = page.locator('#client-email');
    this.clientTelephoneField = page.locator('#client-telephone');
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Contact details – Update address or legal representative'
      : 'Contact details – Update address or legal representative';
  }


  async completesContactDetailsLegalRepresentativePage(emailAddress: string, telephoneNo: string, clientEmailAddress: string, clientTelephoneNo: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.emailField, emailAddress);
    await this.type(this.telephoneField, telephoneNo);
    await this.type(this.clientEmailField, clientEmailAddress);
    await this.type(this.clientTelephoneField, clientTelephoneNo);
    await this.clickContinueButton();
  }
}