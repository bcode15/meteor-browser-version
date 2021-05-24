const minVersions = __meteor_runtime_config__.minVersions;

Meteor.startup(async function browserVersionStartup() {
  // Dynamically load the calculation function, if necessary
  // otherwise the file will be whitelisted for the meteor server
  // so that the server can support dynamic requests from statically served clients
  if(minVersions) {
    await import('./browser-version-calculate');
  } else {
    // make sure there is no cookie remnant
    document.cookie = "browser-js=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  }
});
