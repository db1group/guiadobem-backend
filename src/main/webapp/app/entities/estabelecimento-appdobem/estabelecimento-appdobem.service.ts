import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';

type EntityResponseType = HttpResponse<IEstabelecimentoAppdobem>;
type EntityArrayResponseType = HttpResponse<IEstabelecimentoAppdobem[]>;

@Injectable({ providedIn: 'root' })
export class EstabelecimentoAppdobemService {
  public resourceUrl = SERVER_API_URL + 'api/estabelecimentos';

  constructor(protected http: HttpClient) {}

  create(estabelecimento: IEstabelecimentoAppdobem): Observable<EntityResponseType> {
    return this.http.post<IEstabelecimentoAppdobem>(this.resourceUrl, estabelecimento, { observe: 'response' });
  }

  update(estabelecimento: IEstabelecimentoAppdobem): Observable<EntityResponseType> {
    return this.http.put<IEstabelecimentoAppdobem>(this.resourceUrl, estabelecimento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstabelecimentoAppdobem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstabelecimentoAppdobem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
