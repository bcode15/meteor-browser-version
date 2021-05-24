const minVersions = __meteor_runtime_config__.minVersions;

if(minVersions) {
  Meteor.startup(async function browserVersionStartup() {
    const {UAParser} = await import('ua-parser-js');
    let parser = new UAParser();
    const browser = parser.getBrowser();
  
    // Go get the current cookies
    const cookies = document.cookie.split(';')
    .reduce((obj, _c) => {
      let v = _c.trim().split('=');
      obj[v[0]] = v[1];
      return obj;
    }, {})
  
    browser.name = browser.name.toLocaleLowerCase();
    browser.versions = browser.version.split('.');
    browser.js = 'legacy';
  
    const bMin = minVersions[browser.name];
    if(bMin) {
      // bMin is either the major number or an array of numbers
      if(typeof bMin === 'number' && browser.versions[0] >= bMin) browser.js = 'modern';
      else {
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
  });
} else {
  // make sure there is no cookie remnant
  document.cookie = "browser-js=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}
