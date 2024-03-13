const moment = require('moment');
const PRETTY_DATE_FORMAT = 'DD MMMM YYYY';

function prettyDateFormat (value) {
  if (!isNaN(new Date(value)) === true) {
    const prettyDate = moment(value).format(PRETTY_DATE_FORMAT)
    return prettyDate
  }
  return value
}

module.exports = {
  'change-details': [
    {
      step: '/dependant-summary',
      field: 'dependants',
      parse: (list, req) => {
        if (!req.sessionModel.get('steps').includes('/dependant-summary')) {
          return null;
        }
        return req.sessionModel.get('dependants').aggregatedValues.map(a => a.fields.map(field => prettyDateFormat(field.value)).join('\n')).join('\n \n');
      }
    }
  ]
};
