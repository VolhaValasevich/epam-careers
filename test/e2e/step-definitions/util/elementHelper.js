const collector = require('./POCollector');
const path = require('path');
const util = require('util');
const logger = require('./logger').logger;

class ElementHelper {
    constructor() {
        collector.collectData(browser.params.PAGE_OBJECT_DIRECTORY);
        this.masterPO = require(path.resolve(browser.params.PAGE_OBJECT_DIRECTORY, 'MasterPO.json'));
        this.baseUrl = browser.params.BASE_URL;
    }

    async getElement(fullElementPath) {
        logger.action(`Getting an element [${fullElementPath}]`);
        const elementPath = this.parsePath(fullElementPath);
        let parentPageObject = await this.getPageObject();
        let elementToGet = await element(by.css('html'));
        elementPath.forEach((alias) => {
            let number = this.getNumberOfElement(alias);
            alias = alias.replace(/#\d+|first|second|last/, '').trim();
            if (!parentPageObject.children[alias]) {                                    //if there is no child element with requested name
                let completePath = this.findElementInChain(parentPageObject, alias);    //find the element inside the chain of child objects
                if (completePath) {                                 //if the element is found
                    completePath = this.parsePath(completePath);    //get the missing part of element chain
                    completePath.pop();                             //remove the alias of element itself
                    completePath.forEach((childAlias) => {          //get the elements in-between
                        parentPageObject = parentPageObject.children[childAlias];
                        elementToGet = this.getChildElement(elementToGet, parentPageObject, number);
                    })
                } else throw new Error(`No child element [${alias}] in ${util.inspect(parentPageObject, false, 1)} and children objects`);
            }
            parentPageObject = parentPageObject.children[alias];
            elementToGet = this.getChildElement(elementToGet, parentPageObject, number);
        })
        return elementToGet;
    }

    findElementInChain(parentPageObject, alias) {
        let result;
        if (parentPageObject.children) {
            const children = Object.keys(parentPageObject.children)
            if (children.includes(alias)) {
                return alias;
            } else {
                children.forEach((child) => {
                    const obj = this.findElementInChain(parentPageObject.children[child], alias)
                    if (obj) {
                        result = `${child} > ${obj}`;
                    }
                })
            }
        }
        return result;
    }

    getNumberOfElement(alias) {
        let number = alias.match(/#\d+|first|second|last/);
        if (number) {
            switch (number[0]) {    //string.match returns an array if there's a match; substring deletes #
                case 'first': {
                    number = 1;
                    break;
                }
                case 'second': {
                    number = 2;
                    break;
                }
                case 'last': {
                    number = 0;
                    break;
                }
                default: {
                    number = number[0].substring(1);
                }
            }
        }
        return number;
    }

    getChildElement(elementToGet, pageObject, number) {
        if (number !== null) {  //string.match returns null if there's no match
            if (!pageObject.isCollection) throw new Error(`Error in getting #${number} instance of [${pageObject.selector}] - not a collection!`)
            return elementToGet.all(by.css(pageObject.selector)).get(number - 1);
        } else if (pageObject.isCollection) {
            return elementToGet.all(by.css(pageObject.selector));
        } else {
            return elementToGet.element(by.css(pageObject.selector));
        }
    }

    async getPageObject() {
        let url = await browser.getCurrentUrl();
        logger.action(`Getting Page Object for [${url}]`);
        if (url === this.baseUrl) url = '';
        else url = url.replace(this.baseUrl, '\/').match(/(\/[a-z0-9-_]+)+/)[0];
        if (!this.masterPO[url]) throw new Error(`No Page Object found for [${url}]!`);
        return this.masterPO[url];
    }

    parsePath(fullElementPath) {
        return fullElementPath.split('>').map((el) => {
            return el.trim();
        })
    }
}

module.exports = new ElementHelper();