import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppbemSharedModule } from 'app/shared/shared.module';
import { EstabelecimentoAppdobemComponent } from './estabelecimento-appdobem.component';
import { EstabelecimentoAppdobemDetailComponent } from './estabelecimento-appdobem-detail.component';
import { EstabelecimentoAppdobemUpdateComponent } from './estabelecimento-appdobem-update.component';
import { EstabelecimentoAppdobemDeleteDialogComponent } from './estabelecimento-appdobem-delete-dialog.component';
import { estabelecimentoRoute } from './estabelecimento-appdobem.route';

@NgModule({
  imports: [AppbemSharedModule, RouterModule.forChild(estabelecimentoRoute)],
  declarations: [
    EstabelecimentoAppdobemComponent,
    EstabelecimentoAppdobemDetailComponent,
    EstabelecimentoAppdobemUpdateComponent,
    EstabelecimentoAppdobemDeleteDialogComponent
  ],
  entryComponents: [EstabelecimentoAppdobemDeleteDialogComponent]
})
export class AppbemEstabelecimentoAppdobemModule {}
