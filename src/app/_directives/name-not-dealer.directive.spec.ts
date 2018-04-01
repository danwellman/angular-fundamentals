import { FormControl } from '@angular/forms';

import { NameNotDealerDirective } from './name-not-dealer.directive';

describe('NameNotDealerDirective', () => {
  let directive;

  beforeEach(() => {
    directive = new NameNotDealerDirective();
  });

  it('returns null if the value of the control is not "Dealer"', () => {
    const control = new FormControl();
    control.setValue('Not dealer');

    const result = directive.validate(control);

    expect(result).toBeNull();
  });

  it('returns an object if the value of the control is "Dealer"', () => {
    const control = new FormControl();
    control.setValue('dealer');

    const result = directive.validate(control);

    expect(result).toEqual({
      nameNotDealer: 'You cannot use that name'
    });
  });
});
