export interface ICategoriaAppdobem {
  id?: number;
  nome?: string;
  urlImagem?: string;
  descricao?: string;
}

export class CategoriaAppdobem implements ICategoriaAppdobem {
  constructor(public id?: number, public nome?: string, public urlImagem?: string, public descricao?: string) {}
}
