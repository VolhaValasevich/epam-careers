'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I click "([^"]*)"$/, (alias) => {
    alias = memory.parseString(alias);
    logger.info(`I click [${alias}]`);
    return step.click(alias);
});

When(/^I click "([^"]*)" text in "([^"]*)"$/, (text, alias) => {
    alias = memory.parseString(alias);
    text = memory.parseString(text);
    logger.info(`I click [${text}] text in [${alias}]`);
    return step.getElementFromCollectionByText(alias, text).then((el) => {
        return el.click();
    })
});

When(/^I type "([^"]*)" in "([^"]*)"$/, (text, alias) => {
    alias = memory.parseString(alias);
    text = memory.parseString(text);
    logger.info(`I type [${text}] in [${alias}]`);
    if (text === 'ENTER') text = protractor.Key.ENTER;
    return step.sendKeys(alias, text);
});