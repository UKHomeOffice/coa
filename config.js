'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';

module.exports = {
  dateLocales: 'en-GB',
  dateFormat: {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  },
  env: env,
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_KEY,
    caseworkerEmail: process.env.CASEWORKER_EMAIL,
    userConfirmationTemplateId: process.env.USER_CONFIRMATION_TEMPLATE_ID,
    businessConfirmationTemplateId: process.env.BUSINESS_CONFIRMATION_TEMPLATE_ID
  },
  feedbackUrl: process.env.FEEDBACK_URL,
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  sessionDefaults: {
    steps: ['/overview', '/what-you-need', '/proof-of-identity', '/proof-of-address', '/update-details']
  },
  upload: {
    maxFileSizeInBytes: 25 * 1024 * 1024, // 25MiB in bytes
    hostname: process.env.FILE_VAULT_URL,
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
  },
  aws: {
    bucket: process.env.AWS_BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: process.env.AWS_SIGNATURE_VERSION,
    kmsKeyId: process.env.AWS_KMS_KEY_ID,
    region: process.env.AWS_REGION
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  }
};
