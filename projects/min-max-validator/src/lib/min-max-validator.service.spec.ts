import { MinMaxValidator } from "./min-max-validator.service"
import { FormControl } from '@angular/forms';

describe('MinMaxValidator', () => {
  const minMaxValidator:MinMaxValidator = new MinMaxValidator();

  describe('validate()', () => {
    let control;
    beforeEach(() => {
      control = {} as FormControl;
    });
    it('should return error with error message when from control value is undefined', () => {
      const errors = minMaxValidator.validate(control);
      expect(errors.error).toBe('Field is required.');
    });
    it('should return error with error message when control.value is null', () => {
      control.value = null;
      const errors = minMaxValidator.validate(control);
      expect(errors.error).toBe('Field is required.');
    });
    it('should return error with error message when control.value is ""', () => {
      control.value = '';
      const errors = minMaxValidator.validate(control);
      expect(errors.error).toBe('Field is required.');
    });
    it('should return error with error message when control.value is ""', () => {
      control.value = '';
      const errors = minMaxValidator.validate(control);
      expect(errors.error).toBe('Field is required.');
    });
    it('should return error with message `Value must be between 1 and 5`', () => {
      spyOn(minMaxValidator, 'buildErrorMessage');
      minMaxValidator.errorMessage = 'Value must be between 1 and 5';
      minMaxValidator.range = [1, 5];
      control.value = 123456;
      const errors = minMaxValidator.validate(control);
      expect(errors.error).toBe('Value must be between 1 and 5');
      expect(minMaxValidator.buildErrorMessage).not.toHaveBeenCalled();
    });
    it('should return error undefined when input is valid', () => {
      minMaxValidator.errorMessage = 'Value must be between 1 and 5';
      minMaxValidator.range = [1, 5];
      control.value = 1;
      const errors = minMaxValidator.validate(control);
      expect(errors).toBeUndefined();
    });
    it('should call buildErrorMessage when one is not supplied', () => {
      spyOn(minMaxValidator, 'buildErrorMessage');
      minMaxValidator.errorMessage = undefined;
      minMaxValidator.range = [1, 5];
      control.value = 1;
      const errors = minMaxValidator.validate(control);
      expect(errors).toBeUndefined();
      expect(minMaxValidator.buildErrorMessage).toHaveBeenCalledWith([1, 5]);
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
    it('should return error with error message when control.value is ""', () => {
      control.value = '';
      const errors = MinMaxValidator.validateInputLength(control, [2], 'testing error');
      expect(errors.error).toBe('Field is required.')
    });
    it('should return error with error message when control.value is greater than max', () => {
      control.value = '123';
      const errors = MinMaxValidator.validateInputLength(control, [2], 'testing error');
      expect(errors.error).toBe('testing error')
    });
    it('should return error as undefined when control.value is less than max', () => {
      control.value = '12';
      const errors = MinMaxValidator.validateInputLength(control, [2], 'testing error');
      expect(errors).toBeUndefined();
    });
    it('should return error as undefined when control.value is between min/max length', () => {
      control.value = '1234';
      const errors = MinMaxValidator.validateInputLength(control, [2, 5], 'testing error');
      expect(errors).toBeUndefined();
    });
    it('should return error when control.value is greater than max length', () => {
      control.value = '123456';
      const errors = MinMaxValidator.validateInputLength(control, [2, 5], 'testing error');
      expect(errors.error).toBe('testing error');
    });
    it('should return error when control.value is less than min length', () => {
      control.value = '1';
      const errors = MinMaxValidator.validateInputLength(control, [2, 5], 'testing error');
      expect(errors.error).toBe('testing error');
    });
  });
})