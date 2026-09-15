import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaUploadProofOfPostalAddressPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return 'Upload proof of address – Update address or legal representative';
  }

  async completesUploadProofOfAddressPage(fileName: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.uploadFileFromUserUploadFolder(fileName);
    await this.selectContinueUploadBtn();
  }
}