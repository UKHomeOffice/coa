'use strict';

const config = require('../../../config');
const Model = require('../models/file-upload');

module.exports = name => superclass => class extends superclass {
  process(req) {
    if (req.files && req.files[name]) {
      // set document name on values for filename extension validation
      // N:B validation controller gets values from
      // req.form.values and not on req.files
      req.form.values[name] = req.files[name].name;
      req.log('info', `Processing document: ${req.form.values[name]}`);
    }
    super.process.apply(this, arguments);
  }

  validateField(key, req) {
    if (req.body['upload-file']) {
      const fileUpload = req.files[name];

      if (fileUpload) {
        const uploadSize = fileUpload.size;
        const mimetype = fileUpload.mimetype;
        
        const uploadSizeTooBig = uploadSize > config.upload.maxFileSizeInBytes;
        const uploadSizeBeyondServerLimits = uploadSize === null;
        const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype);
        const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;

        if (invalidSize || invalidMimetype) {
          return new this.ValidationError('document-file', {
            type: invalidSize ? 'maxFileSize' : 'fileType',
            redirect: undefined
          });
        }
      } else {
        return new this.ValidationError('document-file', {
          type: 'required',
          redirect: undefined
        });
      }
    }
    return super.validateField(key, req);
  }

  saveValues(req, res, next) {
    if (req.body['upload-file']) {

      const documentCategory = req.body['upload-file'];
      const documentsByCategory = req.sessionModel.get(documentCategory) || [];

      if (req.files[name]) {
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
            return super.saveValues(req, res, next);
          })
          .catch(next);
      }
    }
    return super.saveValues.apply(this, arguments);
  }
};