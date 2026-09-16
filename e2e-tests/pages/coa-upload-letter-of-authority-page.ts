import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class coaUploadLetterOfAuthorityPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()).startsWith('Error')
      ? 'Error: Upload letter of authority – Update address or legal representative'
      : 'Upload letter of authority – Update address or legal representative';
  }

  async completesUploadLetterOfAuthority(fileName: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.uploadFileFromUserUploadFolder(fileName);
    await this.selectContinueUploadBtn();
  }
}