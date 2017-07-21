// -----------------------------------------------------------------------------
// Nodeschool Object
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Imports

const uuid = require( 'uuid' );
const request = require( 'request-promise-native' );
const CacheConf = require( 'cache-conf' );
const Constants = require( './constants' );

// -----------------------------------------------------------------------------
// Local Variables

const Config = new CacheConf();
const ONE_DAY = 86400000;

// -----------------------------------------------------------------------------
// Class

class Nodeschool {
  constructor( url, { cacheKey = `ns-cli-${uuid()}` }) {
    this._url = url;
    this._cacheKey = cacheKey;
  }

  getCourses() {
    return this._getFromFetchOrCache( this.url, {
      cacheKey: `${this._cacheKey}`
    });
  }

  describe() {
    return this.Cache;
  }

  clearCache() {
    Config.clear();
  }

  _getFromFetchOrCache( url, { cacheKey = this._cacheKey }) {
    return new Promise(( resolve, reject ) => {
      if ( Config.has( cacheKey ) && !Config.isExpired( cacheKey )) {
        resolve({
          response: this._getResponseFromCache( cacheKey ),
          isCachedResponse: true
        });
      } else {
        request( url ).then( data => {
          Config.set( cacheKey, data, { maxAge: ONE_DAY });
          resolve({ response: data, isCachedResponse: false });
        });
      }
    });
  }

  _getResponseFromCache( cacheKey ) {
    return Config.get( cacheKey );
  }

  get url() {
    return this._url;
  }

  set url( url ) {
    this._url = url;
  }

  get Cache() {
    return Config.store;
  }
}

// -----------------------------------------------------------------------------
// Export

module.exports = new Nodeschool( Constants.URL );
