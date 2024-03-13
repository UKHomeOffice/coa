const _ = require('lodash');
const moment = require('moment');
const config = require('../../../config');
const dateComponent = require('hof').components.date;
const countries = require('hof').utils.countries();

module.exports = {
  'change-dependant-details' : {
    isPageHeading: 'true',
    mixin: 'radio-group',
    validate: 'required',
    className: ['block', 'form-group'],
    options: [
      'yes',
      'no'
    ]
  },
  'dependant-full-name': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 200 }],
    labelClassName: 'govuk-label--s'
  },
  'dependant-date-of-birth': dateComponent('dependant-date-of-birth', {
    mixin: 'input-date',
    validate: [
      'required',
      'date',
      { type: 'before', arguments: ['0', 'days'] },
      { type: 'after', arguments: ['120', 'years'] }
    ],
    parse: d => d && moment(d).format(config.PRETTY_DATE_FORMAT),
    legend: {
      className: 'govuk-label--s'
    }
  }),
  'dependant-country-of-nationality': {
    mixin: 'select',
    className: ['typeahead'],
    validate: ['required'],
    options: [{
      value: '',
      label: 'fields.dependant-country-of-nationality.options.none'
    }].concat(_.sortBy(countries, o => o.label)),
    labelClassName: 'govuk-label--s'
  },
};
