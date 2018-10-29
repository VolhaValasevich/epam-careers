const logger = require('./logger').logger;

class Memory {
    constructor() {
        this.storage = {};
    }

    parseString(string) {
        if (typeof string === 'string' && string.match(/^\$[\w\s-]+/)) return this.get(string.substring(1));
        else return string;
    }

    store(key, value) {
        if (typeof key === 'string' && key.match(/^\$[\w\s-]+/)) key = key.substring(1);
        if (this.storage[key]) logger.warn(`Overwriting ${key} with ${value}`);
        logger.action(`Saving [${value}] as [$${key}]`);
        this.storage[key] = value;
    }

    get(key) {
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