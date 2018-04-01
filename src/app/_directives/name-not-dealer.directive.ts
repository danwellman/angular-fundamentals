import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appNameNotDealer]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NameNotDealerDirective, multi: true }]
})
export class NameNotDealerDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } {
    if (control.value && control.value.toLowerCase() === 'dealer') {
      return { nameNotDealer: 'You cannot use that name' };
    }

    return null;
  }

}
