import { Component, OnInit } from '@angular/core';
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
  pagina = 0;

  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void {
    //this.filmesService.listar().subscribe((filmes: Filme[]) => this.filmes = filmes); // retrieves all of the register
    console.log("chamado metodo: ngOnInit");
    this.listarFilmes();
    this.onScroll();
  }

  onScroll(): void {
    console.log("chamado metodo: onScroll ");
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina)
      .subscribe((filmes: Filme[]) => {
        this.filmes.push( // makes a push to the existing result, instead of overwritting the actual content
          ...filmes) // Adding tha spread operator allows the array to be appended
        });
  }

}
