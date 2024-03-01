const { max } = require('lodash');

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
};

/**
 * Validation rule to exclude the value 'United Kingdom'.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Returns true if the value is not 'United Kingdom', otherwise false.
 */
function excludeUK(value) {
  return value !== 'United Kingdom';
}

module.exports = {

    'applicant-full-name': {
        mixin: 'input-text',
        validate: ['required', 'notUrl'],
        labelClassName: 'govuk-label--s',
        className: ['govuk-input', 'govuk-!-width-two-thirds']
        
    },
    'applicant-dob': dateComponent('applicant-dob', {
        mixin: 'input-date',
        isPageHeading: false,
        validate: [
          'required', 
          'date',
          { type: 'before', arguments: ['0', 'days'] },
          { type: 'after', arguments: ['120', 'years'] },
        ],
        legend: {
            className: 'govuk-label--s'
        },
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
        html:undefined
    },

    'who-are-you': {
        mixin: 'radio-group',
        validate: ['required'],
        isPageHeading: true,
        options: [{
          value: 'applicant'
        }, {
          value: 'legal-representative',
          toggle: 'legal-representative-name-toggle-content',
          child: 'partials/legal-representative-name'
        }, {
          value: 'someone-else',
          toggle: 'someone-else-name-toggle-content',
          child: 'partials/someone-else-name'
        }],
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

      'email': {
        mixin: 'input-text',
        validate: ['required', 'email'],
        labelClassName: 'govuk-label--s'

      },
      'telephone': {
        mixin: 'input-text',
        validate: ['ukPhoneNumber'],
        labelClassName: 'govuk-label--s',
        className: ['govuk-input', 'govuk-!-width-two-thirds'],

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
        className: ['govuk-input', 'govuk-!-width-two-thirds'],
      }
};
