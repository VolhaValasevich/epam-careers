exports.config = {

    specs: ['../*.spec.js'],

    capabilities: {
        browserName: 'chrome'
    },

    params: {
        PAGE_OBJECT_DIRECTORY: './test/unit/resources',
        BASE_URL: 'https://www.sandisk.com/',
        MEMORY: require('../../e2e/step-definitions/util/memory')
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 40000
    },

    onPrepare: () => {
        browser.driver.manage().window().maximize();
    }
};