import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[minMaxValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinMaxValidatorDirective, multi: true }
  ]
})
export class MinMaxValidatorDirective implements Validator {
  @Input() minValue: number;
  @Input() maxValue: number;
  @Input('msg') msg: string;
  builtMessage: string;

  static validateInputLength(control: FormControl, maxValue: number, minValue: number, msg: string): ValidationErrors {
    if (!control.value || control.value === null || control.value === '') {
      return { minMaxError: 'Field is required.' };
    }

    let inputValue: number;
    inputValue = (typeof control.value === 'number') ? control.value : +control.value;

    if (minValue && maxValue) {
      if (inputValue < minValue || inputValue > maxValue) {
      return {minMaxError: msg};
      }
    } else if (!maxValue && minValue && inputValue < minValue) {
      return {minMaxError: msg};
    } else if (!minValue && maxValue && inputValue > maxValue) {
      return {minMaxError: msg};
    }
  }

  validate(control: FormControl): ValidationErrors {
    const errorMsg = this.msg ? this.msg : this.buildErrorMessage();
    return MinMaxValidatorDirective.validateInputLength(control, this.maxValue, this.minValue, errorMsg);
  }

  buildErrorMessage(): string {
    return this.minValue ?  `Value must be between ${this.minValue} and ${this.maxValue}.` :
                            `Value cannot be greater than ${this.maxValue}.`;
  }
}
