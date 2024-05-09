module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    if (req.originalUrl.includes('/edit')) {
      const matchedSteps = [];
      const addressSteps = [
        '/postal-address', '/old-address', '/legal-details', '/home-address', '/upload-postal-address',
        '/upload-postal-address-summary', '/upload-address', '/upload-address-summary'
      ];
      const currentUserSession = req.sessionModel.get('steps');
      // loop through the user session to check which address steps the user has completed
      currentUserSession.forEach(function (step) {
        addressSteps.forEach(function (addressStep) {
          if (step === addressStep) {
            matchedSteps.push(step);
          }
        });
      });
      // remove address steps from the current user session
      const stepsToKeep = currentUserSession.filter(step => !matchedSteps.includes(step));
      req.sessionModel.unset('steps');
      req.sessionModel.set('steps', stepsToKeep);
    }
    return super.getValues(req, res, next);
  }
};
