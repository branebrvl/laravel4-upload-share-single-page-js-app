(function(window) {
  'use strict';

  var karma = window.__karma__;

  // Put Karma into an asynchronous waiting mode until we have loaded our
  // tests.
  karma.loaded = function() {};

  if (window.QUnit) {
    // Disable auto start.  We'll call start once the async modules have
    // loaded.
    window.QUnit.config.autostart = false;
  } else if (window.chai) {
    // Optionally use chai with Mocha.
    window.expect = window.chai.expect;
  }

  // Set the application endpoint and load the configuration.
  require({
    paths: {
      // underscore: '../vendor/bower_components/underscore/underscore'
      underscore: '../vendor/bower_components/lodash/dist/lodash.underscore'
    },
    baseUrl: 'base/application'
  }, [
      'underscore'
  ], function(_) {
    var specs = _.chain(karma.files)
    // Convert the files object to an array of file paths.
    .map(function(id, file) {
      return file;
    })
    // Tests that end with `.spec.js' and existing either `application` or `test`
    // directories are automatically loaded.
    .filter(function(file) {
      return (/^\/base\/(application|test)\/.*\.spec\.js$/).test(file);
    })
      .value();

    // Load all specs and start Karma.
    require(specs, function() {
      //Set root to base so we can load corrent files when karma is running.
      window.ev.si.vanilla.app.root = 'base/';
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;
      jasmine.getFixtures().fixturesPath = 'base/test/jasmine/fixtures/';
      karma.start();
    });
  });
})(this);
