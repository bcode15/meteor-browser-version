Package.describe({
  name: 'brucejo:browser-version',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Set browser version cookies',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: ''
});

Package.onUse(function(api) {
  Npm.depends({
    'ua-parser-js': '0.7.28',
    'lodash': '4.17.21',
    'fs-extra': '10.0.0'
  });

  api.use([
    'ecmascript'
  ]);

  api.use([
    'modern-browsers'
  ], 'server');

  api.mainModule('browser-version_server.js', 'server');
  api.mainModule('browser-version_client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
