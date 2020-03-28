import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';

type EntityResponseType = HttpResponse<ICategoriaAppdobem>;
type EntityArrayResponseType = HttpResponse<ICategoriaAppdobem[]>;

@Injectable({ providedIn: 'root' })
export class CategoriaAppdobemService {
  public resourceUrl = SERVER_API_URL + 'api/categorias';

  constructor(protected http: HttpClient) {}

  create(categoria: ICategoriaAppdobem): Observable<EntityResponseType> {
    return this.http.post<ICategoriaAppdobem>(this.resourceUrl, categoria, { observe: 'response' });
  }

  update(categoria: ICategoriaAppdobem): Observable<EntityResponseType> {
    return this.http.put<ICategoriaAppdobem>(this.resourceUrl, categoria, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategoriaAppdobem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategoriaAppdobem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
