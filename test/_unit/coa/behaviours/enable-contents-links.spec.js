const Behaviour = require('../../../../apps/coa/behaviours/enable-contents-links');
const Controller = require('hof').controller;


describe('#locals', () => {
  let req;
  let res;
  let controller;

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const DisableContentsLinks = Behaviour(Controller);
    controller = new DisableContentsLinks({ template: 'index', route: '/index' });
    controller._configure(req, res, done);
  });

  it('should have disableLinkOverview property if route is /overview', () => {
    req.form.options.route = '/overview'
    controller.locals(req, res).should.have.property('disableLinkOverview');
  })
  it('should have disableLinkWhatYouNeed property if route is /what-you-need', () => {
    req.form.options.route = '/what-you-need'
    controller.locals(req, res).should.have.property('disableLinkWhatYouNeed');
  })
  it('should have disableLinkWhatYouNeed property if route is /proof-of-identity', () => {
    req.form.options.route = '/proof-of-identity'
    controller.locals(req, res).should.have.property('disableLinkProofOfIdentity');
  })
  it('should have disableLinkProofOfAddress property if route is /proof-of-address', () => {
    req.form.options.route = '/proof-of-address'
    controller.locals(req, res).should.have.property('disableLinkProofOfAddress');
  })
  it('should have disableLinkUpdateDetails property if route is /update-details', () => {
    req.form.options.route = '/update-details'
    controller.locals(req, res).should.have.property('disableLinkUpdateDetails');
  })
}) 