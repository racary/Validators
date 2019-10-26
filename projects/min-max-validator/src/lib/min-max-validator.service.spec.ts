import { MinMaxValidator } from "./min-max-validator.service"
import { FormControl } from '@angular/forms';

describe('MinMaxValidator', () => {
  const minMaxValidator:MinMaxValidator = new MinMaxValidator();

  describe('validate()', () => {
    it('should return error with error message when from control value is undefined', () => {

    });
  });

  describe('buildErrorMessage()', () => {
    it('should return error message `Value cannot be greater than ...` when input array has 1 value', () => {
      expect(minMaxValidator.buildErrorMessage([12])).toBe('Value cannot be greater than 12.');
    });
    it('should return error message `Value must be btweeen ... and ...` when input array has 2 values', () => {
      expect(minMaxValidator.buildErrorMessage([2, 12])).toBe('Value must be between 2 and 12.');
    });
  });

  describe('validateInputLength()', () => {
    let control;
    beforeEach(() => {
      control = {} as FormControl;
    });
    it('should return error with error message when control.value is undefined', () => {
      const errors = MinMaxValidator.validateInputLength(control, [2], 'testing error');
      expect(errors.error).toBe('Field is required.')
    });
    it('should return error with error message when control.value is null', () => {
      control.value = null;
      const errors = MinMaxValidator.validateInputLength(control, [2], 'testing error');
      expect(errors.error).toBe('Field is required.')
    });
  });
})