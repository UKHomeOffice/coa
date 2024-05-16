
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
  async sendUserEmailNotification(req) {
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
          unique_reference_number: req.sessionModel.get('applicant-unique-number').length>0 ? req.sessionModel.get('applicant-unique-number') : 'Not Provided',
          passport_number: req.sessionModel.get('passport-number-details').length>0 ? req.sessionModel.get('passport-number-details') : 'Not Provided',
          brp_number: req.sessionModel.get('brp-details').length>0 ? req.sessionModel.get('brp-details') : 'Not Provided', 
          arc_number: req.sessionModel.get('arc-details').length>0 ? req.sessionModel.get('arc-details') : 'Not Provided',
          leg_rep_full_name: req.sessionModel.get('who-are-you'),
          leg_rep_email_address: req.sessionModel.get('email'),
          leg_rep_tel_number: req.sessionModel.get('telephone').length>0 ? req.sessionModel.get('telephone') : 'Not Provided',
          OISC_SRA_number: req.sessionModel.get('oisc-sra-number'),
          company_name: req.sessionModel.get('legal-company-name').length>0 ? req.sessionModel.get('legal-company-name') :'Not Provided',
          leg_rep_address: req.sessionModel.get('legalAddressDetails').length>0 ? req.sessionModel.get('legalAddressDetails') : 'Not Provided',
          details_updating: req.sessionModel.get('which-details-updating'),
          old_postcode: req.sessionModel.get('old-postcode').length>0 ? req.sessionModel.get('old-postcode') : 'Not Provided',
          new_home_address: req.sessionModel.get('addressDetails'),
          new_postal_address: req.sessionModel.get('postalAddressDetails')
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
      //await this.sendCaseworkerEmailNotification(req);

      req.log('info', 'coa.form.submit_form.successful');
    } catch(e) {
      req.log('error', JSON.stringify(e));
      throw e;
    }
  }
};
