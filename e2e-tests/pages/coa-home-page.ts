import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class coaHomePage extends basePage {
    readonly acceptCookieButton: Locator;
    readonly hideThisMessageButton: Locator;

    constructor(page: Page) {
        super(page);
        this.acceptCookieButton = page.locator('#accept-cookies-button');
        this.hideThisMessageButton = page.locator('#hide-accept-cookie-banner');
    }

    async expectedPageTitle(): Promise<string> {
        return 'Overview – Update address or legal representative';
    }

    async openCoaHomePage() {
        await this.page.goto('/');
    }

    async acceptCookies() {
        if (await this.acceptCookieButton.isVisible()) await this.click(this.acceptCookieButton);
        if (await this.hideThisMessageButton.isVisible()) await this.click(this.hideThisMessageButton);
    }

    async openCOA() {
        await this.openCoaHomePage();
        await this.assertPageTitle(this.page, await this.expectedPageTitle());
        await this.acceptCookies();
    }
}