module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    if (req.originalUrl.includes('/edit')) {
      const addressSteps = [
        '/postal-address', '/old-address', '/legal-details', '/home-address', '/upload-postal-address',
        '/upload-postal-address-summary', '/upload-address', '/upload-address-summary'
      ];
      const currentUserSession = req.sessionModel.get('steps');
      const stepsToKeep = currentUserSession.filter(step => !addressSteps.includes(step));
      req.sessionModel.unset('steps');
      req.sessionModel.set('steps', stepsToKeep);
    }
    return super.getValues(req, res, next);
  }
};
