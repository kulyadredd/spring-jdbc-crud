exports.config = {

    specs: ['./src/test/java/client/e2e/**/*.js'],

    capabilities: {
        browserName: 'chrome'
    },

    maxSessions: 1,

    baseUrl: 'http://localhost:8080',


    framework: 'jasmine2',

    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 10000000,
    }
};