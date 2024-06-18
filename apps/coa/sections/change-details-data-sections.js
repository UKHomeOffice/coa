module.exports = {
  'home-address-details': {
    steps: [
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
        },
        omitChangeLink: true
      }
    ]
  },
  'postal-address-details': {
    steps: [
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
        },
        omitChangeLink: true
      }
    ]
  },
  'legal-representative-details': {
    steps: [
      {
        step: '/legal-details',
        field: 'legal-company-name',
        omitChangeLink: true
      },
      {
        step: '/legal-details',
        field: 'oisc-sra-number',
        omitChangeLink: true
      },
      {
        step: '/legal-details',
        field: 'legal-rep-address-details',
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
        },
        omitChangeLink: true
      },
      {
        step: '/contact-details',
        field: 'legal-representative-email',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/contact-details')) {
            return null;
          }
          return req.sessionModel.get('isLegalRep') ? req.sessionModel.get('email') : null ;
        },
        omitChangeLink: true
      }
    ]
  }
};
