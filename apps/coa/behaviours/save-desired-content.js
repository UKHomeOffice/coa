module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    // nameWithPossession returns the name which puts an ('s) on the end of the applicant's name.
    // If the name ends with S, its just returns the applicant's name with apostrophe (') at end.
    const applicantName = req.sessionModel.get('applicant-full-name');
    const nameWithPossession = applicantName + (applicantName.toLowerCase().endsWith('s') ? '’' : '’s');
    req.sessionModel.set('nameWithPossession', nameWithPossession);
    return super.getValues(req, res, next);
  }

  saveValues(req, res, next) {
    const whoIsApplying = req.form.values['who-are-you'];
    const isApplicant = whoIsApplying === 'applicant' ? true : false;
    req.sessionModel.set('isApplicant', isApplicant);
    return super.saveValues(req, res, next);
  }
};