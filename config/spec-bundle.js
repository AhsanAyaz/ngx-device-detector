require("zone.js/dist/zone");
require("zone.js/dist/zone-testing");
require("core-js/es7/reflect");

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');
// declare const require: any;

// First, initialize the Angular testing environment.
beforeAll(() => {
  testing.TestBed.resetTestEnvironment();
  testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting());
});
// Then we find all the tests.
const context = require.context("./../tests", true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

/**
 * Get all the files, for each file, call the context function
 * that will require the file and load it up here. Context will
 * loop and require those spec files here
 */
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

/**
 * Requires and returns all modules that match
 */
const modules = requireAll(context);