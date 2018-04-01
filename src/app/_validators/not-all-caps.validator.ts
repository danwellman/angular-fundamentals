import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notAllCaps(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const regex = /^[A-Z]+$/g;

    if (control && regex.test(control.value)) {
      return { notAllCaps: 'No shouting please' };
    }

    return null;
  };
}
