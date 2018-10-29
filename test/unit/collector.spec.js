'use strict'
const chai =  require('chai');
const expect = chai.expect;
const path = require('path');
const collector = require('../e2e/step-definitions/util/POCollector');
const expectedResult = require('./resources/expectedMasterPO.json')
const currentDir = path.join(__dirname, 'resources');
const emptyDir = path.join(__dirname, 'resources', 'negativeTests', 'emptyDir');
const incorrectDir = path.join(__dirname, 'resources', 'negativeTests', 'incorrectData');

describe('Unit tests for Page Object Collector', () => {
    it('should collect jsons into a master file', () => {
        collector.collectData('./test/unit/resources/');
        expect(require('./resources/MasterPO.json')).to.eql(expectedResult);
    })

    it('should throw an error if a directory with pages does not exist', ()=> {
        expect(function() { collector.getAllPages(path.resolve(currentDir, 'nonExistentDir')) }).to.throw(Error, `Directory [${currentDir}\\nonExistentDir\\pages\] does not exist!`);
    })

    it('should throw an error if the directory is empty', () => {
        expect(function() { collector.getAllPages(emptyDir) }).to.throw(Error, `Directory [${emptyDir}\\pages\] is empty!`); 
    })

    it('should throw an error if a json file does not exist', () => {
        expect(function() { collector.requireJson('./nonExistentFile.json') }).to.throw(Error, 'File [./nonExistentFile.json] does not exist!'); 
    })

    it('should throw an error if an element does not have a selector', ()=> {
        expect(function() { collector.getAllPages(incorrectDir) }).to.throw(Error, 'Object { name: \'page\',\n  url: \'\',\n  children: { Header: { ref: \'./components/header/header.json\' } } } doesn\'t have a selector!');
    })
})