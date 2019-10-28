# CustomValidator
The purpose of this project is to create a custom Min/Max length form validator for angular template forms. The validator accepts two optional input parameters.
  1. [minMaxValidator] - array that can contain 1 or 2 elements
    a. If 1 element this represents the maximum number that the input field can be.
    b. If 2 elements the first represents the minumum number, the second represents the maximum number.
  2. [msg] - custom error message to display

## To use locally
Run `packager` to create a package in the `dist/` folder. Go into the `dist/` directory and run `npm pack` to create the `

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
