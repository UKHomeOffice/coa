module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    const currentUrl = locals.route

    // enable contents links if user is not on current page
    if (currentUrl === 'overview') {
      locals.disableLinkOverview = true;
      return locals;
    }

    if (currentUrl === 'what-you-need') {
      locals.disableLinkWhatYouNeed = true;
      return locals;
    }

    if (currentUrl === 'proof-of-identity') {
      locals.disableLinkProofOfIdentity = true;
      return locals;
    }

    if (currentUrl === 'proof-of-address') {
      locals.disableLinkProofOfAddress = true;
      return locals;
    }

    if (currentUrl === 'update-details') {
      locals.disableLinkUpdateDetails = true;
      return locals;
    }

    return locals;
  }
}