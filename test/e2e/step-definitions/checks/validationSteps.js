'use strict';
let { Then, When, Given } = require('cucumber');
const expect = require('chai').expect;
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

Then(/^"([^"]*)" should( not)? be visible$/, async (alias, notArg) => {
    alias = memory.parseString(alias);
    logger.info(`I check if [${alias}] is visible`);
    notArg = notArg ? 'not' : '';
    let result = await step.isElementPresent(alias);
    return expect(result).to.equal(!notArg);
});

Then(/^Count of "([^"]*)" should( not)? be "([^"]*)"$/, async (alias, notArg, expectedNumber) => {
    alias = memory.parseString(alias);
    expectedNumber = memory.parseString(expectedNumber);
    logger.info(`I check if count of [${alias}] is ${expectedNumber}`);
    notArg = notArg ? 'not' : 'be';
    let result = await step.getNumberOfElements(alias);
    expectedNumber = parseInt(expectedNumber, 10);
    return expect(result).to[notArg].equal(expectedNumber);
});

Then(/^Text of "([^"]*)" should( not)? contain "([^"]*)"$/, async (alias, notArg, textToContain) => {
    alias = memory.parseString(alias);
    textToContain = memory.parseString(textToContain);
    logger.info(`I check if text of [${alias}] contains [${textToContain}]`);
    notArg = notArg ? 'not' : 'be';
    let elementText = await step.getText(alias);
    return expect(elementText).to[notArg].contain(textToContain);
});

Then(/^Text of "([^"]*)" should( not)? equal "([^"]*)"$/, async (alias, notArg, textToContain) => {
    alias = memory.parseString(alias);
    textToContain = memory.parseString(textToContain);
    logger.info(`I check if text of [${alias}] equals [${textToContain}]`);
    notArg = notArg ? 'not' : 'be';
    let elementText = await step.getText(alias);
    return expect(elementText).to[notArg].eql(textToContain);
});

Then(/^Attribute "([^"]*)" of "([^"]*)" should( not)? be "([^"]*)"$/, async (attributeName, alias, notArg, expectedAttribute) => {
    attributeName = memory.parseString(attributeName);
    alias = memory.parseString(alias);
    expectedAttribute = memory.parseString(expectedAttribute);
    logger.info(`I check if ${attributeName} of [${alias}] is [${expectedAttribute}]`);
    notArg = notArg ? 'not' : 'be';
    return step.getAttribute(alias, attributeName).then((attribute) => {
        return expect(attribute).to[notArg].eql(expectedAttribute);
    })
});

Then(/^Page title should( not)? be "([^"]*)"$/, async (notArg, text) => {
    text = memory.parseString(text);
    logger.info(`I check if page title is [${text}]`);
    notArg = notArg ? 'not' : 'be';
    let pageTitle = await browser.getTitle();
    return expect(pageTitle).to[notArg].equal(text);
});