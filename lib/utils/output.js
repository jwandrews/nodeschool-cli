// -----------------------------------------------------------------------------
// Imports

const Utils = require( './' );

module.exports = {
  ColumnAlignment() {
    return [ 'l', 'c' ];
  },

  Headings() {
    return Utils.getHeadings( 'Module Name', 'Installed?' );
  }
};
