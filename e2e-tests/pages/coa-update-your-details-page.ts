import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaUpdateYourDetailsPage extends basePage {
    readonly startNowLink: Locator;

    constructor(page: Page) {
        super(page);
        this.startNowLink = page.getByRole('button', { name: 'Start now' }).or(page.getByRole('link', { name: 'Start now' }));
    }

    async expectedPageTitle(): Promise<string> {
        return (await this.page.title()).startsWith('Error')
            ? 'Error: Update your details – Update address or legal representative'
            : 'Update your details – Update address or legal representative';
    }

    async completesUpdateYourDetailsPagePage() {
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.click(this.startNowLink);
    }
}