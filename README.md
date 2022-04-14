# meteor-browser-version

`brucejo:browser-version` is a meteor package used to output version data necessary for [`mstatic`](https://github.com/bcode15/mstatic).  And it performs the client calculation of whether the code is modern or legacy.

`brucejo:browser-version` does 2 things:
1. On the server side if `Meteor.isDevelopment` is true then it outputs a file folder specified by `private/meteor-static/minBrowserVersions.json` that has the minimum version information.  This file is read by `meteor-static-clients`, if available, and uses the data to populate `__meteor_runtime_config__.minVersions`.
2. On the client side, if `__meteor_runtime_config__.minVersions` is defined it calculates whether the client is modern or legacy.  And it sets the cookie `browser-js` to value of either `"modern"` or `"legacy"`.

# Include in static client
`brucejo:browser-version` should be included in any client thay you plan to static build.

## Include in hosting server
1. At `Meteor.isDevelopment` time to calculate the `minVersions.json`.
2. At runtime the inclusion will whitelist the dynamic import files that `meteor-browser-version` does.
