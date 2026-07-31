'use strict';

process.env.NODE_ENV = 'test';

global.reqres = require('hof').utils.reqres;

const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai.default || sinonChai);
global.chai = chai;
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');
process.setMaxListeners(0);
process.stdout.setMaxListeners(0);

const utils = require('./helpers/supertest_session/supertest-utilities.js');
global.getSupertestApp = (subApp, subAppPath, pages) => utils.getSupertestApp(subApp, subAppPath, pages);
