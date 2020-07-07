import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { ConfigParams } from 'src/app/shared/models/config-params';


@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  
  config: ConfigParams = {
    pagina: 0,
    limite: 4
  };
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror', 'comedia', 'drama'];

    this.filtrosListagem = this.fb.group({
      texto: [''], // Receives an empty array, as fields will be retrieved from DB
      generos: ['']
    });

    this.listarFilmes();
    // this.onScroll();
    this.filtrosListagem.get('texto') // From the texto variable,
      .valueChanges // get a valueChanges(): Observable
      .pipe(debounceTime(400)) //every 400 miliseconds after stop writing, angular will request in the server
      .subscribe((val: string) => {// And Subscribe for alterations
        this.config.pesquisa = val;
        this.resertarConsulta();
      });

    this.filtrosListagem.get('genero') // From the texto variable,
      .valueChanges // get a valueChanges(): Observable
      .pipe(debounceTime(400)) //every 400 miliseconds after stop writing, angular will request in the server
      .subscribe((val: string) => { // And Subscribe for alterations
        if(val==null) {val = '';}
        console.log(val);
        this.config.campo = { tipo: 'genero', valor: val };
        this.resertarConsulta();
      });
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => {
        this.filmes.push( // makes a push to the existing result, instead of overwritting the actual content
          ...filmes) // Adding tha spread operator allows the array to be appended
      });
  }

  private resertarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
