const path = require('path');
const fs = require('fs');
const util = require('util');

class POCollector {
    constructor() {
        this.masterPO = {};
    }

    getReferences(dir, obj) {
        if (obj.ref) {
            const masterselector = obj.selector;
            obj.ref.unshift(dir);
            obj = this.requireJson(path.resolve(...obj.ref));
            if (masterselector) {
                obj.selector = masterselector + obj.selector;
            }
        }
        if (!obj.selector) throw new Error(`Object ${util.inspect(obj, false, null)} doesn't have a selector!`);
        if (obj.children) {
            Object.keys(obj.children).forEach((key) => {
                obj.children[key] = this.getReferences(dir, obj.children[key]);
            });
        }
        return obj;
    }

    getAllPages(dir) {
        let pages;
        const fullPath = path.join(dir, 'pages');
        try {
            pages = fs.readdirSync(fullPath);
        } catch (err) {
            throw new Error(`Directory [${fullPath}] does not exist!`);
        }
        if (pages.length === 0) throw new Error(`Directory [${fullPath}] is empty!`)
        pages.forEach((page) => {
            if (page === 'MasterPO.json' || path.extname(page) !== '.json') return;
            let pageObj = this.requireJson(path.join(dir, 'pages', page));
            pageObj = this.getReferences(dir, pageObj);
            this.masterPO[pageObj.url] = pageObj;
        })
    }

    saveMasterObject(dir) {
        fs.writeFileSync(path.resolve(dir, 'MasterPO.json'), JSON.stringify(this.masterPO));
    }

    collectData(dir) {
        this.getAllPages(dir);
        this.saveMasterObject(dir);
    }

    requireJson(file) {
        let string;
        try {
            string = fs.readFileSync(file);
        } catch (err) {
            throw new Error(`File [${file}] does not exist!`);
        }
        return JSON.parse(string);
    }
}

module.exports = new POCollector();

