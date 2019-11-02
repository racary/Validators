# CustomValidator
The purpose of this project is to create a custom Min/Max length form validator for angular template forms. The validator accepts two optional input parameters.
  1. libMinMaxValidator to register validator
  2. [msg] - custom error message to display
  3. minValue - minimum value that the input field can be
  4. maxValue - max value that the input field can be

## To use library as a local package
1. Run `npm packager` to create package in the `dist/` folder
2. CD into the `dist/` directory
3. Run `npm pack` to create the `min-max-validator-0.0.1.tgz` file
4. In the root directory of your local project:  
  a.Run `npm install <path to .tgz file>` to install lib  
  b. Add MinMaxValidator into angular module that will be using the validator  

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
