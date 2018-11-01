'use strict'
const chai = require('chai');
const expect = chai.expect;
const step = require('../e2e/step-definitions/util/stepFunctions');

describe('Step Functions', () => {

    beforeAll(async () => {
        await browser.get('https://www.sandisk.com/home');
    })

    it('should check is the element is present', async () => {
        const result = await step.isElementPresent('Header > Country Bar > Global Icon');
        expect(result).to.be.true;
    })

    it('should wait for an element', async () => {
        await step.waitUntil('Product List > Results Bar > Selected Category', 'present');
        const result = await step.isElementPresent('Product List > Results Bar > Selected Category');
        expect(result).to.be.true;
    })

    it('should get element text', async () => {
        const result = await step.getText('Product List > Results Bar > Selected Category');
        expect(result).to.be.eql('Featured Items');
    })

    it('should get element from collection by text', async () => {
        const element = await step.getElementFromCollectionByText('Header > Navigation Bar > Navigation Links', 'SSD');
        const text = await element.getText();
        expect(text).to.be.eql('SSD');
    })

    it('should get element count', async () => {
        const number = await step.getNumberOfElements('Header > Navigation Bar > Navigation Links');
        expect(number).to.be.eql(8);
    })

    it('should throw an error when trying to get element by text from element that is not a collection', async () => {
        return expect(step.getElementFromCollectionByText('Header > Navigation Bar > Navigation Links #2', 'SSD')).to.eventually.be.rejectedWith(Error, 'Cannot get element with text [SSD] - [Header > Navigation Bar > Navigation Links #2] is not a collection!');
    })

    it('should throw an error if there is no element with such text in a collection', async () => {
        return expect(step.getElementFromCollectionByText('Header > Navigation Bar > Navigation Links', 'Nonexistent')).to.eventually.be.rejectedWith(Error, 'No element with text [Nonexistent] in [Header > Navigation Bar > Navigation Links]!');
    })

    it('should throw an error if the element is not on the page', async () => {
        return expect(step.click('Product List > Results Bar > Selected Option')).to.eventually.be.rejectedWith(Error, 'Cannot click on [Product List > Results Bar > Selected Option] - No element found using locator: By(css selector, span[ng-bind-html = \'selectedObj.option.title\'])');
    })

    it('should throw an error if a wrong expected condition is provided', async () => {
        expect(() => { step.expectedCondition('nonexistent') }).to.throw(Error, '[nonexistent] is not an expected condition');
    })

    it('should throw an error when clicking on an element that is a collection', async () => {
        return expect(step.click('Header > Navigation Bar > Navigation Links')).to.eventually.be.rejectedWith(Error, 'Cannot click on [Header > Navigation Bar > Navigation Links] - element is a collection');
    })

    it('should throw an error when getting text of an element that is a collection', async () => {
        return expect(step.getText('Header > Navigation Bar > Navigation Links')).to.eventually.be.rejectedWith(Error, 'Cannot get text of [Header > Navigation Bar > Navigation Links] - element is a collection');
    })

    it('should throw an error when trying to get number of element that is not a collection', async () => {
        return expect(step.getNumberOfElements('Header > Navigation Bar > Navigation Links #2')).to.eventually.be.rejectedWith(Error, 'Cannot get number of [Header > Navigation Bar > Navigation Links #2] - element is not a collection');
    })

    describe('tests that change url', () => {
        afterEach(async () => {
            await browser.get('https://www.sandisk.com/home');
        })

        it('chould click on an element', async () => {
            await step.click('Product List > Results Panel > Search Results #2 > Button #2');
            const url = await browser.getCurrentUrl();
            expect(url).to.be.eql('https://www.sandisk.com/home/usb-flash/extremepro-usb')
        })


        it('should send keys to an element', async () => {
            await step.sendKeys('Functional Footer > Solutions Links > Search Container > Footer Search Bar', 'disk');
            await step.sendKeys('Functional Footer > Solutions Links > Search Container > Footer Search Bar', protractor.Key.ENTER);
            const url = await browser.getCurrentUrl();
            expect(url).to.be.eql('https://www.sandisk.com/tools/search?q=disk');
        })
    })
})