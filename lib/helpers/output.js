const Helpers = require( './index' );

class Output {
  static get ColumnAlignment() {
    return [ 'l', 'c' ];
  }

  static get Headings() {
    return Helpers.getHeadings( 'Module Name', 'Installed?' );
  }
}

module.exports = Output;
