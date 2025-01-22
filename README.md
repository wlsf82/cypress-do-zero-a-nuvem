# cypress, from zero to the cloud

Sample project for "cypress, from zero to the cloud" course of talking about testing school

## Pre-requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (v20.18.0)
- npm (v10.8.2)
- [Microsoft Edge](https://www.microsoft.com/pt-br/edge/download?form=MA13FJ)
- [Visual Studio Code](https://code.visualstudio.com/) (v1.95.0)

> Suggested to use Node.js `v18.15.0` and npm `9.5.0` or later versions

## Installation

Run:

- `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

Run:

- `npm cy:open` to open cypress in interactive mode on a desktop viewport
- `npm cy:open:mobile` to open cypress in interactive mode on a mobile viewport
- `npm test` to run cypress in headless mode on a desktop viewport
- `npm test:headless:mobile` to run cypress in headless mode on a mobile viewport
