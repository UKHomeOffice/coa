import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaWhoAreYouPage extends basePage {
    readonly legalRepresentativeNameField: Locator;
    readonly someoneElseNameField: Locator;

    constructor(page: Page) {
        super(page);
        this.legalRepresentativeNameField = page.locator('#legal-representative-name');
        this.someoneElseNameField = page.locator('#someone-else-name');
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error')
            ? 'Error: Who are you? – Update address or legal representative'
            : 'Who are you? – Update address or legal representative';
    }

    async completesWhoAreYouPage(whoAreYouType: string, fullName: string) {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());

        if (whoAreYouType === 'The applicant') {
            await this.selectRadioOptionWithText('HOF TEST');
        } else if (whoAreYouType === 'The legal representative') {
            await this.selectRadioOptionWithText('HOF TEST’s legal representative');
            await this.type(this.legalRepresentativeNameField, fullName);
        } else if (whoAreYouType === 'Someone else') {
            await this.selectRadioOptionWithText('Someone else');
            await this.type(this.someoneElseNameField, fullName);
        } else {
            throw new Error(`Failed: Wrong radio value: ${whoAreYouType}`);
        }

        await this.clickContinueButton();
    }
}