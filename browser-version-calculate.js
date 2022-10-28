/* global __meteor_runtime_config__, location */

const minVersions = __meteor_runtime_config__.minVersions;

// Calculations are in a separate file so that they are dynamically
// loaded for clients that need to do the calculation
// For the meteor server the included import will be whitelisted
// so that the dynamic data is set up for statically served clients
/**
 * Calculate if this browser meets the required level
 */
async function browserVersionCalculate() {
  const {UAParser} = await import('ua-parser-js');
  const parser = new UAParser();
  const browser = parser.getBrowser();

  // Go get the current cookies
  const cookies = document.cookie.split(';')
  .reduce((obj, _c) => {
    const v = _c.trim().split('=');
    obj[v[0]] = v[1];
    return obj;
  }, {})

  browser.name = browser.name.toLocaleLowerCase();
  browser.versions = browser.version.split('.');
  // legacy is default
  browser.js = 'legacy';

  const bMin = minVersions[browser.name];
  if(bMin) {
    // bMin is either the major number or an array of numbers
    if(typeof bMin === 'number' && browser.versions[0] >= bMin) browser.js = 'modern';
    else {
      // check 2nd & 3rd level browser version against bMin
      browser.js = 'modern';
      for(let i = 0; i < bMin.length; i++) {
        // All versions up to now have been equal to
        if(browser.versions[i] > bMin[i]) break;
        if(browser.versions[i] < bMin[i]) {
          browser.js = 'legacy';
          break;
        }
      }
    }
  }

  // cookie expires in 1 yr
  // always set it with new expiration
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
  document.cookie=`browser-js=${browser.js};same-site=strict;expires=${expiry.toUTCString()}`

  // The value updated, reload
  if(!cookies['browser-js'] || cookies['browser-js'] !== browser.js) {
    location.reload();
  }
}

browserVersionCalculate();
