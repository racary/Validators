import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[libMinMaxValidator]',
  // We add our directive to the list of existing validators
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinMaxValidator, multi: true }
  ]
})
export class MinMaxValidator implements Validator {
  @Input('minMaxValidator') range: number[];
  @Input('msg') msg: string;
  builtMessage: string;

  static validateInputLength(control: FormControl, lengthRange: number[], msg: string): ValidationErrors {
    if (!control.value || control.value === null || control.value === '') {
      return { error: 'Field is required.' };
    }

    let inputValue: number;
    inputValue = (typeof control.value === 'number') ? control.value : +control.value;

    if (lengthRange && lengthRange.length > 0) {
      if (lengthRange.length === 1) {
        if (inputValue > lengthRange[0]) {
          return { error: msg };
        }
      } else if (lengthRange.length === 2) {
        if (inputValue < lengthRange[0] || inputValue > lengthRange[1]) {
          return { error: msg };
        }
      }
    }
  }

  validate(control: FormControl): ValidationErrors {
    const rng = this.range ? this.range : [1, 100];
    const errorMsg = this.msg ? this.msg : this.buildErrorMessage(rng);
    return MinMaxValidator.validateInputLength(control, rng, errorMsg);
  }

  buildErrorMessage(minMaxLength: number[]): string {
    let msg;
    if (minMaxLength.length === 1) {
      msg = `Value must be between 0 and ${minMaxLength[0]}.`;
    } else {
      msg = `Value must be between ${minMaxLength[0]} and ${minMaxLength[1]}.`;
    }
    return msg;
  }
}
