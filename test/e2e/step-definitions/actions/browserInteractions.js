'use strict';
let {Then, When, Given} = require('cucumber');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I wait "([^"]*)" seconds$/, async (waitTime) => {
    waitTime = await memory.parseString(waitTime);
    logger.info(`I wait ${waitTime} seconds`);
    return browser.sleep(waitTime * 1000);
});

When(/^I open "([^"]*)" url$/, async (url) => {
    url = await memory.parseString(url);
    logger.info(`I open ${url} url`);
    return browser.get(url);
});