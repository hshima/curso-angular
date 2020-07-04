import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  alerta = {
    titulo: 'Sucesso!',
    descricao: 'Registro foi salvo',
    btnSucesso: 'OK',
    btnCancelar: 'Cancelar',
    corBtnSucesso: 'accent',
    corBtnCancelar: 'warn',
    possuiBtnFechar: false
  } as Alerta;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //as typescript 8.3.21 doen't supprt Elvis operator (?), validation must be created through logic
    if (this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.corBtnSucesso = this.data.corBtn || this.alerta.corBtnSucesso;
      this.alerta.corBtnCancelar = this.data.corBtn || this.alerta.corBtnCancelar;
      this.alerta.possuiBtnFechar = this.data.possuiBtnFechar || this.alerta.possuiBtnFechar;
    }
  }

}