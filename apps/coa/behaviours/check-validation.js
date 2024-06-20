const validators = require('hof/controller/validation/validators');

module.exports = superclass => class extends superclass {
  validateField(key, req) {
    const validationErrorFunc = type => new this.ValidationError(key, { type: type });

    if((!req.sessionModel.get('isLegalRep') && key === 'telephone') ||
        (req.sessionModel.get('isLegalRep') && key === 'client-telephone')) {
      const phoneNumber = req.form.values.telephone || req.form.values['client-telephone'];
      if(phoneNumber.length > 0) {
        const phoneNumberWithoutSpace = phoneNumber.replace(/\s+/g, '').trim();
        const isValidphoneNumber = validators.regex(phoneNumberWithoutSpace, /^\(?\+?[\d()-]{8,16}$/);
        if(!isValidphoneNumber  || !validators.internationalPhoneNumber(phoneNumber)) {
          return validationErrorFunc('internationalPhoneNumber');
        }
      }
    }

    if (key === 'oisc-sra-number') {
      const oiscOrSraNumber = req.form.values['oisc-sra-number'];
      const maxLength = 8;
      const minLength = 5;
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
