/* global Package, Npm */

Package.describe({
  name: 'bcode15:browser-version',
  version: '0.1.1',
  // Brief, one-line summary of the package.
  summary: 'Set browser version cookies',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: ''
});

Package.onUse(function(api) {
  api.use([
    'ecmascript'
  ]);

  Npm.depends({
    'lodash': '4.17.15',
    'fs-extra': '10.0.1',
    'ua-parser-js': '1.0.32'
  });

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
