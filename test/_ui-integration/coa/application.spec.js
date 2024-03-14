describe('the journey of the coa app', () => {
  let testApp;
  let initSession;
  let parseHtml;

  const SUBAPP = '';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    getUrl = testApp.getUrl;
    passStep = testApp.passStep;
    initSession = testApp.initSession;
    parseHtml = testApp.parseHtml;
  });

  it('goes to the overview page', async () => {
    const URI = '/overview';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Overview/);
  });

  it('goes to the what-you-need page', async () => {
    const URI = '/what-you-need';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/What you will need/);
  });

  it('goes to the what-you-need page', async () => {
    const URI = '/proof-of-identity';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Proof of identity/);
  });

  it('goes to the proof-of-address page', async () => {
    const URI = '/proof-of-address';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Proof of address/);
  });

  it('goes to the update-details page', async () => {
    const URI = '/update-details';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Update your details/);
  });
});
