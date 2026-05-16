# Cypress Test Automation Framework
This repository contains a Cypress automation framework for end-to-end testing of web applications. The framework is designed to be scalable, maintainable, and easy to use, allowing testers to write and execute tests efficiently.

## Features
- **Cypress**: A powerful end-to-end testing framework for web applications.
- **Allure Reporting**: Integration with Allure for generating detailed test reports.
- **Environment Configuration**: Support for different environments (e.g., development, staging, production) through environment variables.
- **Test Organization**: Tests are organized in a structured manner for better maintainability.
- **Video and Screenshot Capture**: Automatically captures videos and screenshots of test runs for easier debugging.
## Installation
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd CypressTestAutomationFramework
```
3. Install the dependencies:
```bash
npm install
```
## Usage
To run the tests, use the following command:
```bash
npm test
```
This command will execute the tests, generate Allure reports, and open the report in the default browser.
## Configuration
The configuration for the Cypress tests is located in the `cypress.config.ts` file. You can set the base URL, environment variables, and other Cypress options in this file. For example, you can specify the API URL and enable snapshot testing by modifying the `env` object in the configuration.

## Test Structure
The tests are organized in the `cypress/e2e` directory. You can create feature files with the `.feature` extension to define your test scenarios using Gherkin syntax. The step definitions for these scenarios can be implemented in corresponding JavaScript or TypeScript files.

Folder structure:
```CypressTestAutomationFramework/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── features/
│   │   │   ├── step_definitions/
│   │   │   └── utils/
│   │   │       └── endpoints.ts
│   │   ├── ui/
│   │   │   ├── features/
│   │   │   ├── pages/
│   │   │   └── step_definitions/
│   │   └── tests/
│   ├── fixtures/
│   │   ├── expectedResponses/
│   │   ├── expectedSchemas/
│   │   ├── tempActualResponses/
│   │   └── [test data JSON files]
│   ├── support/
│   │   ├── utils/
│   │   │   └── interfaces/
│   │   ├── commands.ts
│   │   ├── cypress.ts
│   │   └── e2e.ts
│   └── videos/
├── allure-results/
├── allure-report/
├── config/
│   └── config.json
├── cypress.config.ts
├── eslint.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```
## Contributing
Contributions are welcome! If you have any suggestions or improvements, please feel free to create a pull request or open an issue.


