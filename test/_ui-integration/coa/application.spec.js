// Need a better way to check the correct page is loaded, but can't use h2 because there are more than h2s
// Usually we would use h1 to check the page, but h1 here is the same across all intro pages
describe('the journey of the coa app', () => {
  let testApp;
  let passStep;
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

    const header = docu.find('h1');

    header.html().should.match(/Update your details without an account/);
  });
  

  it('goes to the what-you-need page', async () => {
    const URI = '/what-you-need';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('h1');

    header.html().should.match(/Update your details without an account/);
  });

  it('goes to the what-you-need page', async () => {
    const URI = '/proof-of-identity';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('h1');

    header.html().should.match(/Update your details without an account/);
  });

  it('goes to the proof-of-address page', async () => {
    const URI = '/proof-of-address';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('h1');

    header.html().should.match(/Update your details without an account/);
  });

  it('goes to the update-details page', async () => {
    const URI = '/update-details';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('h1');

    header.html().should.match(/Update your details without an account/);
  });

});
