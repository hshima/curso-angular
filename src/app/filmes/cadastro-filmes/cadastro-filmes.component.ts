import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';


@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router
  ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.cadastro = this.fb.group({
      titulo: ['', // Initial information
        [Validators.required, Validators.minLength(2), Validators.maxLength(256)] // Properties
      ],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror', 'comedia', 'drama']
  }

  submit(): void {
    this.cadastro.markAllAsTouched(); // Every time a cadastro is called, it will be set as clicked once
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro
      .getRawValue() as Filme;// Returns all fields that are presentin the cadatro's formGroup and Casts rawValue as Filme
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme)
      .subscribe(() => {//due to lazy behaviour, it's mandatory to have the 
        const config = { //Stablishes an object
          data: { // with properties to be overriden
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar novo filme',
            corBtnCancelar: 'primary',
            possuiBtnFechar: true
          } as Alerta
        }
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl('filmes');
          } else {
            this.reiniciarForm();
          }
        })
      },
        () => {
          const config = {
            data: { // with properties to be overriden
              btnSucesso: 'Fechar',
              descricao: 'Erro',
              corBtnSucesso: 'warn',
              titulo: 'Erro ao salvar o registro'
            } as Alerta
          };
          this.dialog.open(AlertaComponent, config);
        });
  }
}
