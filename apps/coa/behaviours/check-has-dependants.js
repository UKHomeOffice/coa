module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    if (req.sessionModel.get('dependants')?.aggregatedValues.length > 0) {
      const currentSteps = req.sessionModel.get('steps');
      currentSteps.push('/update-dependant');
      req.sessionModel.set('steps', currentSteps);
      req.sessionModel.set('change-dependant-details', req.form.values['change-dependant-details']);
      return req.form.values['change-dependant-details'] === 'yes' ?
        res.redirect('/dependant-summary') :
        res.redirect('/check-answers');
    }
    return super.saveValues(req, res, next);
  }
};
