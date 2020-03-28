export interface IEstabelecimentoAppdobem {
  id?: number;
  nome?: string;
  tipo?: string;
  telefone?: string;
  whatsapp?: string;
  responsavel?: string;
  urlLogo?: string;
  publicar?: boolean;
  cidadeId?: number;
  categoriaId?: number;
}

export class EstabelecimentoAppdobem implements IEstabelecimentoAppdobem {
  constructor(
    public id?: number,
    public nome?: string,
    public tipo?: string,
    public telefone?: string,
    public whatsapp?: string,
    public responsavel?: string,
    public urlLogo?: string,
    public publicar?: boolean,
    public cidadeId?: number,
    public categoriaId?: number
  ) {
    this.publicar = this.publicar || false;
  }
}
