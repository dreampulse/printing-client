# Printing Engine Client

Frontend Application for the Printing Engine

## Requirements

To build and run the source code you need to install a recent version of [Node.js and NPM](https://nodejs.org/).

## Project setup

Run the command `npm install` in the root of the project folder to install all required dependencies.

## NPM commands

There are various commands available via NPM for use during development and to create a production build of the source code.

- `npm run build`: Build the production version of the source code into `/dist`.
- `npm run start:dev`: Start a development server with the development build of the source code on Port `3000`.
- `npm run start:styleguide` : Starts the Component testing app.
- `npm run start` : Starts a production webserver with the distribution build.
- `npm run test`: Lint the source code and run all available tests cases.
- `npm run test:coverage`: Run unit tests and collect coverage Information.
- `npm run changes`: Show current changes which will go into next release.
- `npm run release [<newversion> | major | minor | patch | prerelease]`: Create a new release by increasing the version number. Changelog is generated automatically from pull requests.

## Development Environment

In the development environment webpack injects a global variable with the name `APP_ENV`.

## Start Dist Build

To start the application from the `/dist` folder do the following:

~~~
$ npm install
$ npm run build
$ npm run start
~~~

## Terminology
- Services: Services are JS modules which can be found in `/src/app/service`. They wrap external dependencies (e.g. DOM, external libs) which we don't want to include in the unit tests.
- Utils: Utilities are JS modules which usually consist of simple helper functions (e.g. lodash). Thy shouldn't contain business logic. Our own utilities are located in `/src/app/util`.
- Libs: Libs are our own libraries which contain the core business logic. They can be found in `/src/app/lib`.

## Dependency Injection
We use a very explicit dependency injection model in order to be able to write better mocks in our tests and raise coverage. Therefore, modules with dependencies are wrapped in a `create(dependencies, settings)` function. This function returns the interface which the module wants to expose. Every module folder then has an index.js file where the dependencies are imported and the create functions are called. This `index.js` file may only contain simple glue code because it won't be tested in unit tests.

## CSS
SASS is our CSS preprocessor of choice.
Use [BEM](https://en.bem.info/) to structure your CSS. Deep nesting should be prevented.
Colors should be semantic. Therefore, use Sass variables for design-specific colors.
Use variables and comments to explain 'magic numbers'.

## Tests
Linter and tests are executed with `npm run test`.
Use `npm test:coverage` for checking the test coverage via [`istanbul`](https://github.com/gotwarlost/istanbul).

The following folders are unit tested and should have 100% test coverage:
- `/src/app/action`
- `/src/app/reducer`
- `/src/app/lib`
- `/src/app/util`

## Changelog

For the changelog please see the file `CHANGELOG.md`.
