'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I remember text of "([^"]*)" as "([^"]*)"/, (alias, key) => {
    logger.info(`I remember text of [${alias}] as [${key}]`);
    const text = step.getText(alias);
    memory.store(key, text);
})

When(/^I remember number of "([^"]*)" as "([^"]*)"/, (alias, key) => {
    logger.info(`I remember number of [${alias}] as [${key}]`);
    const number = step.getNumberOfElements(alias);
    memory.store(key, number);
})

When(/^I remember page title as "([^"]*)"/, (key) => {
    logger.info(`I remember page title as [${key}]`);
    const text = browser.getTitle();
    memory.store(key, text);
})

When(/^I remember attribute "([^"]*)" of "([^"]*)" as "([^"]*)"/, (attributeName, alias, key) => {
    logger.info(`I remember attribute [${attributeName}] of [${alias}] as [${key}]`);
    const attribute = step.getAttribute(alias, attributeName);
    memory.store(key, attribute);
})