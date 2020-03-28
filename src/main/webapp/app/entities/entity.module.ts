import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cidade-appdobem',
        loadChildren: () => import('./cidade-appdobem/cidade-appdobem.module').then(m => m.AppbemCidadeAppdobemModule)
      },
      {
        path: 'categoria-appdobem',
        loadChildren: () => import('./categoria-appdobem/categoria-appdobem.module').then(m => m.AppbemCategoriaAppdobemModule)
      },
      {
        path: 'estabelecimento-appdobem',
        loadChildren: () =>
          import('./estabelecimento-appdobem/estabelecimento-appdobem.module').then(m => m.AppbemEstabelecimentoAppdobemModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AppbemEntityModule {}
