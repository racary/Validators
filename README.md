# CustomValidator
The purpose of this project is to create a custom Min/Max length form validator for angular template forms. The validator accepts three input parameters:
  1. [msg] - custom error message to display
  2. [minValue] - minimum value that the input field can be
  3. [maxValue] - max value that the input field can be

  msg and minValue are optional. In order to work properly at least maxValue must be passed in.

## To install
  1. run `npm install min-max-validator` in your project directory
  2. put libMinMaxValidator to register validator in your html input field

## To use library as a local package
### clone from git and do the following:
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
