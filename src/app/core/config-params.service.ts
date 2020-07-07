import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {
    var httpParams = new HttpParams();
    if (config.pagina) {
      httpParams = httpParams.set('_page', config.pagina.toString()); // Sets which page shall be searched
    }
    if (config.limite) {
      httpParams = httpParams.set('_limit', config.limite.toString()); // Sets which page shall be searched
    }
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa.toString());
    }
    if (config.campo) {
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString());
    }
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'asc');
    return httpParams;
  }
}
