module.exports = {
  'change-details': [
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
};
