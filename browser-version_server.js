import fs from 'fs-extra';
import {getMinimumBrowserVersions} from 'meteor/modern-browsers';
import {_} from 'lodash';

if(Meteor.isDevelopment) {
  Meteor.startup(() => {
    // create minimum versions data
    const minVersions = _.reduce(getMinimumBrowserVersions(), (obj, val, key) => {
      // no key is equal to infinity
      if(val.version === Infinity) return obj;
      obj[key] = val.version;
      return obj;
    }, {});
    // Output path for minVersions.json file
    // projRoot is prior to .meteor directory
    const projRoot = cwd = process.cwd().split('/.meteor')[0];
    const outPath = projRoot + '/private/mstatic/minVersions.json';
    let minVer;
    try {
      minVer = fs.readFileSync(outPath, {encoding: 'utf-8'});
    } catch(e) {
      if(e.code !== 'ENOENT') throw new Error(e);
      console.info(`Browser-version creating: ${outPath}`);
    }
    // Nothing new, bail
    if(minVer && _.isEqual(JSON.parse(minVer), minVersions)) return;

    console.warn(`RESTARTING: saving minVersions in ${outPath}: `, minVersions);
    try {
      fs.outputFileSync(outPath, JSON.stringify(minVersions));
    } catch(e) {
      console.error(`Failed to write: ${outPath}`);
      throw new Error(e.message);
    }
  });
}
