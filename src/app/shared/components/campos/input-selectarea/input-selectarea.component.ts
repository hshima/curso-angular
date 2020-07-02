import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-selectarea',
  templateUrl: './input-selectarea.component.html',
  styleUrls: ['./input-selectarea.component.scss']
})
export class InputSelectareaComponent {

@Input() titulo: string;
@Input() formGroup: FormGroup;
@Input() controlName: string;

  constructor(public validacao: ValidarCamposService) { }

  get formControl(): AbstractControl{
    return this.formGroup
      .controls[this.controlName];
  }

}
