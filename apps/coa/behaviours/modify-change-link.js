'use strict';

const _ = require('lodash');

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    // set change link for dependants field to /dependant-summary page
    if (locals.route === 'confirm') {
      _.forEach(locals.rows, fields => {
        locals.rows = locals.rows.map(row => {
          if (row.section === 'Change details') {
            _.forEach(fields, sectionFields => {
              _.forEach(sectionFields, field => {
                if (field.field === 'dependants') {
                  field.changeLink = '/dependant-summary';
                }
              });
            });
            return row;
          }
          return row;
        });
      });
    }
    return locals;
  }
};
