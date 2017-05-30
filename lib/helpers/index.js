// Packages
const chalk = require( 'chalk' );
const commandExists = require( 'command-exists' );

class Helpers {
  static get URL() {
    return 'https://nodeschool.io';
  }

  static isOptionalArg( value ) {
    return value.indexOf( '-' ) !== 0;
  }

  static parseModuleName( command ) {
    const arr = command.split( ' ' ).slice( 2 );
    return arr.filter( this.isOptionalArg )[0];
  }

  static checkInstalled( moduleName ) {
    return commandExists.sync( moduleName );
  }

  static getHeadings( col1Name, col2Name ) {
    const col1Heading = chalk.bold( col1Name );
    const col2Heading = chalk.bold( col2Name );

    const col1Separator = chalk.dim(
      col1Name.split( '' ).map( ltr => '-' ).join( '' )
    );

    const col2Separator = chalk.dim(
      col2Name.split( '' ).map( ltr => '-' ).join( '' )
    );

    return [[ col1Heading, col2Heading ], [ col1Separator, col2Separator ]];
  }
}

module.exports = Helpers;
