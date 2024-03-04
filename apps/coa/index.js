const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'coa',
  baseUrl: '/',
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
    '/contact-details': {
      fields: ['email', 'telephone'],
      next: '/check-answers'
    },
    '/legal-representative': {
      fields: ['email', 'telephone', 'client-email', 'client-telephone'],
      next: '/check-answers'
    },
    '/check-answers': {
      behaviours: [SummaryPageBehaviour],
      template: 'summary',
      sections: require('./sections/summary-data-sections')
    }
  }
};
