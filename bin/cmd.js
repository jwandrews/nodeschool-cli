#!/usr/bin/env node

// Packages
const meow = require( 'meow' );
const chalk = require( 'chalk' );
const table = require( 'text-table' );
const cheerio = require( 'cheerio' );

// Ours
const NodeschoolClass = require( '../lib/Nodeschool' );
const Helpers = require( '../lib/helpers' );
const NSResponse = new NodeschoolClass( Helpers.URL );
const Output = require( '../lib/helpers/output' );

// Debugging
require( 'loud-rejection' )();

// Parse Input
const cli = meow(
  {
    description: false,
    help: `
  Usage
    $ ns-cli

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

// Program
// LIST
if ( cli.input.indexOf( 'list' ) > -1 ) {
  NSResponse.get().then(({ response, isCachedResponse }) => {
    const $ = cheerio.load( response );
    let commands = [];

    isCachedResponse
      ? console.log( chalk.dim( 'Loaded data from cache.' ))
      : console.log( chalk.dim( 'Fetched data from source.' ));

    $( '.workshopper[id] code' ).each(( i, e ) => {
      const moduleName = Helpers.parseModuleName( $( e ).text());
      const moduleInstalled = Helpers.checkInstalled( moduleName );

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
  });
}
