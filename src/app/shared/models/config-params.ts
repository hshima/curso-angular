import { CampoGenerico } from './campo-generico';

export interface ConfigParams {
    pagina?: number;
    limite?: number;
    pesquisa?: string;
    // genero?: string // if genero were defined, the search would be closed in genero element. it's needed a wider possibility
    campo?: CampoGenerico; // to make a wider range, it's created campo interface so the value would be flexible
}
