import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, Validator, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';

export const fieldsMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');

  return name && alterEgo && name.value === alterEgo.value ? { 'fieldsMatch': true } : null;
};

@Directive({
  selector: '[fieldsMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: FieldsMatchDirective, multi: true}]
})
export class FieldsMatchDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return fieldsMatchValidator(control);
  }
}
