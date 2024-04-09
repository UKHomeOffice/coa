/* eslint-disable no-var, vars-on-top */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');
var $ = require('jquery');

var accessibleAutocomplete = require('accessible-autocomplete');
$('.typeahead').each(function applyTypeahead() {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: this
  });
});

$(function () {
  if ($('#loader-container')) {
    $('.govuk-button').on('click', function () {
      $('#loader-container').addClass('spinner-loader');
      $('#report-submit').addClass('visuallyhidden');
    });
  }
});
