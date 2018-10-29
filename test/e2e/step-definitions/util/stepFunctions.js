const ElementHelper = require('./elementHelper');
const until = protractor.ExpectedConditions;
const EC = protractor.ExpectedConditions;
const logger = require('./logger').logger;

class StepFunctions {
    constructor() {
        this.helper = ElementHelper;
    }

    isElementPresent(alias) {
        logger.action(`Checking if [${alias}] is present`);
        return this.helper.getElement(alias).then((el) => {
            if (el.length) throw new Error('element is a collection');
            return el.isPresent();
        }).catch((err) => {
            throw new Error(`Cannot check if [${alias}] is present - ${err.message}`);
        })
    }

    expectedCondition(shouldBe) {
        let expectedConditionFunction;
        switch (shouldBe) {
            case 'present':
                expectedConditionFunction = EC.presenceOf.bind(EC);
                break;
            case 'clickable':
                expectedConditionFunction = EC.elementToBeClickable.bind(EC);
                break;
            case 'visible':
                expectedConditionFunction = EC.visibilityOf.bind(EC);
                break;
            case 'invisible':
                expectedConditionFunction = EC.invisibilityOf.bind(EC);
                break;
            case 'selected':
                expectedConditionFunction = EC.elementToBeSelected.bind(EC);
                break;
            case 'gone':
                expectedConditionFunction = EC.stalenessOf.bind(EC);
                break;
            default:
                throw new Error(`[${shouldBe}] is not an expected condition`);
        }
        return expectedConditionFunction;
    }

    waitUntil(alias, shouldBe) {
        logger.action(`Waiting until [${alias}] is ${shouldBe}`);
        const expectedConditionFunction = this.expectedCondition(shouldBe);
        return this.helper.getElement(alias).then((el) => {
            return browser.wait(expectedConditionFunction(el), 30000);
        }).catch((err) => {
            throw new Error(`Cannot wait until [${alias}] is ${shouldBe} - ${err.message}`);
        }) 
    }

    sendKeys(alias, keys) {
        logger.action(`Sending [${keys}] to [${alias}]`);
        return this.helper.getElement(alias).then((el) => {
            if (el.length) throw new Error('element is a collection');
            return el.sendKeys(keys);
        }).catch((err) => {
            throw new Error(`Cannot send keys to [${alias}] - ${err.message}`);
        })  
    }

    getText(alias) {
        logger.action(`Getting text from [${alias}]`);
        return this.helper.getElement(alias).then((el) => {
            if (el.length) throw new Error('element is a collection');
            return el.getText();
        }).catch((err) => {
            throw new Error(`Cannot get text of [${alias}] - ${err.message}`);
        })  
    }

    getAttribute(alias, attribute) {
        logger.action(`Getting ${attribute} of [${alias}]`);
        return this.helper.getElement(alias).then((el) => {
            if (el.length) throw new Error('element is a collection');
            return el.getAttribute(attribute);
        }).catch((err) => {
            throw new Error(`Cannot get attribute [${attribute}] of [${alias}] - ${err.message}`);
        })
    }

    click(alias) {
        logger.action(`Clicking on [${alias}]`);
        return this.helper.getElement(alias).then((el) => {
            if (el.length) throw new Error('element is a collection');
            return el.click();
        }).catch((err) => {
            throw new Error(`Cannot click on [${alias}] - ${err.message}`);
        }) 
    }

    getNumberOfElements(alias) {
        logger.action(`Getting number of [${alias}]`);
        return this.helper.getElement(alias).then((el) => {
            if (!el.length) throw new Error('element is not a collection');
            return el.length;
        }).catch((err) => {
            throw new Error(`Cannot get number of [${alias}] - ${err.message}`);
        }) 
    }

    getElementFromCollectionByText(alias, text) {
        logger.action(`Getting element with [${text}] text from [${alias}]`);
        return this.helper.getElement(alias).then(async(collection) => {
            if (!collection.length) throw new Error(`Cannot get element with text [${text}] - [${alias}] is not a collection!`);
            for (let i = 0; i < collection.length; i++) {
                const elementtext = await collection[i].getText();
                if (text === elementtext) {
                    return collection[i];
                }
            }
            throw new Error(`No element with text [${text}] in [${alias}]!`)
        })
    }
}

module.exports = new StepFunctions();