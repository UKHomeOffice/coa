module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    req.sessionModel.reset();
    return locals;
  }
};
