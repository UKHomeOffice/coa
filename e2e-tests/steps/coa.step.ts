import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { DataTable } from '@cucumber/cucumber';
import { test, Pages } from '../fixture/fixtures';
import { ConstantsLib as c, } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

Given('I visit the Change of Address page', async ({ pages }) => {
    await pages.coaHomePage.openCOA();
});

When('I go through the starter pages', async ({ pages }) => {
    await pages.coaOverviewPage.assertPageTitle(pages.coaOverviewPage.page, await pages.coaOverviewPage.expectedPageTitle());
    await pages.coaOverviewPage.clickOnWhatYouWillNeedLink();
    await pages.coaWhatYouNeedPage.assertPageTitle(pages.coaWhatYouNeedPage.page, await pages.coaWhatYouNeedPage.expectedPageTitle());
    await pages.coaWhatYouNeedPage.clickOnProofOfIdentityLink();
    await pages.coaProofOfIdentityPage.assertPageTitle(pages.coaProofOfIdentityPage.page, await pages.coaProofOfIdentityPage.expectedPageTitle());
    await pages.coaProofOfIdentityPage.clickOnProofOfAddressLink();
    await pages.coaProofOfAddressPage.assertPageTitle(pages.coaProofOfAddressPage.page, await pages.coaProofOfAddressPage.expectedPageTitle());
});

When('I fill out the answers to change of address form pertaining to {string} happy path test', async ({ pages }, scenario: string) => {
    await pages.coaProofOfAddressPage.clickOnUpdateYourDetailsLink();

    switch (scenario.toLowerCase()) {
        case 't1: applicant who needs to change their address':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '1234-1234-1234-1234/00');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The applicant', '');
            await pages.coaContactDetailsPage.completesContactDetailsPage(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('Passport number', '1208297A');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Home address');
            await pages.coaIsYourOldHomeAddressInTheUKPage.completesIsYourOldHomeAddressInTheUkPage(c.RESPONSE_YES, 'M12 2SA');
            await pages.coaWhatIsYourNewHomeAddressPage.completesWhatIsYourNewHomeAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadProofOfAddressPage.completesUploadProofOfAddressPage('applicantAddress.png');
            await pages.coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage.completesDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage(c.RESPONSE_YES);
            await pages.coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage.completesWhichDependantWouldYouLikeToMakeTheSameChangesToPage(c.FULL_NAME, c.DOB_11_11_1988, c.COUNTRY_OF_NATIONALITY);
            await pages.coaDependantsPage.completesDependantsPage();
            break;

        case "t2: legal representative who needs to change the address of person they're representing":
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '1234-1234-1234-1234/00');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The legal representative', c.FULL_NAME);
            await pages.coaContactDetailsLegalRepresentativePage.completesContactDetailsLegalRepresentativePage(c.SAS_HOF_EMAIL, c.TELEPHONE, c.AGENT_EMAIL, c.CONTACT_TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('Biometric residence permit (BRP) number', 'ZU1234567');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Home address');
            await pages.coaIsYourOldHomeAddressInTheUKPage.completesIsYourOldHomeAddressInTheUkPage(c.RESPONSE_YES, 'M12 2SA');
            await pages.coaWhatIsYourNewHomeAddressPage.completesWhatIsYourNewHomeAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadProofOfAddressPage.completesUploadProofOfAddressPage('applicantAddress.png');
            await pages.coaUploadLetterOfAuthorityPage.completesUploadLetterOfAuthority('letterOfAuthority.png');
            break;

        case 't3: someone else who needs to change the address of a person':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '1234-1234-1234-1234/00');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('Someone else', c.FULL_NAME);
            await pages.coaContactDetailsPage.completesContactDetailsPage(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('Application registration card number', 'ZU1234567');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Home address');
            await pages.coaIsYourOldHomeAddressInTheUKPage.completesIsYourOldHomeAddressInTheUkPage(c.RESPONSE_YES, 'M12 2SA');
            await pages.coaWhatIsYourNewHomeAddressPage.completesWhatIsYourNewHomeAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadProofOfAddressPage.completesUploadProofOfAddressPage('applicantAddress.png');
            break;

        case 't4: applicant who needs to change their postal address':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '1234-1234-1234-1234/00');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The applicant', '');
            await pages.coaContactDetailsPage.completesContactDetailsPage(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('Passport number', '1208297A');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Postal address');
            await pages.coaWhatIsYourNewPostalAddressPage.completesWhatIsYourNewPostalAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadProofOfAddressPage.completesUploadProofOfAddressPage('postalAddress.jpg');
            await pages.coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage.completesDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage(c.RESPONSE_NO);
            break;

        case 't5: applicant who needs to change their address':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '1234-1234-1234-1234/00');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The applicant', '');
            await pages.coaContactDetailsPage.completesContactDetailsPage(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('None of these', '');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Home address');
            await pages.coaIsYourOldHomeAddressInTheUKPage.completesIsYourOldHomeAddressInTheUkPage(c.RESPONSE_NO, '');
            await pages.coaWhatIsYourNewHomeAddressPage.completesWhatIsYourNewHomeAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadProofOfAddressPage.completesUploadProofOfAddressPage('applicantAddress.png');
            await pages.coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage.completesDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage(c.RESPONSE_NO);
            break;

        case 't6: legal representative who needs to change the address of a person and their own':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The legal representative', c.FULL_NAME);
            await pages.coaContactDetailsLegalRepresentativePage.completesContactDetailsLegalRepresentativePage(c.SAS_HOF_EMAIL, c.TELEPHONE, c.AGENT_EMAIL, c.CONTACT_TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('Passport number', '1208297A');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Home address ¬ Legal representative');
            await pages.coaIsYourOldHomeAddressInTheUKPage.completesIsYourOldHomeAddressInTheUkPage(c.RESPONSE_NO, '');
            await pages.coaWhatIsYourNewHomeAddressPage.completesWhatIsYourNewHomeAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadProofOfAddressPage.completesUploadProofOfAddressPage('applicantAddress.png');
            await pages.coaEnterYourLegalRepresentativesDetailsPage.completesEnterYourLegalRepresentativesDetailsPage(c.COMPANY_NAME, 'F123456789', c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadLetterOfAuthorityPage.completesUploadLetterOfAuthority('letterOfAuthority.png');
            break;

        case 't7: legal representative who needs to change their own address':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The legal representative', c.FULL_NAME);
            await pages.coaContactDetailsLegalRepresentativePage.completesContactDetailsLegalRepresentativePage(c.SAS_HOF_EMAIL, c.TELEPHONE, c.AGENT_EMAIL, c.CONTACT_TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('Passport number', '1208297A');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Legal representative');
            await pages.coaEnterYourLegalRepresentativesDetailsPage.completesEnterYourLegalRepresentativesDetailsPage(c.COMPANY_NAME, 'F123456789', c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.COUNTY, c.POSTCODE);
            await pages.coaUploadLetterOfAuthorityPage.completesUploadLetterOfAuthority('letterOfAuthority.png');
            break;

        default:
            throw new Error(`Failed: Wrong radio value scenario name: ${scenario}`);
    }

    await pages.coaCheckYourAnswersPage.completesCheckYourAnswersPage();
    await pages.coaPrivacyPolicyPage.completesPrivacyPolicyPage();
    await pages.coaUpdateSubmittedPage.completeUpdateSubmittedPage();
});

Then('I am navigated to {string} page', async ({ pages }, expectedPageHeaderText: string) => {
    await expect(pages.basePage.headerText).toHaveText(expectedPageHeaderText);
});

When('I choose to navigate to {string} page for COA', async ({ pages }, pageName: string) => {
    await pages.coaProofOfAddressPage.clickOnUpdateYourDetailsLink();

    switch (pageName.toLowerCase()) {
        case 'applicant details':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            break;

        case 'contact details legal representative':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The legal representative', c.FULL_NAME);
            break;

        case 'is your old home address in the uk?':
            await pages.coaUpdateYourDetailsPage.completesUpdateYourDetailsPagePage();
            await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_1978, c.COUNTRY_OF_NATIONALITY, '1234-1234-1234-1234/00');
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The applicant', '');
            await pages.coaContactDetailsPage.completesContactDetailsPage(c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage('Passport number', '1208297A');
            await pages.coaUploadProofOfIdentityPage.completesUploadProofOfIdentityPage('identification.pdf');
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage('Home address');
            break;

        default:
            throw new Error(`Failed: Wrong page name: ${pageName}`);
    }
});

When('I select continue', async ({ pages }) => {
    await pages.basePage.clickContinueButton();
});

Then('I should see {string} error message displayed', async ({ pages }, expectedErrorMessage: string) => {
    const actualErrorMessage = await pages.basePage.getThereIsAProblemTextErrorText();
    expect(actualErrorMessage).toEqual(expectedErrorMessage);
});

Then('I should see {string} error summary', async ({ pages }, expectedErrorMessage: string) => {
    const expectedErrorArray = expectedErrorMessage.trim().split('¬');
    const actualText = await pages.basePage.getErrorSummaryListText();
    const actualErrorArray = actualText!
        .replaceAll('\t', '')
        .trim()
        .split(/\r?\n/)
        .filter(Boolean);

    expect(actualErrorArray).toEqual(expectedErrorArray);
});

When('I choose to enter {string} in the {string} field on Applicant details page for COA', async ({ pages }, value: string, field: string) => {
    void field;
    await pages.coaApplicantDetailsPage.completesApplicantDetailsPage(c.FULL_NAME, c.DOB_11_11_1988, c.COUNTRY_OF_NATIONALITY, value);
});

When('I choose to select {string} on {string} page and choose to continue for COA', async ({ pages }, answer: string, pageName: string) => {
    switch (pageName.toLowerCase()) {
        case 'who are you?':
            await pages.coaWhoAreYouPage.completesWhoAreYouPage('The applicant', answer);
            break;

        case 'identity document number':
            await pages.coaIdentityDocumentNumberPage.completesIdentityDocumentNumberPage(answer, '');
            break;

        case 'which details are you updating?':
            await pages.coaWhichDetailsAreYouUpdatingPage.completesWhichDetailsAreYouUpdatingPage(answer);
            break;

        case 'is your old home address in the uk?':
            await pages.coaIsYourOldHomeAddressInTheUKPage.completesIsYourOldHomeAddressInTheUkPage(c.RESPONSE_YES, c.POSTCODE);
            break;

        case "do you want to make the same changes to your dependant's details":
            await pages.coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage.completesDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage(answer);
            break;

        default:
            throw new Error(`Failed: Wrong page name: ${pageName}`);
    }
});

When('I complete the fields below with Contact details for COA:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();
    await pages.coaContactDetailsPage.completesContactDetailsPage(data['Email address'], data['Telephone number (optional)']);
});

When('I complete the fields below with Contact details for legal representative for COA:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();
    await pages.coaContactDetailsLegalRepresentativePage.completesContactDetailsLegalRepresentativePage(
        data['Email address'],
        data['Telephone number (optional)'],
        data['Client’s email address (optional)'],
        data['Client’s telephone number (optional)'],
    );
});

When('I select save and continue on upload photo', async ({ pages }) => {
    await pages.basePage.selectContinueUploadBtn();
});

When('I choose to upload {string} file', async ({ pages }, fileName: string) => {
    await pages.basePage.uploadFileFromUserUploadFolder(fileName);
});

When('I choose to upload another {string} file', async ({ pages }, fileName: string) => {
    await pages.basePage.uploadFileFromUserUploadFolder(fileName);
});

Then('I should see {string} error for max upload file', async ({ pages }, expectedErrorMessage: string) => {
    const actualErrorMessage = (await pages.basePage.getFileUploadErrorMaxFileSizeText())
        ?.replace(/^\s*Error:\s*/, '')  //^\s* means “from the beginning, allow any whitespace first”. and \s* after it removes any spaces or newlines after Error:.
        .trim();
    expect(actualErrorMessage).toEqual(expectedErrorMessage);
});

Then('I should see {string} error for type of uploaded file', async ({ pages }, expectedErrorMessage: string) => {
    const actualErrorMessage = (await pages.basePage.getFileUploadErrorFileTypeText())
        ?.replace(/^\s*Error:\s*/, '')  //^\s* means “from the beginning, allow any whitespace first”. and \s* after it removes any spaces or newlines after Error:.
        .trim();
    expect(actualErrorMessage).toEqual(expectedErrorMessage);
});

When('I complete the fields below with Enter your legal representative’s details for COA:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();
    await pages.coaEnterYourLegalRepresentativesDetailsPage.completesEnterYourLegalRepresentativesDetailsPage(
        data['Company name '] ?? data['Company name'],
        data['OISC or SRA number'],
        data['Address line 1'],
        data['Address line 2'],
        data['Town or City'],
        data['County'],
        data['Postcode'],
    );
});

When('I complete the fields below with What is your new home address details for COA:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();
    await pages.coaWhatIsYourNewHomeAddressPage.completesWhatIsYourNewHomeAddressPage(
        data['Address line 1'],
        data['Address line 2'],
        data['Town or City'],
        data['County'],
        data['Postcode'],
    );
});

When('I complete the fields below with Which dependant would you like to make the same changes to details for COA:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();
    await pages.coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage.completesWhichDependantWouldYouLikeToMakeTheSameChangesToPage(
        data['Full name'],
        data['Date of Birth'],
        data['Country of nationality'],
    );
});