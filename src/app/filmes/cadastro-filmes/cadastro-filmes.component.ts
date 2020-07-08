import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeService.visualizar(this.id).subscribe((filme: Filme) => this.criarFormulario(filme));
    }
    else this.criarFormulario(this.criarFilmeEmBranco());

    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror', 'comedia', 'drama']
  }

  submit(): void {
    this.cadastro.markAllAsTouched(); // Every time a cadastro is called, it will be set as clicked once
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro
      .getRawValue() as Filme;// Returns all fields that are presentin the cadatro's formGroup and Casts rawValue as Filme
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, // Initial information
      [Validators.required, Validators.minLength(2), Validators.maxLength(256)] // Properties
      ],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null
    } as Filme
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
        });
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

  private editar(filme: Filme): void {
    this.filmeService.editar(filme)
      .subscribe(() => {
        const config = {
          data: {
            titulo: 'registro atualizado com sucesso!',
            descricao: 'Seu registro foi atualizado com sucesso',
            } as Alerta
        }
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(() => 
          this.router.navigateByUrl('filmes')
        );
      },
        () => {
          const config = {
            data: {
              titulo: 'Erro ao editar o registro',
              descricao: 'A edição não teve sucesso, tente novamente mais tarde',
              corBtnSucesso: 'warn',
              btnSucesso: 'Fechar'
            } as Alerta
          };
          this.dialog.open(AlertaComponent, config);
        });
  }
}
