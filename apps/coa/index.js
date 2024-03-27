const hof = require('hof');
const Summary = hof.components.summary;
const Aggregate = require('./behaviours/aggregator');
const setDateErrorLink = require('./behaviours/set-date-error-link');
const ModifyChangeURL = require('./behaviours/modify-change-link');

module.exports = {
  name: 'coa',
  baseUrl: '/',
  params: '/:action?/:id?/:edit?',
  confirmStep: '/check-answers',
  steps: {
    '/overview': {
      next: '/applicant-details'
    },
    '/applicant-details': {
      fields: ['applicant-full-name', 'applicant-dob', 'applicant-nationality', 'applicant-unique-number'],
      next: '/who'
    },
    '/who': {
      fields: ['who-are-you', 'legal-representative-name', 'someone-else-name'],
      next: '/contact-details',
      forks: [
        {
          target: '/legal-representative',
          condition: {
            field: 'who-are-you',
            value: 'legal-representative'
          }
        }
      ]
    },
    '/legal-representative': {
      fields: ['email', 'telephone', 'client-email', 'client-telephone'],
      next: '/identity-number'
    },
    '/contact-details': {
      fields: ['email', 'telephone'],
      next: '/identity-number'
    },
    '/identity-number': {
      next: '/upload-identity'
    },
    '/upload-identity': {
      next: '/upload-identity-summary'
    },
    '/upload-identity-summary' : {
      next: '/which-details'
    },
    '/which-details': {
      next: '/old-address'
    },
    '/old-address': {
      next: '/home-address'
    },
    '/home-address': {
      next: '/upload-address'
    },
    '/upload-address': {
      next: '/upload-address-summary'
    },
    '/upload-address-summary': {
      next: '/update-dependant'
    },
    '/update-dependant': {
      fields: ['change-dependant-details'],
      forks: [{
        target: '/dependant-details',
        condition: {
          field: 'change-dependant-details',
          value: 'yes'
        }
      }],
      next: '/check-answers'
    },
    '/dependant-details': {
      fields: [
        'dependant-full-name',
        'dependant-date-of-birth',
        'dependant-country-of-nationality'
      ],
      behaviours: [setDateErrorLink],
      next: '/dependant-summary'
    },
    '/dependant-summary': {
      behaviours: [Aggregate, hof.components.homeOfficeCountries],
      aggregateTo: 'dependants',
      aggregateFrom: [
        'dependant-full-name',
        'dependant-date-of-birth',
        'dependant-country-of-nationality'
      ],
      addStep: 'dependant-details',
      template: 'dependant-summary',
      next: '/check-answers'
    },
    '/check-answers': {
      behaviours: [Summary, ModifyChangeURL],
      sections: require('./sections/summary-data-sections'),
      template: 'summary'
    }
  }
};
