import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

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
    private fb: FormBuilder,
    private filmeService: FilmesService
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
        alert('Sucesso!');
      },
      () => {
        'Erro ao Salvar'
      }); 
  }
}
