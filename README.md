# meteor-browser-version

`bcode15:meteor-browser-version` is a meteor package used to output version data necessary for [`mstatic`](https://github.com/bcode15/mstatic).  And it performs the client calculation of whether the code is modern or legacy.

`bcode15:meteor-browser-version` does 2 things:
### On the Server side
- During devlopment, if `Meteor.isDevelopment` is true then the serer outputs a file folder specified by `private/mstatic/minBrowserVersions.json` that has the minimum version information.
- `private/mstatic/minBrowserVersions.json` will update if the values have changed.
- This file is read by [`bcode:mstatic`](https://github.com/bcode15/mstatic), if available, and uses the data to populate `__meteor_runtime_config__.minVersions`.

### On the Client side
- If `__meteor_runtime_config__.minVersions` is defined it calculates whether the client is `modern` or `legacy`.  And it sets the cookie `browser-js` to value of either `"modern"` or `"legacy"`.
- If the cookie has changed values (e.g. `undefined` -> `modern`), `bcode15:meteor-browser-version` will initiate a reload of the client so that the server can send down the `modern` code.

