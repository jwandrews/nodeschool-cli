// Packages
const request = require( 'request-promise-native' );
const CacheConf = require( 'cache-conf' );

// Ours
const PkgCache = new CacheConf();

// Variables
const ONE_DAY = 86400000;

class Nodeschool {
  constructor( url, opts = {}) {
    // Class Variables
    this.url = url;
    this.options = Object.assign({ cacheKey: 'ns-cli' }, opts );
  }

  get() {
    return this._getFromFetchOrCache( this.url, {
      cacheKey: `${this.options.cacheKey}`
    });
  }

  describe() {
    return this.Cache;
  }

  clearCache() {
    PkgCache.clear();
  }

  _getFromFetchOrCache( url, { cacheKey }) {
    return new Promise(( resolve, reject ) => {
      if ( PkgCache.has( cacheKey ) && !PkgCache.isExpired( cacheKey )) {
        resolve({
          response: this._getResponseFromCache( cacheKey ),
          isCachedResponse: true
        });
      } else {
        request( url ).then( data => {
          PkgCache.set( cacheKey, data, { maxAge: ONE_DAY });
          resolve({ response: data, isCachedResponse: false });
        });
      }
    });
  }

  _getResponseFromCache( cacheKey ) {
    return PkgCache.get( cacheKey );
  }

  get Cache() {
    return PkgCache.store;
  }
}

module.exports = Nodeschool;
