'use strict';
let {Then, When, Given} = require('cucumber');
const expect = require('chai').expect;
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

Then(/^"([^"]*)" should( not)? be visible$/, async (alias, notArg) => {
    alias = memory.parseString(alias);
    logger.info(`I check if [${alias}] is visible`);
    notArg = notArg ? ' not' : '';
    let result = await step.isElementPresent(alias);
    return expect(result).to.be.equal(!notArg);
});

Then(/^Count of "([^"]*)" should( not)? be "([^"]*)"$/, async (alias, notArg, expectedNumber) => {
    alias = memory.parseString(alias);
    expectedNumber = memory.parseString(expectedNumber);
    logger.info(`I check if count of [${alias}] is ${expectedNumber}`);
    notArg = notArg ? ' not' : '';
    let result = await step.getNumberOfElements(alias);
    expectedNumber = parseInt(expectedNumber, 10);
    if (notArg) {
        return expect(result).to.not.equal(expectedNumber);   
    }
    else {
        return expect(result).to.equal(expectedNumber);
    }
});

Then(/^Text of "([^"]*)" should( not)? contain "([^"]*)"$/, async (alias, notArg, textToContain) => {
    alias = memory.parseString(alias);
    textToContain = memory.parseString(textToContain);
    logger.info(`I check if text of [${alias}] contains [${textToContain}]`);
    notArg = notArg ? ' not' : '';
    let elementText = await step.getText(alias);
    if (notArg) {
        return expect(elementText).to.not.contain(textToContain);   
    }
    else {
        return expect(elementText).to.contain(textToContain);
    }
});

Then(/^Text of "([^"]*)" should( not)? equal "([^"]*)"$/, async (alias, notArg, textToContain) => {
    alias = memory.parseString(alias);
    textToContain = memory.parseString(textToContain);
    logger.info(`I check if text of [${alias}] equals [${textToContain}]`);
    notArg = notArg ? ' not' : '';
    let elementText = await step.getText(alias);
    if (notArg) {
        return expect(elementText).to.not.be.eql(textToContain);  
    }
    else {
        return expect(elementText).to.be.eql(textToContain);  
    }  
});

Then(/^Attribute "([^"]*)" of "([^"]*)" should( not)? be "([^"]*)"$/, async (attributeName, alias, notArg, expectedAttribute) => {
    attributeName = memory.parseString(attributeName);
    alias = memory.parseString(alias);
    expectedAttribute = memory.parseString(expectedAttribute);
    logger.info(`I check if ${attributeName} of [${alias}] is [${expectedAttribute}]`);
    notArg = notArg ? ' not' : '';
    let attribute = await step.getAttribute(alias, attributeName);
    if (notArg) {
        return expect(attribute).to.not.be.eql(expectedAttribute); 
    }
    else {
        return expect(attribute).to.be.eql(expectedAttribute);
    }     
});

Then(/^Page title should( not)? be "([^"]*)"$/, async (notArg, text) => {
    text = memory.parseString(text);
    logger.info(`I check if page title is [${text}]`);
    notArg = notArg ? ' not' : '';
    let pageTitle = await browser.getTitle();
    if (notArg) {
        return expect(pageTitle).to.not.equal(text);
    }
    else {
        return expect(pageTitle).to.be.equal(text);
    }  
});