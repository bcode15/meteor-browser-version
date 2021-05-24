# meteor-browser-version

`meteor-browser-version` is a package used by [`meteor-static-clients`](https://github.com/brucejo75/meteor-static-clients).

`meteor-browser-version` does 2 things:
1. On the server side if `Meteor.isDevelopment` is true then it outputs a file `private/meteor-static/minBrowserVersions.json` that has the minimum version information.
2. On the client side, if `__meteor_runtime_config__.minVersions` is defined it calculates whether the client is modern or legacy.  And it sets the cookie `browser-js` to either value of `"modern"` or `"legacy"`.

`meteor-static-clients` looks for the presence of `private/meteor-static/minBrowserVersions.json` if it is available then `meteor-static-clients` loads `minVersions` into `__meteor_runtime_config__` so tht `meteor-browser-version` can determine if the browser is modern or not.

`meteor-browser-version` should be included in any client static builds and it should be included in the hosting meteor server for a static client.

The reason to include in the meteor server is so that the dynamic package loading that `meteor-browser-version` does will be white in the server to support dynamic loading.