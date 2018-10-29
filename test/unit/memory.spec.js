const chai = require('chai');
const memory = browser.params.MEMORY;
const expect = chai.expect;

describe('Memory tests', () => {

    beforeEach(() => {
        memory.clean();
    })

    it('should parse string that is a key', async () => {
        await memory.store('$key', 'value');
        const parsedValue = await memory.parseString('$key');
        expect(parsedValue).to.be.eql('value');
    })

    it('should parse string that is not a key', async () => {
        await memory.store('$key', 'value');
        const parsedValue = await memory.parseString('key');
        expect(parsedValue).to.be.eql('key');
    })

    it('should return initial value when parsing a number', async () => {
        const parsedValue = await memory.parseString(5);
        expect(parsedValue).to.be.eql(5);
    })

    it('should get value by a parsed key', async () => {
        await memory.store('key', 'value');
        const parsedValue = await memory.parseString('$key');
        expect(parsedValue).to.be.eql('value');
    })

    it('should be able to clean storage', async () => {
        await memory.store('key', 'value');
        memory.clean();
        expect(memory.storage).to.be.eql({});
    })
})