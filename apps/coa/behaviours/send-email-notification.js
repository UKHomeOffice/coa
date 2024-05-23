
const config = require('../../../config');
const utilities = require('../../../lib/utilities');
const _ = require('lodash');
const NotifyClient = utilities.NotifyClient;

const userConfirmationTemplateId = config.govukNotify.userConfirmationTemplateId;
const caseworkerConfirmationTemplateId = config.govukNotify.caseworkerConfirmationTemplateId;
const caseworkerEmail = config.govukNotify.caseworkerEmail;
const notifyKey = config.govukNotify.notifyApiKey;

const notifyClient = new NotifyClient(notifyKey);

module.exports = class SendEmailConfirmation {
  // getUpdatedDetails(value) {
  //   const getUpdatedDetails = req.sessionModel.get('which-details-updating');
  // }
  async sendUserEmailNotification(req) {
    const detailsUpdating = this.getUpdatedDetails(req);
    const personalisations = this.notifyPersonalisations;

    try {
      if (notifyKey === 'USE_MOCK') {
        req.log('warn', '*** Notify API Key set to USE_MOCK. Ensure disabled in production! ***');
      }

      await notifyClient.sendEmail(userConfirmationTemplateId, req.sessionModel.get('email'), {
        personalisation: Object.assign({}, personalisations, {
        reference_number: req.sessionModel.get('uniqueRefNumber'),
        applying_for_whom: req.sessionModel.get('isApplicant') ? 'your' : req.sessionModel.get('nameWithPossession'),
        applicant_full_name: req.sessionModel.get('applicant-full-name'),
        applicant_dob: req.sessionModel.get('applicant-dob'),
        nationality: req.sessionModel.get('applicant-nationality'),
        has_applicant_unique_number: req.sessionModel.get('applicant-unique-number').length > 0 ? 'yes' : 'no',
        applicant_unique_number: req.sessionModel.get('applicant-unique-number'),
        has_passport_number: req.sessionModel.get('passport-number-details') ? 'yes' : 'no',
        passport_number: req.sessionModel.get('passport-number-details'),
        has_brp_number: req.sessionModel.get('brp-details') ? 'yes' : 'no',
        brp_number: req.sessionModel.get('brp-details'),
        has_arc_number: req.sessionModel.get('arc-details') ? 'yes' : 'no',
        arc_number: req.sessionModel.get('arc-details'),
        who_are_you: req.sessionModel.get('who-are-you'),
        is_legal_rep: req.sessionModel.get('legal-representative-name') ? 'yes' : 'no',
        leg_rep_full_name: req.sessionModel.get('legal-representative-name'),
        leg_rep_email_address: req.sessionModel.get('email'),
        has_rep_tel_number: req.sessionModel.get('telephone').length > 0 ? 'yes' : 'no',
        leg_rep_tel_number: req.sessionModel.get('telephone'),
        has_leg_details: req.sessionModel.get('steps').includes('/legal-details') && req.sessionModel.get('oisc-sra-number') ? 'yes' : 'no',
        OISC_SRA_number: req.sessionModel.get('oisc-sra-number') ?? '',
        company_name: req.sessionModel.get('legal-company-name') ?? '',
        leg_rep_address: req.sessionModel.get('legalAddressDetails') ?? '',
        // details_updating: this.getUpdatedDetails(req), //THIS CAUSES ERROR
        has_old_postcode: req.sessionModel.get('steps').includes('/old-address') ? 'yes' : 'no',
        old_postcode: req.sessionModel.get('old-postcode') ?? '',
        has_new_home_address: req.sessionModel.get('steps').includes('/home-address') ? 'yes' : 'no',
        new_home_address: req.sessionModel.get('addressDetails') ?? '',
        has_new_postal_address: req.sessionModel.get('steps').includes('/postal-address') ? 'yes' : 'no',
        new_postal_address: req.sessionModel.get('postalAddressDetails') ?? '',
        })
      });

      const trackedPageStartTime = Number(req.sessionModel.get('session.started.timestamp'));
      const timeSpentOnForm = utilities.secondsBetween(trackedPageStartTime, new Date());

      req.log('info', 'coa.submit_form.create_email_with_file_notify.successful');
      req.log('info', `coa.submission.duration=[${timeSpentOnForm}] seconds`);
    } catch (err) {
      const error = _.get(err, 'response.data.errors[0]', err.message || err);
      req.log('error', 'coa.submit_form.create_email_with_file_notify.error', error);
      throw new Error(error);
    }
  }

  async sendCaseworkerEmailNotification(req) {
    const personalisations = this.notifyPersonalisations;

    try {
      if (notifyKey === 'USE_MOCK') {
        req.log('warn', '*** Notify API Key set to USE_MOCK. Ensure disabled in production! ***');
      }

      await notifyClient.sendEmail(caseworkerConfirmationTemplateId, caseworkerEmail, {
        personalisation: Object.assign({}, personalisations, {
          reference_number: req.sessionModel.get('uniqueRefNumber'),
          applying_for_whom: req.sessionModel.get('isApplicant') ? 'your' : req.sessionModel.get('nameWithPossession'),
          applicant_full_name: req.sessionModel.get('applicant-full-name'),
          applicant_dob: req.sessionModel.get('applicant-dob'), 
          nationality: req.sessionModel.get('applicant-nationality'),
          has_applicant_unique_number: req.sessionModel.get('applicant-unique-number').length > 0 ? 'yes' : 'no',
          applicant_unique_number: req.sessionModel.get('applicant-unique-number'),
          has_passport_number: req.sessionModel.get('passport-number-details') ? 'yes' : 'no',
          passport_number: req.sessionModel.get('passport-number-details'),
          has_brp_number: req.sessionModel.get('brp-details') ? 'yes' : 'no',
          brp_number: req.sessionModel.get('brp-details'),
          has_arc_number: req.sessionModel.get('arc-details') ? 'yes' : 'no',
          arc_number: req.sessionModel.get('arc-details'),
          is_legal_rep: req.sessionModel.get('legal-representative-name') ? 'yes' : 'no',
          leg_rep_full_name: req.sessionModel.get('legal-representative-name'),
          who_are_you: req.sessionModel.get('who-are-you'),
          leg_rep_address: req.sessionModel.get('legalAddressDetails') ?? '',
          has_rep_tel_number: req.sessionModel.get('telephone').length > 0 ? 'yes' : 'no',
          leg_rep_tel_number: req.sessionModel.get('telephone'),
          has_leg_details: req.sessionModel.get('steps').includes('/legal-details') && req.sessionModel.get('oisc-sra-number') ? 'yes' : 'no',
          OISC_SRA_number: req.sessionModel.get('oisc-sra-number') ?? '',
          company_name: req.sessionModel.get('legal-company-name') ?? '',
          leg_rep_address: req.sessionModel.get('legalAddressDetails') ?? '',
          // details_updating: this.getUpdatedDetails(req), //THIS CAUSES ERROR
          has_old_postcode: req.sessionModel.get('steps').includes('/old-address') ? 'yes' : 'no',
          old_postcode: req.sessionModel.get('old-postcode') ?? '',
          has_new_home_address: req.sessionModel.get('steps').includes('/home-address') ? 'yes' : 'no',
          new_home_address: req.sessionModel.get('addressDetails') ?? '',
          has_new_postal_address: req.sessionModel.get('steps').includes('/postal-address') ? 'yes' : 'no',
          new_postal_address: req.sessionModel.get('postalAddressDetails') ?? '',
        })
      });

      const trackedPageStartTime = Number(req.sessionModel.get('session.started.timestamp'));
      const timeSpentOnForm = utilities.secondsBetween(trackedPageStartTime, new Date());

      req.log('info', 'coa.submit_form.create_email_with_file_notify.successful');
      req.log('info', `coa.submission.duration=[${timeSpentOnForm}] seconds`);
    } catch (err) {
      const error = _.get(err, 'response.data.errors[0]', err.message || err);
      req.log('error', 'coa.submit_form.create_email_with_file_notify.error', error);
      throw new Error(error);
    }
  }

  async send(req, res, locals) {
    try {
      await this.sendUserEmailNotification(req);
      await this.sendCaseworkerEmailNotification(req);

      req.log('info', 'coa.form.submit_form.successful');
    } catch(e) {
      req.log('error', JSON.stringify(e));
      throw e;
    }
  }
};
