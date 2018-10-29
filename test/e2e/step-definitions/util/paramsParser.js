const logger = require('./logger').logger;
const util = require('util');

function getTags({ tags }) {
    let result = [];
    if (typeof tags === 'string') {
        tags.split(',').forEach((element) => {
            element = element.trim();
            if (element.match(/^~?@\w+/) !== null) result.push(element);
            else throw new Error(`Could not parse the tag [${element}]: all tags should start with ~ or @ and contain only word characters.`);
        });
    }
    logger.info(`Tags: [${result}]`);
    return result;
}

function getCapabilities({ browserName = 'chrome', maxInstances = 1 }) {
    const capabilities = {};
    capabilities.browserName = browserName;
    capabilities.shardTestFiles = maxInstances > 1;
    capabilities.maxInstances = maxInstances;
    logger.info(`Browser started with capabilities: ${util.inspect(capabilities, false, null)}`);
    return capabilities;
}

module.exports = { getTags, getCapabilities };