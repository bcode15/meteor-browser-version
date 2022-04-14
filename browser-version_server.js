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
    // Output path for minVersions.json file
    if(!process.env.BROWSER_VERSION_OUTPATH) throw new Error(`BROWSER_VERSION_OUTPATH must be defined`);
    const outPath = path.normalize(process.env.BROWSER_VERSION_OUTPATH + '/minVersions.json');
    console.log(`saving minVersions in ${outPath}: `, minVersions);
    try {
      fs.outputFileSync(outPath, JSON.stringify(minVersions));
    } catch(e) {
      console.error(`Failed to write: ${outPath}`);
      throw new Error(e.message);
    }
  });
}
