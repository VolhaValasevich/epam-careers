'use strict';
let {Then, When, Given} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I wait until "([^"]*)" is (.*)$/, (alias, shouldBe) => { // (present|clickable|visible|invisible|selected|gone)
    alias = memory.parseString(alias);
    shouldBe = memory.parseString(shouldBe);
    logger.info(`I wait until [${alias}] is ${shouldBe}`);
    return step.waitUntil(alias, shouldBe);
});