module.exports = superclass => class extends superclass {
  process(req) {
    const whoIsApplying = req.sessionModel.get('who-are-you');
    const applicantName = req.sessionModel.get('applicant-full-name');
    const getContent = whoIsApplying ===  'applicant' ? 'your' : `${applicantName}’s`;
    req.sessionModel.set('placeHolderForOnBehalfOf', getContent);
    req.log('info', `placeHolderForOnBehalfOf: ${req.sessionModel.get('placeHolderForOnBehalfOf')}`);
    super.process.apply(this, arguments);
  }
};
