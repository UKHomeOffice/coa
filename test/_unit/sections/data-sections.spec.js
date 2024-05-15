const summarySections = require('../../../apps/coa/sections/summary-data-sections.js');
const changeDetailsSections = require('../../../apps/coa/sections/change-details-data-sections.js');
const pages = require('../../../apps/coa/translations/src/en/pages.json');

describe('Apply Data Sections in summary and submission page', () => {
  describe('Summary page data sections and Pages', () => {
    it('should have summary page data sections and page translations that correlate', () => {
      const sectionsKeys = Object.keys(summarySections).sort();
      const pagesSectionsKeys = Object.keys(pages.confirm.sections).sort();
      expect(pagesSectionsKeys).to.include.members(sectionsKeys);
    });
  });

  describe('Submission page data sections and Pages', () => {
    it('should have submission page updated details data sections and page translations that correlate', () => {
      const sectionsKeys = Object.keys(changeDetailsSections).sort();
      const pagesSectionsKeys = Object.keys(pages.confirm.sections).sort();
      expect(pagesSectionsKeys).to.include.members(sectionsKeys);
    });
  });
});
