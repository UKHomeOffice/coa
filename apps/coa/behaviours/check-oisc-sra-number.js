const validators = require('hof/controller/validation/validators');

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    const oiscOrSraNumber = req.form.values['oisc-sra-number'];
    const maxLength = 8;
    const minLength = 5;
    if (validators.numeric(oiscOrSraNumber) &&
        (oiscOrSraNumber.length < minLength || oiscOrSraNumber.length > maxLength )) {
      return next({
        'oisc-sra-number': new this.ValidationError(
          'oisc-sra-number',
          {
            type: 'checkSRANum'
          })
      });
    }
    if(!validators.numeric(oiscOrSraNumber) && !validators.regex(oiscOrSraNumber.toUpperCase(), /^[A-Z]\d{9}$/)) {
      return next({
        'oisc-sra-number': new this.ValidationError(
          'oisc-sra-number',
          {
            type: 'checkOISCNum'
          })
      });
    }
    super.validate(req, res, next);
    return next;
  }
};
