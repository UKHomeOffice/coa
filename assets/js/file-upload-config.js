/**
 * Shared file upload configuration used by both frontend and backend.
 */

module.exports = {
  maxFileSizeInBytes: 25 * 1024 * 1024, // 25MiB in bytes
  allowedMimeTypes: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ],
  documentCategories: {
    'identity-documents': {
      limit: 6,
      limitValidationError: 'maxIdDocsUploads'
    },
    'home-address-documents': {
      limit: 3,
      limitValidationError: 'maxAddressDocsUploads'
    },
    'postal-address-documents': {
      limit: 3,
      limitValidationError: 'maxAddressDocsUploads'
    },
    'letter-of-authority': {
      limit: 1,
      limitValidationError: 'maxCertOfAuthorityUploads'
    }
  }
};
