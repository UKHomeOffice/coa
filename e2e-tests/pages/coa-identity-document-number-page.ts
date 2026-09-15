import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaIdentityDocumentNumberPage extends basePage {
    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error')
            ? 'Error: Identity document number – Update address or legal representative'
            : 'Identity document number – Update address or legal representative';
    }


    async completesIdentityDocumentNumberPage(optionValue: string, documentNo: string) {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.selectRadioOptionWithText(optionValue);

        if (optionValue === 'Passport number') {
            await this.enterById('passport-number-details', documentNo);
        } else if (optionValue === 'Biometric residence permit (BRP) number') {
            await this.enterById('brp-details', documentNo);
        } else if (optionValue === 'Application registration card number') {
            await this.enterById('arc-details', documentNo);
        }

        await this.clickContinueButton();
    }
}