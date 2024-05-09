const _ = require('lodash');
const moment = require('moment');
const config = require('../../../config');
const dateComponent = require('hof').components.date;
const countries = require('hof').utils.countries();

/**
 * UANRef represents a Unique Application Number reference.
 * Validation rule to match the UANRef pattern 1234-1234-1234-1234/00
 * This is a more lenient version that allows the user to omit hyphens and slashes.
 *
 * @param {string} value - The value to be validated.
 * @returns {boolean} - Returns true if the value matches the relaxed UAN pattern, otherwise false.
 */
function UANRef(value) {
  return value.match( /^((\d{4}[\-]?\d{4}[\-]?\d{4}[\-]?\d{4}(?:[\/]?\d{2})?)?)$/ );
}

/**
 * Validation rule to exclude the value 'United Kingdom'.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Returns true if the value is not 'United Kingdom', otherwise false.
 */
function excludeUK(value) {
  return value !== 'United Kingdom';
}

function passportNumber(value) {
  return value.match(/^[a-zA-Z0-9]{1,9}$/);
}

function brpNumber(value) {
  return value.match(/^[A-Z][A-Z](\d|X)\d{6}$/gi);
}

module.exports = {
  'change-dependant-details': {
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
    validate: [
      'required',
      excludeUK
    ],
    options: [{
      value: '',
      label: 'fields.dependant-country-of-nationality.options.none'
    }].concat(_.sortBy(countries, o => o.label)),
    labelClassName: 'govuk-label--s'
  },

  'applicant-full-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },

  'applicant-dob': dateComponent('applicant-dob', {
    mixin: 'input-date',
    validate: [
      'required',
      'date',
      { type: 'before', arguments: ['0', 'days'] },
      { type: 'after', arguments: ['120', 'years'] }
    ],
    legend: {
      className: 'govuk-label--s'
    }
  }),

  'applicant-nationality': {
    mixin: 'select',
    className: ['typeahead'],
    validate: [
      'required',
      excludeUK
    ],
    options: [{
      value: '',
      label: 'fields.applicant-nationality.options.null'
    }].concat(countries),
    labelClassName: 'govuk-label--s'
  },

  'applicant-unique-number': {
    mixin: 'input-text',
    validate: [
      { type: 'minlength', arguments: [16] },
      { type: 'maxlength', arguments: [22] },
      { type: 'regex', arguments: /^(([\d\-\/]+)?)$/ },
      UANRef
    ],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    html: undefined
  },

  'who-are-you': {
    mixin: 'radio-group',
    validate: ['required'],
    isPageHeading: true,
    options: [
      {
        value: 'applicant'
      },
      {
        value: 'legal-representative',
        toggle: 'legal-representative-name-toggle-content',
        child: 'partials/legal-representative-name'
      },
      {
        value: 'someone-else',
        toggle: 'someone-else-name-toggle-content',
        child: 'partials/someone-else-name'
      }
    ]
  },

  'legal-representative-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    dependent: {
      field: 'who-are-you',
      value: 'legal-representative'
    },
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },

  'someone-else-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    dependent: {
      field: 'who-are-you',
      value: 'someone-else'
    },
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },

  email: {
    mixin: 'input-text',
    validate: ['required', 'email'],
    labelClassName: 'govuk-label--s'
  },

  telephone: {
    mixin: 'input-text',
    validate: ['ukPhoneNumber'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },

  'client-email': {
    mixin: 'input-text',
    validate: ['email'],
    labelClassName: 'govuk-label--s'
  },

  'client-telephone': {
    mixin: 'input-text',
    validate: ['ukPhoneNumber'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },

  'which-details-updating': {
    mixin: 'checkbox-group',
    validate: ['required'],
    isPageHeading: true,
    options: [
      {
        value: 'old-address'
      },
      {
        value: 'postal-address'
      },
      {
        value: 'legal-details'
      }
    ]
  },
  'postal-address-line-1': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'postal-address-line-2': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'postal-address-town-or-city': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'postal-address-county': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'postal-address-postcode': {
    validate: ['required', 'notUrl', 'postcode'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'identity-type': {
    mixin: 'radio-group',
    labelClassName: 'govuk-label--s',
    validate: ['required'],
    options: [
      {
        value: 'passport',
        toggle: 'passport-number-details',
        child: 'input-text'
      },
      {
        value: 'brp',
        toggle: 'brp-details',
        child: 'input-text'
      },
      {
        value: 'arc',
        toggle: 'arc-details',
        child: 'input-text'
      },
      {
        value: 'none'
      }
    ]
  },
  'passport-number-details': {
    dependent: {
      field: 'identity-type',
      value: 'passport'
    },
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['required', passportNumber]
  },

  'brp-details': {
    dependent: {
      field: 'identity-type',
      value: 'brp'
    },
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['required', brpNumber]
  },

  'arc-details': {
    dependent: {
      field: 'identity-type',
      value: 'arc'
    },
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: ['required', 'alphanum']
  },
  'old-address': {
    mixin: 'radio-group',
    validate: 'required',
    isPageHeading: true,
    options: [
      {
        value: 'Yes',
        toggle: 'old-postcode',
        child: 'input-text'
      },
      {
        value: 'No'
      }
    ]
  },

  'old-postcode': {
    validate: ['required', 'notUrl', 'postcode'],
    formatter: ['ukPostcode'],
    dependent: {
      field: 'old-address',
      value: 'Yes'
    },
    className: ['govuk-input', 'govuk-input--width-10']
  },

  'home-address-line-1': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'home-address-line-2': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'home-address-town-or-city': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'home-address-county': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'home-address-postcode': {
    validate: ['required', 'notUrl', 'postcode'],
    formatter: ['ukPostcode'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'privacy-check': {
    mixin: 'checkbox',
    validate: ['required']
  }
};
