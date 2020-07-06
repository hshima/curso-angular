import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const url = 'http://localhost:3000/filmes/';
@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(pagina: number, qtdPagina: number, texto: string, genero: string): Observable<Filme[]> {
    var httpParams = new HttpParams();
    httpParams = httpParams.set('_page', pagina.toString()); // Sets which page shall be searched
    httpParams = httpParams.set('_limit', qtdPagina.toString()); // Sets which page shall be searched
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');
    if (texto) {
      httpParams = httpParams.set('q', texto.toString()); 
    }
    if (genero) {
      httpParams = httpParams.set('genero', genero.toString());
    }
    return this.http.get<Filme[]>(url, { params: httpParams });

  }

}
