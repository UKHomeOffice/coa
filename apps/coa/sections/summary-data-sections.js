
'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'DD MMMM YYYY';

module.exports = {
  'applicant-details': {
    steps: [
      {
        step: '/applicant-details',
        field: 'applicant-full-name'
      },
      {
        step: '/applicant-details',
        field: 'applicant-dob',
        parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
      },
      {
        step: '/applicant-details',
        field: 'applicant-nationality'
      },
      {
        step: '/applicant-details',
        field: 'applicant-unique-number'
      }
    ]
  },
  'your-details': {
    steps: [
      {
        step: '/who',
        field: 'who-are-you',
        parse: (val, req) => {
          if(val === '{{values.nameWithPossession}} legal representative') {
            return val.replace( '{{values.nameWithPossession}}', req.sessionModel.get('nameWithPossession'));
          }
          return val.replace( '{{values.applicant-full-name}}', req.sessionModel.get('applicant-full-name'));
        }
      },
      {
        step: '/who',
        field: 'legal-representative-name'
      },
      {
        step: '/who',
        field: 'someone-else-name'
      },
      {
        step: '/contact-details',
        field: 'email'
      },
      {
        step: '/contact-details',
        field: 'telephone'
      },
      {
        step: '/contact-details',
        field: 'client-email'
      },
      {
        step: '/contact-details',
        field: 'client-telephone'
      },
      {
        step: '/identity-number',
        field: 'passport-number-details'
      },
      {
        step: '/identity-number',
        field: 'brp-details'
      },
      {
        step: '/identity-number',
        field: 'arc-details'
      },
      {
        step: '/upload-identity',
        field: 'identity-documents',
        parse: documents => {
          return Array.isArray(documents) && documents.length > 0  ? documents.map(doc => doc.name).join('\n') : null;
        }
      }
    ]
  },
  'change-details': {
    steps: [
      {
        step: '/which-details',
        field: 'which-details-updating',
        parse: value => {
          return Array.isArray(value) ? value.map(option => option).join('\n') : value;
        }
      },
      {
        step: '/update-dependant',
        field: 'change-dependant-details'
      },
      {
        step: '/dependant-summary',
        field: 'dependants',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/dependant-summary')) {
            return null;
          }
          return req.sessionModel.get('dependants').aggregatedValues
            .map(a => a.fields.map(field => {
              return field.parsed;
            }).join('\n')).join('\n \n');
        }
      },
      {
        step: '/old-address',
        field: 'old-address'
      },
      {
        step: '/old-address',
        field: 'old-postcode'
      },
      {
        step: '/home-address',
        field: 'home-address-details',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/home-address')) {
            return null;
          }
          const addressDetails = [];
          addressDetails.push(req.sessionModel.get('home-address-line-1'));
          if(req.sessionModel.get('home-address-line-2')) {
            addressDetails.push(req.sessionModel.get('home-address-line-2'));
          }
          addressDetails.push(req.sessionModel.get('home-address-town-or-city'));
          if(req.sessionModel.get('home-address-county')) {
            addressDetails.push(req.sessionModel.get('home-address-county'));
          }
          addressDetails.push(req.sessionModel.get('home-address-postcode'));
          return addressDetails.join('\n');
        }
      },
      {
        step: '/upload-address',
        field: 'home-address-documents',
        parse: documents => {
          return Array.isArray(documents) && documents.length > 0  ? documents.map(doc => doc.name).join('\n') : null;
        }
      },
      {
        step: '/postal-address',
        field: 'postal-address-details',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/postal-address')) {
            return null;
          }
          const postalAddressDetails = [];
          postalAddressDetails.push(req.sessionModel.get('postal-address-line-1'));
          if (req.sessionModel.get('postal-address-line-2')) {
            postalAddressDetails.push(req.sessionModel.get('postal-address-line-2'));
          }
          postalAddressDetails.push(req.sessionModel.get('postal-address-town-or-city'));
          if (req.sessionModel.get('postal-address-county')) {
            postalAddressDetails.push(req.sessionModel.get('postal-address-county'));
          }
          postalAddressDetails.push(req.sessionModel.get('postal-address-postcode'));
          return postalAddressDetails.join('\n');
        }
      },
      {
        step: '/legal-details',
        field: 'legal-company-name'
      },
      {
        step: '/legal-details',
        field: 'oisc-sra-number'
      },
      {
        step: '/legal-details',
        field: 'legal-representative-address-details',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/legal-details')) {
            return null;
          }
          const legalAddressDetails = [];
          legalAddressDetails.push(req.sessionModel.get('legal-address-line-1'));
          if(req.sessionModel.get('legal-address-line-2')) {
            legalAddressDetails.push(req.sessionModel.get('legal-address-line-2'));
          }
          legalAddressDetails.push(req.sessionModel.get('legal-address-town-or-city'));
          if(req.sessionModel.get('legal-address-county')) {
            legalAddressDetails.push(req.sessionModel.get('legal-address-county'));
          }
          legalAddressDetails.push(req.sessionModel.get('legal-address-postcode'));
          return legalAddressDetails.join('\n');
        }
      }
    ]
  }
};
