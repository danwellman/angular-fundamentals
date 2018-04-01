import { FormControl } from '@angular/forms';

import { notAllCaps } from './not-all-caps.validator';

describe('the notAllCaps validator', () => {
  let validatorFn;

  beforeEach(() => {
    validatorFn = notAllCaps();
  });

  it('returns null if the value of the form control is not uppercase', () => {
    const control = new FormControl();
    control.setValue('lowercase');

    const result = validatorFn(control);

    expect(result).toBeNull();
  });

  it('returns an object if the value of the form control is uppercase', () => {
    const control = new FormControl();
    control.setValue('UPPERCASE');

    const result = validatorFn(control);

    expect(result).toEqual({
      notAllCaps: 'No shouting please'
    });
  });

});
