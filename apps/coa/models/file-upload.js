/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');
const Model = require('hof').model;
const uuid = require('uuid').v4;

const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  save() {
    if (!config.upload.hostname) {
      logger.error('File-vault hostname is not defined');
      return Promise.reject(new Error('File-vault hostname is not defined'));
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
      return this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    })
      .then(result => {
        return this.set({
          url: result.url
        });
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
        if (err || response.statusCode !== 200) {
          let errorMsg = 'Error occurred';
          if (err) {
            errorMsg += ': ' + err;
          } else {
            errorMsg += '. Status code: ' + response.statusCode;
          }
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

        return resolve({
          bearer: parsedBody.access_token
        });
      });
    });
  }
};
