# sandisk-framework
test framework for www.sandisk.com

## Installation
```
npm i
```
During the installation it will create a "reports" directory and update webdriver-manager.

## Usage

### Run unit tests
```
npm run unit
```

### Run features
```
npm test
```

#### Tags
To run only selected features/scenarios, pass a string with tags as a command line argument. 
- All tags should begin with @ and be separated with commas.
- To exclude a tag, mark it with a ~ symbol.
```
npm test -- --tags "@main, ~@header"
npm test -- -t "@main, ~@header"
```

#### Capabilities
To run tests with certain capabilities, pass them as command line arguments.

Available capabilities:
- --browserName (-b): defines what browser will be used for running tests. Default: 'chrome'.
- --maxInstances (-i): defines the number of WebDriver instances. Use this to run tests in parallel. Default: 1.

```
npm test -- --browserName "chrome" --maxInstances 5
npm test -- -b "chrome" -i 5
```

You can pass both tags and capabilities as arguments:
```
npm test -- --tags "@slider" --maxInstances 2
npm test -- -t "@slider" -i 2
```

### Generate report
```
npm run report
```
This command will generate an html report based on report.json in "reports" directory. If there are several report jsons, they will be collected into one file before generating a report.
