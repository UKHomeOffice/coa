const config = require('../../../config');
const DEFAULTS = config.sessionDefaults;

module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    req.sessionModel.set('steps', DEFAULTS.steps);
    return super.getValues(req, res, next);
  }
};
