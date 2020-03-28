export interface ICidadeAppdobem {
  id?: number;
  nome?: string;
  urlImagem?: string;
}

export class CidadeAppdobem implements ICidadeAppdobem {
  constructor(public id?: number, public nome?: string, public urlImagem?: string) {}
}
