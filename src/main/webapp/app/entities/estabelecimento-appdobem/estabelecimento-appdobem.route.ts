import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstabelecimentoAppdobem, EstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';
import { EstabelecimentoAppdobemService } from './estabelecimento-appdobem.service';
import { EstabelecimentoAppdobemComponent } from './estabelecimento-appdobem.component';
import { EstabelecimentoAppdobemDetailComponent } from './estabelecimento-appdobem-detail.component';
import { EstabelecimentoAppdobemUpdateComponent } from './estabelecimento-appdobem-update.component';

@Injectable({ providedIn: 'root' })
export class EstabelecimentoAppdobemResolve implements Resolve<IEstabelecimentoAppdobem> {
  constructor(private service: EstabelecimentoAppdobemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstabelecimentoAppdobem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estabelecimento: HttpResponse<EstabelecimentoAppdobem>) => {
          if (estabelecimento.body) {
            return of(estabelecimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstabelecimentoAppdobem());
  }
}

export const estabelecimentoRoute: Routes = [
  {
    path: '',
    component: EstabelecimentoAppdobemComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'appbemApp.estabelecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstabelecimentoAppdobemDetailComponent,
    resolve: {
      estabelecimento: EstabelecimentoAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.estabelecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstabelecimentoAppdobemUpdateComponent,
    resolve: {
      estabelecimento: EstabelecimentoAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.estabelecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstabelecimentoAppdobemUpdateComponent,
    resolve: {
      estabelecimento: EstabelecimentoAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.estabelecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
