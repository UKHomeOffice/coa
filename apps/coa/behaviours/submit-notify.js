module.exports = superclass => class extends superclass {
  async successHandler(req, res, next) {
    try {
	    const crs = await import('crypto-random-string');
	    const uniqueRefNumber = crs.default({ length: 6, characters: 'ABCDEFGHJKMNPRTUVWXY0123456789' });
	    req.sessionModel.set('uniqueRefNumber', uniqueRefNumber);
    } catch (error) {
      req.log('error', 'coa_uniqueRefNumber_Failed to generate unique reference number:', error);
      return next(Error(`Failed to generate unique reference number: ${error}`));
    }
    return super.successHandler(req, res, next);
  }
};
