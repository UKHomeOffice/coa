const sessionDefaults = require('./behaviours/set-session-defaults');

module.exports = {
  name: 'coa',
  baseUrl: '/',
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
    }
  }
};
