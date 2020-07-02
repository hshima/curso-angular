import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }
  hasErrorValidate(control: AbstractControl, errorName: string): boolean {
    if ((control.dirty || control.touched) && this.hasError(control, errorName)) {
      return true;
    }
    return false;
  }

  lengthValidar(control: AbstractControl, errorName: string): number{
    const error = control.errors[errorName]; // captures an error
    return error.requiredLength || error.min || error.max || 0;
  }
}
