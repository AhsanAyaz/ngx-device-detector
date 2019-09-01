module.exports = function (config) {
  // const testWebpackConfig = require('./webpack.test.config')({ env: 'test' });

  const configuration = {

    /**
     * Base path that will be used to resolve all patterns (e.g. files, exclude).
    */
    basePath: '',

    /**
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    /**
     * List of files to exclude.
    */
    exclude: [],

    client: {
      captureConsole: false
    },

    /**
     * List of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
    ],
    plugins: [
      require('karma-jasmine'),
      require("karma-coverage"),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('ts-loader'),
      require('karma-mocha-reporter'),
      require('karma-remap-coverage')
    ],

    /**
     * Preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    /**
     * Webpack Config at ./webpack.test.js
     */
    webpack: require('./../webpack.config.dev'),

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    /**
     * Webpack please don't spam the console when running in karma!
     */
    webpackMiddleware: {
      /**
       * webpack-dev-middleware configuration
       * i.e.
       */
      logLevel: 'warn',
      /**
       * and use stats to turn off verbose output
       */
      stats: {
        /**
         * options i.e.
         */
        chunks: false
      }
    },

    /**
     * Test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'progress', 'coverage', 'kjhtml', 'remap-coverage'],

    /**
     * Web server port.
     */
    port: 9876,

    /**
     * enable / disable colors in the output (reporters and logs)
     */
    colors: true,

    /**
     * Level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    /**
     * enable / disable watching file and executing tests whenever any file changes
     */
    autoWatch: true,

    /**
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'Chrome'
    ],

    /**
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: false,

    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    /**
     * For slower machines you may need to have a longer browser
     * wait time . Uncomment the line below if required.
     */
    // browserNoActivityTimeout: 30000

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity

  };

  // Optional Sonar Qube Reporter
  if (process.env.SONAR_QUBE) {

    // SonarQube reporter plugin configuration
    configuration.sonarQubeUnitReporter = {
      sonarQubeVersion: '5.x',
      outputFile: 'reports/ut_report.xml',
      overrideTestDescription: true,
      testPath: 'src/components',
      testFilePattern: '.spec.ts',
      useBrowserName: false
    };

    // Additional lcov format required for
    // sonarqube
    configuration.remapCoverageReporter.lcovonly = './coverage/coverage.lcov';

    configuration.reporters.push('sonarqubeUnit');
  }

  config.set(configuration);
};
