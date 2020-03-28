import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICategoriaAppdobem, CategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';
import { CategoriaAppdobemService } from './categoria-appdobem.service';
import { CategoriaAppdobemComponent } from './categoria-appdobem.component';
import { CategoriaAppdobemDetailComponent } from './categoria-appdobem-detail.component';
import { CategoriaAppdobemUpdateComponent } from './categoria-appdobem-update.component';

@Injectable({ providedIn: 'root' })
export class CategoriaAppdobemResolve implements Resolve<ICategoriaAppdobem> {
  constructor(private service: CategoriaAppdobemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategoriaAppdobem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((categoria: HttpResponse<CategoriaAppdobem>) => {
          if (categoria.body) {
            return of(categoria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CategoriaAppdobem());
  }
}

export const categoriaRoute: Routes = [
  {
    path: '',
    component: CategoriaAppdobemComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'appbemApp.categoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategoriaAppdobemDetailComponent,
    resolve: {
      categoria: CategoriaAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.categoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategoriaAppdobemUpdateComponent,
    resolve: {
      categoria: CategoriaAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.categoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategoriaAppdobemUpdateComponent,
    resolve: {
      categoria: CategoriaAppdobemResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appbemApp.categoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
