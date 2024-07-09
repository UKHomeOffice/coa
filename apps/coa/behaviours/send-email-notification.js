const config = require('../../../config');

const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyKey = config.govukNotify.notifyApiKey;
const translation = require('../translations/src/en/fields.json');
const notifyClient = new NotifyClient(notifyKey);
const moment = require('moment');
const PRETTY_DATE_FORMAT = 'DD MMMM YYYY';

const getLabel = (fieldKey, fieldValue) => {
  if ( Array.isArray(fieldValue)) {
    return fieldValue.map(option => translation[fieldKey].options[option].label).join(', ');
  }
  return translation[fieldKey].options[fieldValue].label;
};

const parseDocumentList = documents => {
  return Array.isArray(documents) ? documents.map(doc => `[${doc.name}](${doc.url})`).join('\n') : '';
};

const getDependants = dependents => {
  return dependents ?
    dependents.aggregatedValues.map(({ fields }) => fields.map(({ parsed }) => parsed).join('\n')).join('\n\n ---\n^')
    : '';
};

const whoAreYouLabels = {
  applicant: 'Applicant',
  'legal-representative': 'Legal representative',
  'someone-else': 'Someone else'
};

const getPersonalisation = (recipientType, req) => {
  const basePersonalisation = {
    reference_number: req.sessionModel.get('uniqueRefNumber'),
    applying_for_whom: req.sessionModel.get('isApplicant') ? 'your' : req.sessionModel.get('nameWithPossession'),
    applicant_full_name: req.sessionModel.get('applicant-full-name'),
    applicant_dob: moment(req.sessionModel.get('applicant-dob')).format(PRETTY_DATE_FORMAT),
    nationality: req.sessionModel.get('applicant-nationality'),
    has_applicant_unique_number: req.sessionModel.get('applicant-unique-number').length > 0 ? 'yes' : 'no',
    applicant_unique_number: req.sessionModel.get('applicant-unique-number'),
    has_passport_number: req.sessionModel.get('passport-number-details') ? 'yes' : 'no',
    passport_number: req.sessionModel.get('passport-number-details'),
    has_brp_number: req.sessionModel.get('brp-details') ? 'yes' : 'no',
    brp_number: req.sessionModel.get('brp-details'),
    has_arc_number: req.sessionModel.get('arc-details') ? 'yes' : 'no',
    arc_number: req.sessionModel.get('arc-details'),
    who_are_you: whoAreYouLabels[req.sessionModel.get('who-are-you')],
    is_legal_rep: req.sessionModel.get('legal-representative-name') ? 'yes' : 'no',
    leg_rep_full_name: req.sessionModel.get('legal-representative-name'),
    email_address: req.sessionModel.get('email'),
    has_tel_number: req.sessionModel.get('telephone').length > 0 ? 'yes' : 'no',
    tel_number: req.sessionModel.get('telephone'),
    has_client_email_address: req.sessionModel.get('client-email') ? 'yes' : 'no',
    client_email_address: req.sessionModel.get('client-email'),
    has_client_tel_number: req.sessionModel.get('client-telephone') ? 'yes' : 'no',
    client_tel_number: req.sessionModel.get('client-telephone'),
    has_leg_details: req.sessionModel.get('steps').includes('/legal-details') ? 'yes' : 'no',
    OISC_SRA_number: req.sessionModel.get('oisc-sra-number') ?? '',
    company_name: req.sessionModel.get('legal-company-name') ?? '',
    leg_rep_address: req.sessionModel.get('steps').includes('/legal-details') ?
      req.sessionModel.get('legalAddressDetails') : '',
    details_updating: getLabel('which-details-updating', req.sessionModel.get('which-details-updating')),
    has_old_postcode: req.sessionModel.get('old-postcode') ? 'yes' : 'no',
    old_postcode: req.sessionModel.get('old-postcode') ?? '',
    has_new_home_address: req.sessionModel.get('steps').includes('/home-address') ? 'yes' : 'no',
    new_home_address: req.sessionModel.get('steps').includes('/home-address') ?
      req.sessionModel.get('addressDetails') : '',
    has_new_postal_address: req.sessionModel.get('steps').includes('/postal-address') ? 'yes' : 'no',
    new_postal_address: req.sessionModel.get('steps').includes('/postal-address') ?
      req.sessionModel.get('postalAddressDetails') : '',
    has_dependents: req.sessionModel.get('steps').includes('/dependant-summary') ? 'yes' : 'no',
    dependents: getDependants(req.sessionModel.get('dependants'))
  };

  if (recipientType === 'business') {
    const identityDocuments = parseDocumentList(req.sessionModel.get('identity-documents'));
    const homeAddressDocuments = req.sessionModel.get('steps').includes('/upload-address') ?
      parseDocumentList(req.sessionModel.get('home-address-documents')) : '';
    const postalAddressDocuments = req.sessionModel.get('steps').includes('/upload-postal-address') ?
      parseDocumentList(req.sessionModel.get('postal-address-documents')) : '';
    const letterOfAuthority = req.sessionModel.get('steps').includes('/upload-letter') ?
      parseDocumentList(req.sessionModel.get('letter-of-authority')) : '';

    return {
      ...basePersonalisation,
      // business-specific fields
      has_identity_documents: identityDocuments ? 'yes' : 'no',
      identity_documents: identityDocuments,
      has_home_address_documents: homeAddressDocuments ? 'yes' : 'no',
      home_address_documents: homeAddressDocuments,
      has_postal_address_documents: postalAddressDocuments ? 'yes' : 'no',
      postal_address_documents: postalAddressDocuments,
      has_letter_of_authority: letterOfAuthority ? 'yes' : 'no',
      letter_of_authority: letterOfAuthority
    };
  }

  return {
    ...basePersonalisation
    // user-specific fields
  };
};

module.exports = class SendEmailConfirmation {
  async sendUserEmailNotification(req) {
    const personalisations = getPersonalisation('user', req);

    try {
      await notifyClient.sendEmail(
        config.govukNotify.userConfirmationTemplateId,
        req.sessionModel.get('email'),
        {
          personalisation: Object.assign({}, personalisations)
        }
      );

      req.log(
        'info',
        `User Confirmation Email sent successfully, reference number: ${req.sessionModel.get('uniqueRefNumber')}`
      );
    } catch (err) {
      const errorDetails = err.response?.data ? `Cause: ${JSON.stringify(err.response.data)}` : '';
      const errorCode = err.code ? `${err.code} -` : '';
      const errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      req.log(
        'error',
        `Failed to send User Confirmation Email, reference number: ${req.sessionModel.get('uniqueRefNumber')};`,
        errorMessage
      );
      throw  Error(errorMessage);
    }
  }

  async sendCaseworkerEmailNotification(req) {
    const personalisations = getPersonalisation('business', req);

    try {
      await notifyClient.sendEmail(
        config.govukNotify.businessConfirmationTemplateId,
        config.govukNotify.caseworkerEmail,
        {
          personalisation: Object.assign({}, personalisations)
        }
      );

      req.log(
        'info',
        `Business Confirmation Email sent successfully, reference number: ${req.sessionModel.get('uniqueRefNumber')}`
      );
    } catch (err) {
      const errorDetails = err.response?.data ? `Cause: ${JSON.stringify(err.response.data)}` : '';
      const errorCode = err.code ? `${err.code} -` : '';
      const errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      req.log(
        'error',
        `Failed to send Business Confirmation Email, reference number: ${req.sessionModel.get('uniqueRefNumber')};`,
        errorMessage
      );
      throw Error(errorMessage);
    }
  }

  async send(req) {
    try {
      await this.sendUserEmailNotification(req);
      await this.sendCaseworkerEmailNotification(req);

      req.log('info', 'Request to send notification emails completed successfully.');
    } catch(err) {
      req.log('error', `Failed to send all notifications emails. ${err}`);
      throw err;
    }
  }
};
