/* eslint-disable no-var, vars-on-top */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');

const accessibleAutocomplete = require('accessible-autocomplete');
const config = require('../../config.js');

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
  const removeLinks = document.querySelectorAll('#uploaded-documents > div > div > a');

  if (loaderContainer) {
    document.querySelector('#report-submit .govuk-button').addEventListener('click', () => {
      loaderContainer.classList.add('spinner-loader');
      reportSubmitButton.classList.add('visuallyhidden');
    });
  }

  const fileUploadStatusHandler = (status, errorType) => {
    const fileUploadComponent = document.getElementById('hofFileUpload');
    const fileUploadErrorMsg = fileUploadComponent.querySelector('.govuk-error-message');
    switch (status) {
      case 'ready':
        if (fileUploadComponent) {
          fileUploadComponent.classList.remove('govuk-form-group--error');
        }
        if (fileUploadErrorMsg) {
          fileUploadErrorMsg.classList.add('govuk-!-display-none');
        }
        break;
      case 'error':
        if (fileUploadComponent) {
          fileUploadComponent.classList.add('govuk-form-group--error');
          document.getElementById(`file-upload-error-${errorType}`).classList.remove('govuk-!-display-none');
        }
        break;
      case 'uploading':
        uploadPageLoaderContainer.style.display = 'flex';
        fileUpload.disabled = true;
        fileUpload.ariaDisabled = true;
        continueWithoutUpload.forEach(a => {
          a.disabled = true;
          a.ariaDisabled = true;
        });
        removeLinks.forEach(a => {
          a.classList.add('disabled-link');
        });
        break;
      default:
        break;
    }
  };

  if (fileUpload) {
    fileUpload.addEventListener('change', () => {
      fileUploadStatusHandler('ready');
      const fileInfo = fileUpload.files && fileUpload.files.length > 0 ? fileUpload.files[0] : null;
      if (fileInfo) {
        if (fileInfo.size > config.upload.maxFileSizeInBytes) {
          fileUploadStatusHandler('error', 'maxFileSize');
          return;
        }
        if (!config.upload.allowedMimeTypes.includes(fileInfo.type) ) {
          fileUploadStatusHandler('error', 'fileType');
          return;
        }
      }

      document.querySelector('[name=file-upload-form]').submit();
      fileUploadStatusHandler('uploading');
    });
  }
});
