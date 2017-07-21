#!/usr/bin/env node

// -----------------------------------------------------------------------------
// CLI Program
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Imports

const meow = require( 'meow' );
const chalk = require( 'chalk' );
const table = require( 'text-table' );
const cheerio = require( 'cheerio' );

const pkg = require( '../package' );
const NodeSchool = require( '../lib/Nodeschool' );
const Utils = require( '../lib/utils' );
const Output = require( '../lib/utils/output' );

// -----------------------------------------------------------------------------
// Debugging

require( 'loud-rejection' )();

// -----------------------------------------------------------------------------
// Parse Input

const cli = meow(
  {
    description: false,
    help: `
  Usage
    $ ${Object.keys( pkg.bin )[0]}

  Commands
    list -- Lists nodeschool workshops and whether or not they are installed on your system.

  Options
    --help, -h   Displays help on using this tool.
`
  },
  {
    alias: {
      l: [ 'ls', 'list' ],
      h: 'help'
    }
  }
);

// -----------------------------------------------------------------------------
// Program Commands

// LIST
if ( cli.input.indexOf( 'list' ) > -1 ) {
  ( async () => {
    const courses = await NodeSchool.getCourses();
    const { response, isCachedResponse } = courses;

    const $ = cheerio.load( response );
    let commands = [];

    isCachedResponse
      ? console.log( chalk.dim( 'Loaded data from cache.' ))
      : console.log( chalk.dim( 'Fetched data from source.' ));

    $( '.workshopper[id] code' ).each(( i, e ) => {
      const moduleName = Utils.parseModuleName( $( e ).text());
      const moduleInstalled = Utils.checkInstalled( moduleName );

      let moduleRow = [
        moduleInstalled ? chalk.bold( moduleName ) : chalk.dim( moduleName ),
        moduleInstalled ? chalk.green( '✓' ) : chalk.red( '✕' )
      ];

      if ( moduleInstalled ) {
        commands.unshift( moduleRow );
      } else if ( moduleName !== undefined ) {
        commands.push( moduleRow );
      }
    });

    console.log(
      table(
        Output.Headings.concat( commands.filter( cmd => cmd[0].indexOf( ':' ) < 0 )),
        {
          align: Output.ColumnAlignment
        }
      )
    );
  })();
}
