module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    if (req.sessionModel.get('dependants')?.aggregatedValues) {
      const currentSteps = req.sessionModel.get('steps');
      currentSteps.push('/update-dependant');
      req.sessionModel.set('steps', currentSteps);
      req.sessionModel.set('change-dependant-details', req.form.values['change-dependant-details']);
      return res.redirect('/dependant-summary');
    }
    return super.saveValues(req, res, next);
  }
};
