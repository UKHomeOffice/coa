import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export class basePage {
  readonly page: Page;
  readonly headerText: Locator;
  readonly continueButton: Locator;
  readonly confirmAndSubmitButton: Locator;
  readonly uploadContinueButton: Locator;
  readonly thereIsAProblemText: Locator;
  readonly errorSummaryList: Locator;
  readonly fileInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerText = page.locator('h1');
    this.continueButton = page.locator("input[value='Continue'], button:has-text('Continue')");
    this.confirmAndSubmitButton = page.locator("input[value='Confirm and submit'], button:has-text('Confirm and submit')");
    this.uploadContinueButton = page.locator("input[name='continueWithoutUpload'], button[name='continueWithoutUpload']");
    this.thereIsAProblemText = page.locator('#error-summary-title');
    this.errorSummaryList = page.locator('.govuk-error-summary__list');
    this.fileInput = page.locator("input[type='file']");
  }

  async assertPageTitle(page: Page, title: string) {
    await expect(page).toHaveTitle(title + ' – GOV.UK');
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async type(locator: Locator, text: string) {
    await locator.fill(text);
    await this.page.keyboard.press('Tab');
  }

  async enterById(id: string, text: string) {
    const locator = this.page.locator(`#${id}`);
    const tagName = await locator.evaluate(element => element.tagName.toLowerCase()).catch(() => '');

    if (tagName === 'select') {
      await locator.selectOption({ label: text }).catch(async () => locator.selectOption(text));
      await this.page.keyboard.press('Tab');
      return;
    }

    await this.type(locator, text);
  }

  async clickContinueButton() {
    await this.click(this.continueButton);
  }

  async selectContinueUploadBtn() {
    await this.click(this.uploadContinueButton);
  }

  async clickConfirmAndSubmit() {
    await this.click(this.confirmAndSubmitButton);
  }

  async selectRadioOptionWithText(optionText: string) {
    await this.page.getByRole('radio', { name: optionText, exact: true }).check();
  }

  async selectCheckboxOptionWithText(optionText: string) {
    await this.page.getByRole('checkbox', { name: optionText, exact: false }).check();
  }

  async getThereIsAProblemTextErrorText(): Promise<string | null> {
    return this.thereIsAProblemText.textContent();
  }

  async getErrorSummaryListText(): Promise<string | null> {
    return this.errorSummaryList.textContent();
  }

  async getFileUploadErrorMaxFileSizeText(): Promise<string | null> {
    return this.page.locator('#file-upload-error-maxFileSize').textContent();
  }

  async getFileUploadErrorFileTypeText(): Promise<string | null> {
    return this.page.locator('#file-upload-error-fileType').textContent();
  }

  convertTextToDate(dateValue: string | null): string | null {
    if (dateValue == null) return null;

    const date = dateValue.trim().toLowerCase();
    if (!date) return dateValue;

    const now = new Date();
    const formatDate = (value: Date): string => {
      const day = String(value.getDate()).padStart(2, '0');
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const year = value.getFullYear();
      return `${day}/${month}/${year}`;
    };
    const addDays = (value: Date, days: number) => {
      const newDate = new Date(value);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    };

    const dateMappings: Record<string, () => Date> = {
      "today's date": () => now,
      "tomorrow's date": () => addDays(now, 1),
      "yesterday's date": () => addDays(now, -1),
    };

    const dateFn = dateMappings[date];
    return dateFn ? formatDate(dateFn()) : dateValue;
  }

  async enterDateOrDob(inputDate: string | null) {
    if (!inputDate?.trim()) return;

    const formattedDate = this.convertTextToDate(inputDate);
    if (!formattedDate) return;

    const dateParts = formattedDate.split('/');
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format. Expected format: dd/mm/yyyy');
    }

    const [dayVal, monthVal, yearVal] = dateParts;
    await this.type(this.page.getByLabel('Day'), dayVal);
    await this.type(this.page.getByLabel('Month'), monthVal);
    await this.type(this.page.getByLabel('Year'), yearVal);
  }

  async uploadFileFromUserUploadFolder(fileName: string) {
    const uploadPath = path.resolve(__dirname, '..', 'test-data', 'user-upload-files', fileName);
    await this.fileInput.setInputFiles(uploadPath);
  }
}