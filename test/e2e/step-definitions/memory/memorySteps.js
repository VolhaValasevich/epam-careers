'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I remember text of "([^"]*)" as "([^"]*)"/, async(alias, key) => {
    logger.info(`I remember text of [${alias}] as [${key}]`);
    const text = await step.getText(alias);
    await memory.store(key, text);
})

When(/^I remember number of "([^"]*)" as "([^"]*)"/, async(alias, key) => {
    logger.info(`I remember number of [${alias}] as [${key}]`);
    const number = await step.getNumberOfElements(alias);
    await memory.store(key, number);
})

When(/^I remember page title as "([^"]*)"/, async(key) => {
    logger.info(`I remember page title as [${key}]`);
    const text = await browser.getTitle();
    await memory.store(key, text);
})

When(/^I remember attribute "([^"]*)" of "([^"]*)" as "([^"]*)"/, async(attributeName, alias, key) => {
    logger.info(`I remember attribute [${attributeName}] of [${alias}] as [${key}]`);
    const attribute = await step.getAttribute(alias, attributeName);
    await memory.store(key, attribute);
})