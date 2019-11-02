import { MinMaxValidator } from './min-max-validator.service';
import { FormControl } from '@angular/forms';

describe('MinMaxValidator', () => {
  const minMaxValidator: MinMaxValidator = new MinMaxValidator();

  describe('validate()', () => {
    it('calls validateInputlength()', () => {
      spyOn(MinMaxValidator, 'validateInputLength').and.stub();
      minMaxValidator.msg = 'Value must be between 1 and 5';

      minMaxValidator.validate(null);

      expect(MinMaxValidator.validateInputLength).toHaveBeenCalled();
    });
    it('does not call buildErrorMessage() when msg input is provided', () => {
      spyOn(minMaxValidator, 'buildErrorMessage');
      spyOn(MinMaxValidator, 'validateInputLength').and.stub();
      minMaxValidator.msg = 'Error';

      minMaxValidator.validate(null);
      expect(minMaxValidator.buildErrorMessage).not.toHaveBeenCalled();
    });
    it('does call buildErrorMessage() when msg input is not provided', () => {
      spyOn(minMaxValidator, 'buildErrorMessage');
      spyOn(MinMaxValidator, 'validateInputLength').and.stub();
      minMaxValidator.msg = undefined;

      minMaxValidator.validate(null);
      expect(minMaxValidator.buildErrorMessage).toHaveBeenCalled();
    });
  });

  describe('buildErrorMessage()', () => {
    it('return error message `Value cannot be greater than ...` when only max value provided', () => {
      minMaxValidator.minValue = undefined;
      minMaxValidator.maxValue = 50;
      expect(minMaxValidator.buildErrorMessage()).toBe('Value cannot be greater than 50.');
    });
    it('returns error message `Value must be btweeen ... and ...` when input array has 2 values', () => {
      minMaxValidator.minValue = 2;
      minMaxValidator.maxValue = 12;
      expect(minMaxValidator.buildErrorMessage()).toBe('Value must be between 2 and 12.');
    });
  });

  describe('validateInputLength()', () => {
    let control;
    beforeEach(() => {
      control = {} as FormControl;
    });
    it('returns error with error message when control.value is undefined', () => {
      const errors = MinMaxValidator.validateInputLength(control, 1, 5, 'testing error');
      expect(errors.minMaxError).toBe('Field is required.');
    });
    it('returns error with error message when control.value is null', () => {
      control.value = null;
      const errors = MinMaxValidator.validateInputLength(control, 1, 5, 'testing error');
      expect(errors.minMaxError).toBe('Field is required.');
    });
    it('returns error when control.value is ""', () => {
      control.value = '';
      const errors = MinMaxValidator.validateInputLength(control, 1, 5, 'testing error');
      expect(errors.minMaxError).toBe('Field is required.');
    });
    it('returns error when control.value is greater than max and only maxValue is provided', () => {
      control.value = '123';
      const errors = MinMaxValidator.validateInputLength(control, 5, undefined, 'testing error');
      expect(errors.minMaxError).toBe('testing error');
    });
    it('returns error when control.value is greater than max and min/maxValue is provided', () => {
      control.value = '123';
      const errors = MinMaxValidator.validateInputLength(control, 1, 5, 'testing error');
      expect(errors.minMaxError).toBe('testing error');
    });
    it('returns error when control.value is less than min and only min is provided', () => {
      control.value = '1';
      const errors = MinMaxValidator.validateInputLength(control, undefined, 5, 'testing error');
      expect(errors.minMaxError).toBe('testing error');
    });
    it('returns error when control.value is less than min and min/maxValue is provided', () => {
      control.value = '1';
      const errors = MinMaxValidator.validateInputLength(control, 2, 5, 'testing error');
      expect(errors.minMaxError).toBe('testing error');
    });
  });
});
