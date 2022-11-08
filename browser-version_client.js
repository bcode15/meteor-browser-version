import { Meteor } from 'meteor/meteor';
import './browser-version-calculate';
/* global __meteor_runtime_config__ */

const minVersions = __meteor_runtime_config__.minVersions;

Meteor.startup(async function browserVersionStartup() {
  // if minVersions is defined then the version calc code needs to be loaded
  // This should only be true for files statically compiled with mstatic
  if(!minVersions) {
    // make sure there is no cookie remnant
    document.cookie = "browser-js=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  }
});
