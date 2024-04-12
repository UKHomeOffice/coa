
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
        field: 'identity-type',

        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/identity-number')) {
           return null;
          } else if (req.sessionModel.get('identity-type') === 'passport') {
           return req.sessionModel.get('passport-number-details');
          } else if (req.sessionModel.get('identity-type') === 'brp') {
            return req.sessionModel.get('brp-details');
           } else if (req.sessionModel.get('identity-type') === 'arc') {
            return req.sessionModel.get('arc-details');
           } 
          return list;
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
      }
    ]
  }
};
