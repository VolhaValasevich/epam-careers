let reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

let options = {
    theme: 'bootstrap',
    jsonFile: './reports/report.json',
    output: './reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true
};

function collectReports(dir) {
    const reports = fs.readdirSync(dir);
    const mainReport = [];
    reports.forEach((report) => {
        if (report.match(/^report\.\d+\.json$/)) {
            suite = require(path.resolve(dir, report));
            suite.forEach((feature) => {
                mainReport.push(feature);
            })
            fs.unlinkSync(path.resolve(dir, report));
        }
    })
    fs.writeFileSync(path.resolve(dir, 'report.json'), JSON.stringify(mainReport));
}

if (!fs.existsSync('./reports/report.json')) collectReports('./reports')
reporter.generate(options);