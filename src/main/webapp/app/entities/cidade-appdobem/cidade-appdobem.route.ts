import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICidadeAppdobem, CidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';
import { CidadeAppdobemService } from './cidade-appdobem.service';
import { CidadeAppdobemComponent } from './cidade-appdobem.component';
import { CidadeAppdobemDetailComponent } from './cidade-appdobem-detail.component';
import { CidadeAppdobemUpdateComponent } from './cidade-appdobem-update.component';

@Injectable({ providedIn: 'root' })
export class CidadeAppdobemResolve implements Resolve<ICidadeAppdobem> {
  constructor(private service: CidadeAppdobemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICidadeAppdobem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cidade: HttpResponse<CidadeAppdobem>) => {
          if (cidade.body) {
            return of(cidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CidadeAppdobem());
  }
}

export const cidadeRoute: Routes = [
  {
    path: '',
    component: CidadeAppdobemComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'appbemApp.cidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CidadeAppdobemDetailComponent,
    resolve: {
      cidade: CidadeAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.cidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CidadeAppdobemUpdateComponent,
    resolve: {
      cidade: CidadeAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.cidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CidadeAppdobemUpdateComponent,
    resolve: {
      cidade: CidadeAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.cidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
