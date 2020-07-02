import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})

export class InputTextComponent {

  @Input() titulo: string; // Injects properties in the html tag for name
  @Input() formGroup: FormGroup; 
  @Input() controlName: string; // formControls' name for the formular being generated from the formControl Method

  constructor(public validacao: ValidarCamposService) { } // injects a validation variable for property processing

  get formControl(): AbstractControl {
    return this.formGroup
      .controls[this.controlName];
  }

}