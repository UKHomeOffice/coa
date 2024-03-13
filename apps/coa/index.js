const hof = require('hof');
const Summary = hof.components.summary;
const Aggregate = require('./behaviours/aggregator');
const setDateErrorLink = require('./behaviours/set-date-error-link');
const ModifyChangeURL = require('./behaviours/modify-change-link');

module.exports = {
  name: 'coa',
  baseUrl: '/',
  params: '/:action?/:id?/:edit?',
  steps: {
    '/update-dependant': {
      fields: ['change-dependant-details'],
      forks: [{
        target: '/dependant-details',
        condition: {
          field: 'change-dependant-details',
          value: 'yes'
        }
      }],
      next: '/confirm'
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
      addAnotherLinkText: 'dependant',
      next: '/confirm'
    },
    // Change this to /check-answers
    '/confirm': {
      behaviours: [Summary, ModifyChangeURL],
      sections: require('./sections/summary-data-sections')
    }
  }
};
