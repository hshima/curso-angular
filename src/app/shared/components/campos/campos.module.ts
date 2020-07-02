import { NgModule } from '@angular/core';
import { InputTextComponent } from './input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputSelectareaComponent } from './input-selectarea/input-selectarea.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

@NgModule({
    declarations: [
        InputTextComponent,
        InputNumberComponent,
        InputDateComponent,
        InputSelectareaComponent,
        InputSelectareaComponent,
        InputTextareaComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports:[
        InputTextComponent,
        InputNumberComponent,
        InputDateComponent,
        InputSelectareaComponent,
        InputSelectareaComponent,
        InputTextareaComponent
    ]
})
export class CamposModule { }