/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');
const Model = require('hof').model;
const uuid = require('uuid').v4;

const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

function sanitizeReqConf(reqConf) {
  const sanitized = { ...reqConf };
  sanitized.formData.document.value = '**REDACTED**';
  return sanitized;
}

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  save() {
    if (!config.upload.hostname) {
      logger.error('File-vault hostname is not defined');
      throw new Error('File-vault hostname is not defined');
    }

    return new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      reqConf.formData = {
        document: {
          value: this.get('data'),
          options: {
            filename: this.get('name'),
            contentType: this.get('mimetype')
          }
        }
      };
      reqConf.method = 'POST';

      return this.request(reqConf, (err, response) => {
        if (err) {
          logger.error(`File upload failed: ${err.message},
            error: ${JSON.stringify(err)},
            reqConf: ${JSON.stringify(sanitizeReqConf(reqConf))}`);
          return reject(new Error(`File upload failed: ${err.message}`));
        }

        if (Object.keys(response).length === 0) {
          return reject(new Error('Received empty response from file-vault'));
        }

        logger.info(`Received response from file-vault with keys: ${Object.keys(response)}`);
        return resolve(response);
      });
    })
      .then(result => {
        try {
          return this.set({
            url: result.url.replace('/file/', '/file/generate-link/').split('?')[0]
          });
        } catch (err) {
          logger.error(`No url in response: ${err.message}`);
          throw new Error(`No url in response: ${err.message}`);
        }
      })
      .then(() => {
        return this.unset('data');
      });
  }

  auth() {
    const requiredProperties = ['token', 'username', 'password', 'clientId', 'secret'];

    for (const property of requiredProperties) {
      if (!config.keycloak[property]) {
        logger.error(`Keycloak ${property} is not defined`);
        return Promise.reject(new Error(`Keycloak ${property} is not defined`));
      }
    }

    const tokenReq = {
      url: config.keycloak.token,
      form: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };

    return new Promise((resolve, reject) => {
      return this._request(tokenReq, (err, response) => {
        if (err) {
          const errorMsg = `Error occurred: ${JSON.stringify(err)}`;
          logger.error(errorMsg);
          return reject(new Error(errorMsg));
        }

        let parsedBody;
        try {
          parsedBody = JSON.parse(response.body);
        } catch (parseError) {
          logger.error(`Failed to parse response body: ${parseError}`);
          return reject(new Error(`Failed to parse response body: ${parseError}`));
        }

        if (!parsedBody.access_token) {
          logger.error('No access token in response');
          return reject(new Error('No access token in response'));
        }

        logger.info('Successfully retrieved access token');
        return resolve({
          bearer: parsedBody.access_token
        });
      });
    });
  }
};
