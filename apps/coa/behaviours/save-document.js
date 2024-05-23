'use strict';

const config = require('../../../config');
const Model = require('../models/file-upload');

module.exports = (documentCategory, name) => superclass => class extends superclass {
  process(req) {
    if (req.files && req.files[name]) {
      req.form.values[name] = req.files[name].name;
      req.log('info', `Processing document: ${req.form.values[name]}`);
    }
    super.process.apply(this, arguments);
  }

  validateField(key, req) {
    const fileToBeValidated = req.files[name];
    const documentsByCategory = req.sessionModel.get(documentCategory) || [];
    const validationErrorFunc = type => new this.ValidationError(key, { type: type });

    // When click Continue without uploading a file.
    if (req.body.Continue && documentsByCategory.length === 0) {
      return validationErrorFunc('required');
    // This Else If statement can be removed once the new design implemented for ID docs Upload screen
    } else if (!req.body.Continue && !fileToBeValidated) {
      return validationErrorFunc('required');
    } else if (fileToBeValidated) {
      const uploadSize = fileToBeValidated.size;
      const mimetype = fileToBeValidated.mimetype;
      const numberOfDocsUploaded = documentsByCategory.length;

      const uploadSizeTooBig = uploadSize > config.upload.maxFileSizeInBytes;
      const uploadSizeBeyondServerLimits = uploadSize === null;

      const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;
      const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype);

      const maxIdDocsUploadsExceeds = (documentCategory === 'identity-documents')
        && numberOfDocsUploaded > config.upload.maxIdDocsUploads;

      const maxAddressDocsUploadsExceeds = (documentCategory === 'home-address-documents'
        || documentCategory === 'postal-address-documents')
        && numberOfDocsUploaded >= config.upload.maxAddressDocsUploads;

      const maxCertOfAuthorityUploadsExceeds = (documentCategory === 'certificate-of-authority')
        && numberOfDocsUploaded >= config.upload.maxCertOfAuthorityUploads;

      const isDuplicateFile = documentsByCategory.some(file => file.name === req.files[name].name);

      if (invalidSize) {
        return validationErrorFunc('maxFileSize');
      } else if (invalidMimetype) {
        return validationErrorFunc('fileType');
      } else if (maxIdDocsUploadsExceeds) {
        return validationErrorFunc('maxIdDocsUploads');
      } else if (maxAddressDocsUploadsExceeds) {
        return validationErrorFunc('maxAddressDocsUploads');
      } else if (maxCertOfAuthorityUploadsExceeds) {
        return validationErrorFunc('maxCertOfAuthorityUploads');
      } else if (isDuplicateFile) {
        return validationErrorFunc('isDuplicateFileName');
      }
    }
    return super.validateField(key, req);
  }

  saveValues(req, res, next) {
    const documentsByCategory = req.sessionModel.get(documentCategory) || [];

    if (!req.body.Continue && req.files[name]) {
      req.log('info', `Saving document: ${req.files[name].name} in ${documentCategory} category`);

      const document = {
        name: req.files[name].name,
        data: req.files[name].data,
        mimetype: req.files[name].mimetype
      };
      const model = new Model(document);

      return model.save()
        .then(() => {
          req.sessionModel.set(documentCategory, [...documentsByCategory, model.toJSON()]);

          // TODo: The below If condition is added for Identity document (Old Design). For New flow this can be removed.
          if (name === 'document-file') {
            return super.saveValues(req, res, next);
          }

          return res.redirect(`${req.baseUrl}${req.path}`);
        })
        .catch(next);
    }

    return super.saveValues.apply(this, arguments);
  }
};
