import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { coaApplicantDetailsPage } from '../pages/coa-applicant-details-page';
import { coaCheckYourAnswersPage } from '../pages/coa-check-your-answers-page';
import { coaContactDetailsPage } from '../pages/coa-contact-details-page';
import { coaContactDetailsLegalRepresentativePage } from '../pages/coa-contact-details-legal-representative-page';
import { coaDependantsPage } from '../pages/coa-dependants-page';
import { coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage } from '../pages/coa-do-you-want-to-make-the-same-changes-to-your-dependants-details-page';
import { coaEnterYourLegalRepresentativesDetailsPage } from '../pages/coa-enter-your-legal-representatives-details-page';
import { coaHomePage } from '../pages/coa-home-page';
import { coaIdentityDocumentNumberPage } from '../pages/coa-identity-document-number-page';
import { coaIsYourOldHomeAddressInTheUKPage } from '../pages/coa-is-your-old-home-address-in-the-uk-page';
import { coaOverviewPage } from '../pages/coa-overview-page';
import { coaPrivacyPolicyPage } from '../pages/coa-privacy-policy-page';
import { coaProofOfAddressPage } from '../pages/coa-proof-of-address-page';
import { coaProofOfIdentityPage } from '../pages/coa-proof-of-identity-page';
import { coaUpdateSubmittedPage } from '../pages/coa-update-submitted-page';
import { coaUpdateYourDetailsPage } from '../pages/coa-update-your-details-page';
import { coaUploadLetterOfAuthorityPage } from '../pages/coa-upload-letter-of-authority-page';
import { coaUploadProofOfAddressPage } from '../pages/coa-upload-proof-of-address-page';
import { coaUploadProofOfIdentityPage } from '../pages/coa-upload-proof-of-identity-page';
import { coaUploadProofOfPostalAddressPage } from '../pages/coa-upload-proof-of-postal-address-page';
import { coaWhatIsYourNewHomeAddressPage } from '../pages/coa-what-is-your-new-home-address-page';
import { coaWhatIsYourNewPostalAddressPage } from '../pages/coa-what-is-your-new-postal-address-page';
import { coaWhatYouNeedPage } from '../pages/coa-what-you-need-page';
import { coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage } from '../pages/coa-which-dependant-would-you-like-to-make-the-same-changes-to-page';
import { coaWhichDetailsAreYouUpdatingPage } from '../pages/coa-which-details-are-you-updating-page';
import { coaWhoAreYouPage } from '../pages/coa-who-are-you-page';

export type Pages = {
  basePage: basePage;
  coaApplicantDetailsPage: coaApplicantDetailsPage;
  coaCheckYourAnswersPage: coaCheckYourAnswersPage;
  coaContactDetailsPage: coaContactDetailsPage;
  coaContactDetailsLegalRepresentativePage: coaContactDetailsLegalRepresentativePage;
  coaDependantsPage: coaDependantsPage;
  coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage: coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage;
  coaEnterYourLegalRepresentativesDetailsPage: coaEnterYourLegalRepresentativesDetailsPage;
  coaHomePage: coaHomePage;
  coaIdentityDocumentNumberPage: coaIdentityDocumentNumberPage;
  coaIsYourOldHomeAddressInTheUKPage: coaIsYourOldHomeAddressInTheUKPage;
  coaOverviewPage: coaOverviewPage;
  coaPrivacyPolicyPage: coaPrivacyPolicyPage;
  coaProofOfAddressPage: coaProofOfAddressPage;
  coaProofOfIdentityPage: coaProofOfIdentityPage;
  coaUpdateSubmittedPage: coaUpdateSubmittedPage;
  coaUpdateYourDetailsPage: coaUpdateYourDetailsPage;
  coaUploadLetterOfAuthorityPage: coaUploadLetterOfAuthorityPage;
  coaUploadProofOfAddressPage: coaUploadProofOfAddressPage;
  coaUploadProofOfIdentityPage: coaUploadProofOfIdentityPage;
  coaUploadProofOfPostalAddressPage: coaUploadProofOfPostalAddressPage;
  coaWhatIsYourNewHomeAddressPage: coaWhatIsYourNewHomeAddressPage;
  coaWhatIsYourNewPostalAddressPage: coaWhatIsYourNewPostalAddressPage;
  coaWhatYouNeedPage: coaWhatYouNeedPage;
  coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage: coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage;
  coaWhichDetailsAreYouUpdatingPage: coaWhichDetailsAreYouUpdatingPage;
  coaWhoAreYouPage: coaWhoAreYouPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new basePage(page),
      coaApplicantDetailsPage: new coaApplicantDetailsPage(page),
      coaCheckYourAnswersPage: new coaCheckYourAnswersPage(page),
      coaContactDetailsPage: new coaContactDetailsPage(page),
      coaContactDetailsLegalRepresentativePage: new coaContactDetailsLegalRepresentativePage(page),
      coaDependantsPage: new coaDependantsPage(page),
      coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage: new coaDoYouWantToMakeTheSameChangesToYourDependantsDetailsPage(page),
      coaEnterYourLegalRepresentativesDetailsPage: new coaEnterYourLegalRepresentativesDetailsPage(page),
      coaHomePage: new coaHomePage(page),
      coaIdentityDocumentNumberPage: new coaIdentityDocumentNumberPage(page),
      coaIsYourOldHomeAddressInTheUKPage: new coaIsYourOldHomeAddressInTheUKPage(page),
      coaOverviewPage: new coaOverviewPage(page),
      coaPrivacyPolicyPage: new coaPrivacyPolicyPage(page),
      coaProofOfAddressPage: new coaProofOfAddressPage(page),
      coaProofOfIdentityPage: new coaProofOfIdentityPage(page),
      coaUpdateSubmittedPage: new coaUpdateSubmittedPage(page),
      coaUpdateYourDetailsPage: new coaUpdateYourDetailsPage(page),
      coaUploadLetterOfAuthorityPage: new coaUploadLetterOfAuthorityPage(page),
      coaUploadProofOfAddressPage: new coaUploadProofOfAddressPage(page),
      coaUploadProofOfIdentityPage: new coaUploadProofOfIdentityPage(page),
      coaUploadProofOfPostalAddressPage: new coaUploadProofOfPostalAddressPage(page),
      coaWhatIsYourNewHomeAddressPage: new coaWhatIsYourNewHomeAddressPage(page),
      coaWhatIsYourNewPostalAddressPage: new coaWhatIsYourNewPostalAddressPage(page),
      coaWhatYouNeedPage: new coaWhatYouNeedPage(page),
      coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage: new coaWhichDependantWouldYouLikeToMakeTheSameChangesToPage(page),
      coaWhichDetailsAreYouUpdatingPage: new coaWhichDetailsAreYouUpdatingPage(page),
      coaWhoAreYouPage: new coaWhoAreYouPage(page),
    });
  },
});

export const expect = test.expect;