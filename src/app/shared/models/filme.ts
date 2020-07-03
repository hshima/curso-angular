export interface Filme {
    id?: number; // Field that will be received from external source, so it must have ?
    titulo: string;
    urlFoto?: string;
    dtLancamento: Date;
    descricao?: string;
    nota: number;
    urlIMDb?: string;
    genero: string;
}
