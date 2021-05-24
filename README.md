# meteor-browser-version

`brucejo:browser-version` is a meteor package used to output version data necessary for [`meteor-static-clients`](https://github.com/brucejo75/meteor-static-clients).  And it performs the client calculation of whether the code is modern or legacy.

`brucejo:browser-version` does 2 things:
1. On the server side if `Meteor.isDevelopment` is true then it outputs a file `private/meteor-static/minBrowserVersions.json` that has the minimum version information.  This file is read by `meteor-static-clients`, if available, and uses the data to populate `__meteor_runtime_config__.minVersions`.
2. On the client side, if `__meteor_runtime_config__.minVersions` is defined it calculates whether the client is modern or legacy.  And it sets the cookie `browser-js` to value of either `"modern"` or `"legacy"`.

`brucejo:browser-version` should be included in any client thay you plan to static build and it should be included in the hosting meteor server for a static client if there is one.

The reason to include in the meteor server is so that the dynamic package loading that `brucejo:browser-version` does will be white listed in the server to support dynamic loading.
