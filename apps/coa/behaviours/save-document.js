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
    const validationErrorFunc = (type, args) => new this.ValidationError(key, { type: type, arguments: [args] });
    // When click Continue without uploading a file.
    if (req.body.Continue && documentsByCategory.length === 0) {
      return validationErrorFunc('required');
    } else if (fileToBeValidated) {
      const uploadSize = fileToBeValidated.size;
      const mimetype = fileToBeValidated.mimetype;
      const uploadSizeTooBig = uploadSize > config.upload.maxFileSizeInBytes;
      const uploadSizeBeyondServerLimits = uploadSize === null;

      const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;
      const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype);

      const numberOfDocsUploaded = documentsByCategory.length;
      const documentCategoryConfig = config.upload.documentCategories[documentCategory];

      const isDuplicateFile = documentsByCategory.some(file => file.name === req.files[name].name);

      if (invalidSize) {
        return validationErrorFunc('maxFileSize', [config.upload.maxFileSizeInBytes]);
      } else if (invalidMimetype) {
        return validationErrorFunc('fileType', ['JPG, JPEG, PNG or PDF']);
      } else if (numberOfDocsUploaded >= documentCategoryConfig.limit) {
        return validationErrorFunc(documentCategoryConfig.limitValidationError, [documentCategoryConfig.limit]);
      } else if (isDuplicateFile) {
        return validationErrorFunc('isDuplicateFileName', [req.files[name].name]);
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
          return res.redirect(`${req.baseUrl}${req.path}`);
        })
        .catch(next);
    }

    return super.saveValues.apply(this, arguments);
  }
};
