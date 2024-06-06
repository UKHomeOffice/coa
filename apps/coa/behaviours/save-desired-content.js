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
    const isLegalRep = whoIsApplying === 'legal-representative' ? true : false;
    req.sessionModel.set('isApplicant', isApplicant);
    req.sessionModel.set('isLegalRep', isLegalRep);
    return super.saveValues(req, res, next);
  }
};
