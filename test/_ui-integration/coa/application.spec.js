// There are more than one h2 headers in coa intro pages and the first one in the form is visually hidden
// This tries to select the visually hidden header in the form
// Is there a better way to do this test?  
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

    header.html().should.match(/Guidance pages in this service/);
  });

  it('goes to the what-you-need page', async () => {
    const URI = '/what-you-need';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Guidance pages in this service/);
  });

  it('goes to the what-you-need page', async () => {
    const URI = '/proof-of-identity';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Guidance pages in this service/);
  });

  it('goes to the proof-of-address page', async () => {
    const URI = '/proof-of-address';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Guidance pages in this service/);
  });

  it('goes to the update-details page', async () => {
    const URI = '/update-details';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('form h2');

    header.html().should.match(/Guidance pages in this service/);
  });
});
