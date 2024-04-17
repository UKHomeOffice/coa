/* eslint-disable max-len */
module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    const formFiller = req.sessionModel.get('who-are-you');
    const applicantName = req.sessionModel.get('applicant-full-name');

    function grammar(name) {
      return name[name.length - 1].toLowerCase() === 's' ? "'" : "'s";
    }

    let message;

    switch (formFiller) {
      case 'legal-representative':
        message = 'For security, you must provide us with information from an identity document that UK Visas and Immigration has on your client’s record.';
        break;

      case 'someone-else':
        message = `For security, you must provide us with information from an identity document that UK Visas and Immigration has on ${applicantName + grammar(applicantName)} record.`;
        break;

      default:
        message = 'For security, you must provide us with information from an identity document that UK Visas and Immigration has on your record.';
        break;
    }

    locals.securityMessage = message;

    return locals;
  }
};
