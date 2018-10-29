'use strict'
const chai = require('chai');
const helper = require('../e2e/step-definitions/util/elementHelper');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;


describe('Unit tests for Element Helper', () => {

    beforeAll(async () => {
        await browser.get('https://www.sandisk.com/home');
    })

    it('should trim a path to element', () => {
        const expectedResult = ['Home', 'Header', 'Navigation Bar'];
        const result = helper.parsePath('Home > Header > Navigation Bar');
        expect(result).to.be.eql(expectedResult);
    })

    it('should search for a page object based on current url', async () => {
        const result = await helper.getPageObject();
        expect(result).to.be.eql(helper.masterPO['/home']);
    })

    it('should search for an element by its full path', async () => {
        const element = await helper.getElement('Header > Country Bar > Global Icon');
        const tag = await element.getTagName();
        expect(tag).to.be.eql('span')
    })

    it('should find element on the page and perform check', async () => {
        const element = await helper.getElement('Header > Country Bar > Global Icon');
        const result = await element.isPresent();
        expect(result).to.be.true;
    })

    it('should find an element from collection by its number', async () => {
        let el = await helper.getElement('Product List > Results Panel > Search Results #2 > Button #2');
        const text = await el.getText();
        expect(text).to.be.eql('Learn More');
    })

    it('should find an element from collection by "first"', async () => {
        let el = await helper.getElement('Product List > Results Panel > first Search Results > first Button');
        const text = await el.getText();
        expect(text).to.be.eql('Buy Now');
    })

    it('should find an element from collection by "second"', async () => {
        let el = await helper.getElement('Product List > Results Panel > second Search Results > second Button');
        const text = await el.getText();
        expect(text).to.be.eql('Learn More');
    })

    it('should find an element from collection by "last"', async () => {
        let el = await helper.getElement('Product List > Results Panel > last Search Results > last Button');
        const text = await el.getText();
        expect(text).to.be.eql('Learn More');
    })

    it('should throw an error when getting an element that is not a collection by index', async () => {
        return expect(helper.getElement('Header > Country Bar #2')).to.eventually.be.rejectedWith(Error, 'Error in getting #2 instance of [#country] - not a collection!');
    })

    it('should throw an error if there is no such child in an element', async () => {
        return expect(helper.getElement('Header > nonexistent')).to.eventually.be.rejectedWith(Error, 'No child element [nonexistent] in { selector: \'header\',\n  children: { \'Country Bar\': [Object], \'Navigation Bar\': [Object] } }');
    })

    describe('tests that change url', () => {

        afterEach(async () => {
            await browser.get('https://www.sandisk.com/home');
        })

        it('should throw an error if there is no page object for current url', async () => {
            await browser.get('https://www.sandisk.com/home/ssd/extreme-portable-ssd');
            return expect(helper.getPageObject()).to.eventually.be.rejectedWith(Error, 'No Page Object found for [/home/ssd/extreme-portable-ssd]!');
        })
    })
})