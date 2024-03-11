const config = require('../../../config');
const DEFAULTS = config.sessionDefaults;

module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    // Setting first four pages as session default so we are able to access them when the app starts
    // is there a better way to do this?
    req.sessionModel.set('steps', DEFAULTS.steps);
    return super.getValues(req, res, next);
  }
};
