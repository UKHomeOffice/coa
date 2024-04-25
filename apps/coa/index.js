const sessionDefaults = require('./behaviours/set-session-defaults');
const hof = require('hof');
const Summary = hof.components.summary;
const Aggregate = require('./behaviours/aggregator');
const setDateErrorLink = require('./behaviours/set-date-error-link');
const ModifyChangeURL = require('./behaviours/modify-change-link');
const saveDesiredContent = require('./behaviours/save-desired-content.js');

/**
 * Checks if a given field value matches a conditional value based on the request object.
 *
 * @param {Object} req - The request object.
 * @param {string} fieldName - The name of the field to check.
 * @param {string} conditionalValue - The value to compare against the field value.
 * @returns {boolean} - Returns true if the field value matches the conditional value, false otherwise.
 */
function forkCondition(req, fieldName, conditionalValue) {
  const fieldValue = req.form.historicalValues?.[fieldName] || req.form.values[fieldName];
  if (!fieldValue) return false;
  return Array.isArray(fieldValue) ? fieldValue.includes(conditionalValue) : fieldValue === conditionalValue;
}

module.exports = {
  name: 'coa',
  baseUrl: '/',
  params: '/:action?/:id?/:edit?',
  confirmStep: '/check-answers',
  steps: {
    '/overview': {
      behaviours: [sessionDefaults],
      next: '/what-you-need'
    },
    '/what-you-need': {
      next: '/proof-of-identity',
      backLink: false
    },
    '/proof-of-identity': {
      next: '/proof-of-address',
      backLink: false
    },
    '/proof-of-address': {
      next: '/update-details',
      backLink: false
    },
    '/update-details': {
      next: '/applicant-details',
      backLink: false
    },
    '/applicant-details': {
      fields: ['applicant-full-name', 'applicant-dob', 'applicant-nationality', 'applicant-unique-number'],
      next: '/who'
    },
    '/who': {
      behaviours: [saveDesiredContent],
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
      fields: [],
      next: '/upload-identity'
    },
    '/upload-identity': {
      fields: [],
      next: '/upload-identity-summary'
    },
    '/upload-identity-summary': {
      fields: [],
      next: '/which-details'
    },
    '/which-details': {
      fields: ['which-details-updating'],
      // The conditional check should be performed in reverse order, as the last fork takes over.
      forks: [
        {
          target: '/legal-details',
          condition: req => forkCondition(req, 'which-details-updating', 'legal-details')
        },
        {
          target: '/postal-address',
          condition: req => forkCondition(req, 'which-details-updating', 'postal-address')
        },
        {
          target: '/old-address',
          condition: req => forkCondition(req, 'which-details-updating', 'old-address')
        }
      ]
    },
    '/old-address': {
      fields: ['old-address', 'old-postcode'],
      forks: [
        {
          target: '/home-address',
          condition: {
            field: 'old-address',
            value: 'Yes'
          }
        }
      ],
      next: '/home-address'
    },
    '/home-address': {
      fields: ['home-address-line-1',
        'home-address-line-2',
        'home-address-town-or-city',
        'home-address-county',
        'home-address-postcode'
      ],
      next: '/upload-address'
    },
    '/upload-address': {
      next: '/upload-address-summary'
    },
    '/upload-address-summary': {
      next: '/check-answers',
      // The conditional check should be performed in reverse order, as the last fork takes over.
      forks: [
        {
          target: '/update-dependant',
          condition: req => forkCondition(req, 'who-are-you', 'applicant')
        },
        {
          target: '/legal-details',
          condition: req => forkCondition(req, 'which-details-updating', 'legal-details')
        },
        {
          target: '/postal-address',
          condition: req => forkCondition(req, 'which-details-updating', 'postal-address')
        }
      ]
    },
    '/postal-address': {
      fields: [],
      next: '/upload-postal-address'
    },
    '/upload-postal-address': {
      fields: [],
      next: '/upload-postal-address-summary'
    },
    '/upload-postal-address-summary': {
      next: '/check-answers',
      // The conditional check should be performed in reverse order, as the last fork takes over.
      forks: [
        {
          target: '/update-dependant',
          condition: req => forkCondition(req, 'who-are-you', 'applicant')
        },
        {
          target: '/legal-details',
          condition: req => forkCondition(req, 'which-details-updating', 'legal-details')
        }
      ]
    },
    '/legal-details': {
      fields: [],
      next: '/check-answers',
      forks: [
        {
          target: '/update-dependant',
          condition: req => forkCondition(req, 'who-are-you', 'applicant')
        }
      ]
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
      template: 'summary',
      next: '/privacy-policy'
    },
    '/privacy-policy': {
      fields: ['privacy-check'],
      next: '/request-submitted'
    },
    '/request-submitted': {
      backLink: false,
      clearSession: true
    }
  }
};
