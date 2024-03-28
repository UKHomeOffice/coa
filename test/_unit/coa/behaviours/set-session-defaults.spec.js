const setSessionDefaults = require('../../../../apps/coa/behaviours/set-session-defaults');
const Model = require('hof').model;


describe('#getValues', () => {
  let behaviour;
  let Behaviour;
  let superGetValuesStub;
  let req;
  let res;
  let next;

  class Base {}

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = sinon.stub();
    superGetValuesStub = sinon.stub();

    req.sessionModel = new Model({});

    Base.prototype.getValues = superGetValuesStub;
    sessionDefaults = {
      testSteps: ['/firststep', '/secondstep', '/thirdstep', '/fourthstep', '/fiftstep']
    };
    Behaviour = setSessionDefaults;
    Behaviour = Behaviour(Base);
    behaviour = new Behaviour();
  });

  describe('initialisation', () => {
    it('should be an instance', () => {
      expect(behaviour).to.be.an.instanceOf(Base);
    });
    it('should call super.getValues', () => {
      behaviour.getValues(req, res, next);
      superGetValuesStub.should.be.calledOnce;
    });
    it('sets session with default steps', () => {
      req.sessionModel.set('steps', sessionDefaults.testSteps);
      req.sessionModel.get('steps').should.eql(sessionDefaults.testSteps);
    });
  });
});
