'use strict';
let {Then, When, Given} = require('cucumber');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I wait "([^"]*)" seconds$/, (waitTime) => {
    waitTime = memory.parseString(waitTime);
    logger.info(`I wait ${waitTime} seconds`);
    return browser.sleep(waitTime * 1000);
});

When(/^I open "([^"]*)" url$/, (url) => {
    url = memory.parseString(url);
    logger.info(`I open ${url} url`);
    return browser.get(url);
});

When(/^I open base url$/, async)