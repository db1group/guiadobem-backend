import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppbemSharedModule } from 'app/shared/shared.module';
import { CidadeAppdobemComponent } from './cidade-appdobem.component';
import { CidadeAppdobemDetailComponent } from './cidade-appdobem-detail.component';
import { CidadeAppdobemUpdateComponent } from './cidade-appdobem-update.component';
import { CidadeAppdobemDeleteDialogComponent } from './cidade-appdobem-delete-dialog.component';
import { cidadeRoute } from './cidade-appdobem.route';

@NgModule({
  imports: [AppbemSharedModule, RouterModule.forChild(cidadeRoute)],
  declarations: [
    CidadeAppdobemComponent,
    CidadeAppdobemDetailComponent,
    CidadeAppdobemUpdateComponent,
    CidadeAppdobemDeleteDialogComponent
  ],
  entryComponents: [CidadeAppdobemDeleteDialogComponent]
})
export class AppbemCidadeAppdobemModule {}
