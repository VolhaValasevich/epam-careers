'use strict';

const path = require('path');
const yargs = require('yargs')
    .alias({
        't' : 'tags',
        'b' : 'browserName',
        'i' : 'maxInstances'
    }).argv;
const { getTags, getCapabilities } = require('../step-definitions/util/paramsParser');

exports.config = {
    allScriptsTimeout: 200000,
    getPageTimeout: 200000,
    specs: [path.resolve('./test/e2e/features/*.feature')],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: getCapabilities(yargs),
    disableChecks: true,
    cucumberOpts: {
        require: [path.resolve('./test/e2e/step-definitions/**/*.js')],
        ignoreUncaughtExceptions: true,
        format: 'json:./reports/report.json',
        tags: getTags(yargs)
    },
    params: {
        PAGE_OBJECT_DIRECTORY: './test/e2e/po',
        BASE_URL: 'https://www.epam.com/',
        MEMORY: require('../step-definitions/util/memory')
    },
    onPrepare: () => {
        browser.manage().window().maximize();
        browser.ignoreSynchronization = true;
    }
};