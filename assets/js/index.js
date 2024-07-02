/* eslint-disable no-var, vars-on-top */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');

const accessibleAutocomplete = require('accessible-autocomplete');

document.querySelectorAll('.typeahead').forEach(function applyTypeahead(element) {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: element
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loaderContainer = document.querySelector('#loader-container');
  const reportSubmitButton = document.querySelector('#report-submit');
  const fileUpload = document.getElementById('file-upload');
  const uploadPageLoaderContainer = document.getElementById('upload-page-loading-spinner');
  const continueWithoutUpload = document.getElementsByName('continueWithoutUpload');

  if (loaderContainer) {
    document.querySelector('#report-submit .govuk-button').addEventListener('click', () => {
      loaderContainer.classList.add('spinner-loader');
      reportSubmitButton.classList.add('visuallyhidden');
    });
  }

  if (fileUpload) {
    fileUpload.addEventListener('change', () => {
      document.querySelector('[name=file-upload-form]').submit();
      uploadPageLoaderContainer.style.display = 'flex';
      fileUpload.disabled = true;
      fileUpload.ariaDisabled = true;
      continueWithoutUpload.forEach(a => {
        a.disabled = true;
        a.ariaDisabled = true;
      });
    });
  }
});
