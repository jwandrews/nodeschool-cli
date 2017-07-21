// -----------------------------------------------------------------------------
// NodeSchool Object
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Imports

const uuid = require( 'uuid' );
const fetch = require( 'node-fetch' );
const CacheConf = require( 'cache-conf' );
const { URL } = require( './constants' );

// -----------------------------------------------------------------------------
// Local Variables

const Config = new CacheConf();
const ONE_DAY = 86400000;

// -----------------------------------------------------------------------------
// Class

class NodeSchool {
  constructor( url, { cacheKey = `ns-cli:fetch-response` } = {}) {
    this._url = url;
    this._cacheKey = cacheKey;
  }

  getCourses() {
    return this._getFromFetchOrCache( this._url, {
      cacheKey: `${this._cacheKey}`
    });
  }

  describe() {
    return this.Cache;
  }

  clearCache() {
    Config.clear();
  }

  async _getFromFetchOrCache( url, { cacheKey = this._cacheKey }) {
    if ( Config.has( cacheKey ) && !Config.isExpired( cacheKey )) {
      return {
        response: this._getResponseFromCache( cacheKey ),
        isCachedResponse: true
      };
    } else {
      let res = await fetch( url );
      let data = await res.text();
      Config.set( cacheKey, data, { maxAge: ONE_DAY });
      return { response: data, isCachedResponse: false };
    }
  }

  _getResponseFromCache( cacheKey = this._cacheKey ) {
    return Config.get( cacheKey );
  }

  get Cache() {
    return Config.store;
  }
}

// -----------------------------------------------------------------------------
// Export

module.exports = new NodeSchool( URL );
