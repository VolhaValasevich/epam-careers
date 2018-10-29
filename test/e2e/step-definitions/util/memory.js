const logger = require('./logger').logger;

class Memory {
    constructor() {
        this.storage = {};
    }

    async parseString(string) {
        if (typeof string === 'string' && string.match(/^\$[\w\s-]+/)) return this.get(string.substring(1));
        else return string;
    }

    async store(key, value) {
        const session = await browser.getSession();
        if (typeof key === 'string' && key.match(/^\$[\w\s-]+/)) key = key.substring(1);
        if (this.storage[key + session.getId()]) logger.warn(`Overwriting ${key} with ${value}`);
        logger.action(`Saving [${value}] as [$${key}]`);
        this.storage[key + session.getId()] = value;
    }

    async get(key) {
        const session = await browser.getSession();
        key += session.getId();
        if (!this.storage[key]) throw new Error(`No [${key}] object found in memory.`);
        return this.storage[key];
    }

    clean() {
        this.storage = {};
        logger.info('Memory was cleaned');
    }
}

const instance = new Memory();

module.exports = instance;