'use strict';
let {Then, When, Given} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I wait until "([^"]*)" is (.*)$/, async (alias, shouldBe) => { // (present|clickable|visible|invisible|selected|gone)
    alias = await memory.parseString(alias);
    shouldBe = await memory.parseString(shouldBe);
    logger.info(`I wait until [${alias}] is ${shouldBe}`);
    return step.waitUntil(alias, shouldBe);
});