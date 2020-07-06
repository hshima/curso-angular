import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';



import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';


@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina = 4;
  filmes: Filme[] = []; // Starts the variable a empty array, not a null (undefined) array
  texto: string = '';
  genero: string = '';
  pagina = 0;
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''], // Receives an empty array, as fields will be retrieved from DB
      generos: ['']
    });

    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror', 'comedia', 'drama'];

    this.listarFilmes();
    this.onScroll();
    this.filtrosListagem.get('texto') // From the texto variable,
    .valueChanges // get a valueChanges(): Observable
    .subscribe((val: string) => {// And Subscribe for alterations
      this.texto = val;
      this.resertarConsulta();
    }); 

    this.filtrosListagem.get('genero') // From the texto variable,
    .valueChanges // get a valueChanges(): Observable
    .subscribe((val: string) => { // And Subscribe for alterations
      this.genero = val;
      this.resertarConsulta();
    });
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina, this.texto, this.genero)
      .subscribe((filmes: Filme[]) => {
        this.filmes.push( // makes a push to the existing result, instead of overwritting the actual content
          ...filmes) // Adding tha spread operator allows the array to be appended
        });
  }

  private resertarConsulta(): void {
    this.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
