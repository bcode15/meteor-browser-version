import fs from 'fs-extra';
import path from 'path';
import {getMinimumBrowserVersions} from 'meteor/modern-browsers';
const _ = require('lodash');
if(Meteor.isDevelopment) {
  Meteor.startup(() => {
    // create minimum versions data
    const minVersions = _.reduce(getMinimumBrowserVersions(), (obj, val, key) => {
      obj[key] = val.version;
      return obj;
    }, {});
    // Meteor development runs from .meteor/local/build/programs/server
    // want to write out to the meteor private/static directory
    const outPath = path.normalize(process.cwd() + '/../../../../../private/meteor-static/minVersions.json');
    console.log(`saving minVersions in ${outPath}: `, minVersions);
    try {
      fs.outputFileSync(outPath, JSON.stringify(minVersions));
    } catch(e) {
      console.error(`Failed to write: ${outPath}`);
      throw new Error(e.message);
    }
  });
}
