# Printing Engine Client

Frontend Application for the Printing Engine

## Requirements

To build and run the source code you need to install a recent version of [Node.js, NPM and Yarn](https://nodejs.org/).

## Project setup

Run the command `yarn install` in the root of the project folder to install all required dependencies.

## NPM commands

There are various commands available via NPM for use during development and to create a production build of the source code.

- `npm run build`: Build the production version of the source code into `/dist`.
- `npm run start:dev`: Start a development server with the development build of the source code on Port `3000`.
- `npm run start:styleguide` : Starts the Component testing app.
- `npm run start` : Starts a production webserver with the distribution build.
- `npm run start:dev` : Starts a development server with hot reloading.
- `npm run start:dev:stubs` : Starts a development server with hot reloading and stubs the API.
- `npm run start:styleguide` : Starts react storybook.
- `npm run test`: Lint the source code and run all available tests cases (unit tests, integration tests and e2e tests).
- `npm run test:coverage`: Run unit and integration tests and collect coverage Information.
- `npm run test:dev:watch`: Run unit tests in watch mode.
- `npm run changes`: Show current changes which will go into next release.
- `npm run release [<newversion> | major | minor | patch | prerelease]`: Create a new release by increasing the version number. Changelog is generated automatically from pull requests.

## Start Dist Build

To start the application from the `/dist` folder do the following:

~~~
$ yarn install
$ npm run build
$ npm run start
~~~

## Terminology
- Services: Services are JS modules which can be found in `/src/app/service`. They wrap external dependencies (e.g. DOM, external libs) which we don't want to include in the unit tests.
- Libs: Libs are our own libraries which contain the core business logic. They can be found in `/src/app/lib`.

## Dependency Injection
We don't use a explicit dependency injection model. We use ES6-Module export and `sinon.stub()` for testing instead.
Be aware that `sinon.stub()` only stubs methods not other object properties. If you want to stub all object properties you
have to use `sinon.sandbox.create()`.

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
