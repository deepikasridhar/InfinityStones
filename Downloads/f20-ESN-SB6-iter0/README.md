# F20-ESN-SB6

YOU ARE *NOT* PERMITTED TO SHARE THIS REPO OUTSIDE THIS GITHUB ORG. YOU ARE *NOT* PERMITTED TO FORK THIS REPO UNDER ANY CIRCUMSTANCES. YOU ARE *NOT* PERMITTED TO CREATE ANY PUBLIC REPOS INSIDE THE CMUSV-FSE ORGANIZATION.  YOU SHOULD HAVE LINKS FROM THIS README FILE TO YOUR PROJECT DOCUMENTS, SUCH AS YOUR REST API SPECS AND YOUR ARCHITECTURE DOCUMENT. *IMPORTANT*: MAKE SURE TO CHECK AND UPDATE YOUR LOCAL GIT CONFIGURATION IN ORDER TO MATCH YOUR LOCAL GIT CREDENTIALS TO YOUR SE-PROJECT GITHUB CREDENTIALS (COMMIT USING THE SAME EMAIL ASSOCIATED WITH YOUR GITHUB ACCOUNT): OTHERWISE YOUR COMMITS WILL NOT BE INCLUDED IN GITHUB STATISTICS AND REPO AUDITS WILL UNDERESTIMATE YOUR CONTRIBUTION. 

# Getting Started
## Setup
To connect to database, set up `.env` file and ask ws-chen for credentials.

To setup: `npm install` in root folder to create node modules folder.

## Run app
To run: `npm start` 
View the app on `localhost:8080`

## Linter
Linter used is ESLint https://eslint.org/docs/rules/ using modified airbnb standards. https://github.com/airbnb/javascript Linter can be further configured in `.eslintrc.json`.

To run linter: `npm run pretest`
To run linter and automatically fix: `npm run format`

Note: Uses ES6 Javascript conventions