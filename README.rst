PlaywrightE2E
PlaywrightE2E is an end-to-end (E2E) testing framework built with Playwright in JavaScript. It utilizes the Page Object Model (POM) design pattern, integrates with Allure for detailed reporting, and supports Continuous Integration/Continuous Deployment (CI/CD) workflows via GitHub Actions.​

🚀 Features
Page Object Model (POM): Structured and maintainable test code.

Allure Reporting: Generates comprehensive and interactive test reports.

CI/CD Integration: Seamless integration with GitHub Actions for automated test execution.

Sample Test Cases: Includes example tests for reference and quick start.​
GitHub

📁 Project Structure
graphql
Copy
Edit
PlaywrightE2E/
├── .github/
│   └── workflows/          # CI/CD workflows for GitHub Actions
├── SampleCases/            # Sample test cases
├── Utils/                  # Utility functions and helpers
├── allure-results/         # Allure test results
├── pageobjects/            # Page Object Model classes
├── tests-examples/         # Example test scripts
├── tests/                  # Main test scripts
├── .gitignore              # Git ignore file
├── Clickedimage.png        # Sample image (possibly for documentation)
├── package-lock.json       # NPM lock file
├── package.json            # Project metadata and dependencies
├── playwright.config.js    # Playwright configuration
└── state.json              # Playwright state (e.g., authentication)
🛠️ Installation
Prerequisites
Node.js (v14 or higher)

npm (comes with Node.js)​
GitHub

Steps
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/sparsha-shetty/PlaywrightE2E.git
cd PlaywrightE2E
Install Dependencies:

bash
Copy
Edit
npm install
Install Playwright Browsers:

bash
Copy
Edit
npx playwright install
🧪 Running Tests
Run All Tests:

bash
Copy
Edit
npx playwright test
Run Tests with Allure Reporting:

bash
Copy
Edit
npm run test:allure
View Allure Report:

After running tests, generate and open the Allure report:

bash
Copy
Edit
npm run allure:report
⚙️ CI/CD with GitHub Actions
The project includes a GitHub Actions workflow located at .github/workflows/. This workflow automates the testing process on code pushes and pull requests.​

📄 License
This project is licensed under the MIT License.​
