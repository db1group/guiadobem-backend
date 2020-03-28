import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';

type EntityResponseType = HttpResponse<ICidadeAppdobem>;
type EntityArrayResponseType = HttpResponse<ICidadeAppdobem[]>;

@Injectable({ providedIn: 'root' })
export class CidadeAppdobemService {
  public resourceUrl = SERVER_API_URL + 'api/cidades';

  constructor(protected http: HttpClient) {}

  create(cidade: ICidadeAppdobem): Observable<EntityResponseType> {
    return this.http.post<ICidadeAppdobem>(this.resourceUrl, cidade, { observe: 'response' });
  }

  update(cidade: ICidadeAppdobem): Observable<EntityResponseType> {
    return this.http.put<ICidadeAppdobem>(this.resourceUrl, cidade, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICidadeAppdobem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICidadeAppdobem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
