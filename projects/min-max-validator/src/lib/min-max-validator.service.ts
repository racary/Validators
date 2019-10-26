import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[minMaxValidator]',
  // We add our directive to the list of existing validators
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinMaxValidator, multi: true }
  ]
})
export class MinMaxValidator implements Validator {
  @Input('minMaxValidator') public minMaxLength: number[];
  @Input('msg') public errorMessage: string;

  validate(control: FormControl): ValidationErrors {
    this.minMaxLength = this.minMaxLength ? this.minMaxLength : [0, 100];
    this.errorMessage = this.errorMessage ? this.errorMessage : this.buildErrorMessage(this.minMaxLength);
    return MinMaxValidator.validateInputLength(control, this.minMaxLength, this.errorMessage);
  }

  buildErrorMessage(minMaxLength: number[]): string {
    let msg;
    if (minMaxLength.length === 1) {
      msg = `Value cannot be greater than ${minMaxLength[0]}.`;
    } else {
      msg = `Value must be between ${minMaxLength[0]} and ${minMaxLength[1]}.`;
    }
    return msg;
  }

  static validateInputLength(control: FormControl, lengthRange: number[], msg: string): ValidationErrors {
    if (!control.value || control.value === null) {
      return { error: 'Field is required.' };
    }

    let inputValue: string;
    inputValue = (control.value instanceof Number) ? control.value.toString() : control.value;
    if (lengthRange && lengthRange.length > 0) {
      if (lengthRange.length === 1) {
        if (inputValue.length > lengthRange[0]) {
          return { error: msg };
        }
      } else if (lengthRange.length === 2) {
        if (inputValue.length < lengthRange[0] || inputValue.length > lengthRange[1]) {
          return { error: msg };
        }
      }
    }
  }
}