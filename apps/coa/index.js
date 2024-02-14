module.exports = {
  name: 'coa',
  baseUrl: '/',
  steps: {
    '/overview': {
      next: '/what-you-need'
    },
    '/what-you-need': {
      next: '/proof-of-identity'
    },
    '/proof-of-identity': {
      next: '/proof-of-address'
    },
    '/proof-of-address': {
      next: '/update-details'
    }
  }
}