const validators = require('hof/controller/validation/validators');

module.exports = superclass => class extends superclass {
  validateField(key, req) {
    const oiscOrSraNumber = req.form.values['oisc-sra-number'];
    const maxLength = 8;
    const minLength = 5;
    const validationErrorFunc = type => new this.ValidationError(key, { type: type });

    if (key === 'oisc-sra-number') {
      const isValidNumeric = validators.numeric(oiscOrSraNumber);
      const isValidOISCFormat = validators.regex(oiscOrSraNumber, /^[A-Za-z]\d{9}$/);

      if ((isValidNumeric && (oiscOrSraNumber.length < minLength || oiscOrSraNumber.length > maxLength)) ||
            (!isValidNumeric && !isValidOISCFormat)) {
        return validationErrorFunc('OISCSRANum');
      }
    }
    return super.validateField(key, req);
  }
};
