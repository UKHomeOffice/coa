
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
      },
      {
        step: '/upload-identity-summary',
        field: 'identity-documents',
        parse: documents => {
          return Array.isArray(documents) && documents.length > 0  ? document.map(doc => doc.name).join('\n') : null;
        }
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
          return val.replace( '{{values.applicant-full-name}}', req.sessionModel.get('applicant-full-name') );
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
      }
    ]
  }
};
