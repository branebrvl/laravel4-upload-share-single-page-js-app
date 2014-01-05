var path = require('path');
var port = 9073;
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};
//TODO: split tasks to separate files.
module.exports = function(grunt) {
  'use strict';

  //  Javascript files to inject in order
  //  (uses Grunt-style wildcard/glob/splat expressions)
  // Below, as a demonstration, you'll see the built-in dependencies 
  // linked in the proper order order
  var jsFilesToInject = [
    'vendor/bower_components/jquery/jquery.js',
    'vendor/bower_components/underscore/underscore.js',
    'vendor/bower_components/underscore-inherits/inherits.js',
    'vendor/bower_components/PreloadJS/lib/preloadjs-NEXT.min.js',
    'vendor/bower_components/spin.js/spin.js',
    'application/config.js',
    'application/app.js',
    'application/modules/abstract.element.js',
    'application/modules/preloader.js',
    'application/components/assets.loader.js',
    'application/modules/vanilla.js',
    'application/main.js'
  ];
  // You can optionally remove this or swap out for a different expect.
  var jsKarmaFilesToInject = jsFilesToInject.concat([
    'vendor/bower_components/lodash/dist/lodash.underscore.js',
    'vendor/bower_components/requirejs/require.js',
    'vendor/bower_components/jquery/jquery.js',
    'vendor/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
    'test/karma-runner.js',
    // Derives test framework from Karma configuration.
    {
      pattern: 'test/<%= karma.options.frameworks[0] %>/**/*.spec.js',
      included: false
    },
    // application
    {
      pattern: 'application/**/*.js',
      included: false
    },
    // libraries
    {
      pattern: 'vendor/**/*.js',
      included: false
    },
    // templates 
    {
      pattern: 'application/templates/**/*.html',
      included: false
    },
    // fixtures
    {
      pattern: 'test/jasmine/fixtures/**/*.html',
      included: false
    },
    // assets
    {
      pattern: 'assets/**/*.*',
      included: false
    },
    // imagess
    {
      pattern: 'images/**/*.*',
      included: false
    }
  ]);
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: port,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      }
    },

    watch: {
      src: {
        files: ['test/**/*', 'application/**/*', 'assets/**/*', 'index.html', 'styles/**/*.css', '!styles/custom.css', '../app/**/*.*', '!../app/storage/**/*.*'],
        options: {
          livereload: true,
        }
      },
      less: {
        files: ['less/**/*.less', 'vendor/bower_components/bootstrap/less/*.less', 'less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      targethtmldev: {
        files: ['index.target.html'],
        tasks: ['targethtml:dev'],
        options: {
          livereload: true
        }
      }
    },

    less: {
      src: {
        files: {
          // target.css file: source.less file
          "styles/custom.css": "less/custom.less",
        }
      }
    },

    // Preprocess HTML files by using target tags depending on current grunt target.
    // This grunt plugin allows you to specify different sets of assets for dev or release versions of your HTML files.
    targethtml: {
      dev: {
        files: {
          'views/layouts/application.blade.php': 'index.target.html'
        }
      },
      debug: {
        files: {
          'views/layouts/application.blade.php': 'index.target.html'
        }
      },
      prd: {
        files: {
          'views/layouts/application.blade.php': 'index.target.html'
        }
      }
    },

    // Removes previously generated files and directories.
    clean: ['dist/'],

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    cssmin: {
      combine: {
        files: {
          'dist/release/index.css': ['dist/debug/index.css']
        }
      }
    },

    // Takes the built vanilla.js file and minifies it for filesize benefits.
    uglify: {
      my_target: {
        files: {
          'dist/release/vanilla.js': ['dist/debug/vanilla.js']
        }
      }
    },

    // The concatenate task is used here to merge the almond vanilla/define
    // shim and the templates into the application code.  It's named
    // dist/debug/vanilla.js, because we want to only load one script file in
    // index.html.
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: jsFilesToInject,
        dest: 'dist/debug/vanilla.js'
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // configuration, you can use `@imports` and this task will concatenate
    // only those paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      'dist/debug/index.css': {
        // Point this to where your `index.css` file is location.
        src: 'styles/index.css',

        // The relative path to use for the @imports.
        paths: ['styles'],

        // Point to where styles live.
        prefix: 'styles/',

        // Additional production-only stylesheets here.
        additional: []
      }
    },

    // The jst task compiles all application templates into JavaScript
    // functions with the underscore.js template function from 1.2.4.  You can
    // change the namespace and the template options, by reading this:
    // https://github.com/gruntjs/grunt-contrib-jst
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    jst: {
      compile: {
        files: {
          'dist/debug/templates.js': ['application/templates/**/*.html']
        }
      }
    },

    // The lint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        es3: true,
        globals: {
          'jQuery': true,
          'Backbone': true,
          'log': true,
          'createjs': true,
          '_': true,
          'TweenMax': true,
          'Power2': true,
          'TimelineLite': true,
          '$': true
        },
      },
      files: {
        src: ['application/**/*.js']
      }
    },
    // formated javascript files by js-beautify.
    jsbeautifier: {
      modify: {
        src: ['index.target.html', 'Gruntfile.js', 'application/**/*.js', '!application/templates/**/*.html'],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: ['Gruntfile.js', 'application/**/*.js', '!application/templates/**/*.html'],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },
    // Unit testing is provided by Karma.  Change the two commented locations
    // below to either: mocha, jasmine, or qunit.
    karma: {
      options: {
        basePath: process.cwd(),
        singleRun: true,
        captureTimeout: 7000,
        autoWatch: true,
        // level of logging
        // possible values: DISABLE || ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        // CLI --log-level debug
        logLevel: 'ERROR',
        // reporters: ['dots', 'coverage'],
        reporters: ['spec', 'coverage'],
        browsers: ['Chrome'],
        // browsers: ['PhantomJS'],
        // browsers: ['Firefox', 'PhantomJS', 'Safari', 'Chrome'],
        // Change this to the framework you want to use.
        frameworks: ['jasmine'],
        plugins: [
          'karma-jasmine',
          'karma-mocha',
          'karma-qunit',
          'karma-firefox-launcher',
          'karma-chrome-launcher',
          'karma-safari-launcher',
          'karma-ie-launcher',
          'karma-phantomjs-launcher',
          'karma-coverage',
          'karma-spec-reporter'
        ],
        preprocessors: {
          'application/**/*.js': 'coverage'
        },
        coverageReporter: {
          type: 'lcov',
          dir: 'tmp/coverage'
        },
        files: jsKarmaFilesToInject,
        exclude: [
          'test/jasmine/index.html',
          'test/jasmine/spec-runner.js',
          'application/main.js'
        ]
      },
      // This creates a server that will automatically run your tests when you
      // save a file and display results in the terminal.
      daemon: {
        options: {
          singleRun: false
        }
      },
      // This is useful for running the tests just once.
      run: {
        options: {
          singleRun: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bbb-styles');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('server', ['connect', 'watch']);

  grunt.registerTask('debug', ['clean', 'jsbeautifier', 'jshint', 'jst', 'concat', 'styles', 'targethtml:debug']);

  // The release task will run the debug tasks and then minify the
  // dist/debug/vanilla.js file and CSS files.
  // grunt.registerTask('release', ['debug', 'uglify', 'cssmin', 'targethtml:prd']);
  grunt.registerTask('release', ['karma:run', 'debug', 'uglify', 'cssmin', 'targethtml:prd']);

  // To get back your dev index, run the dev task
  grunt.registerTask('dev', ['targethtml:dev']);

};
