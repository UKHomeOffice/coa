module.exports = {
  'Home address details': {
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
  'Postal address details': {
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
  }
};
