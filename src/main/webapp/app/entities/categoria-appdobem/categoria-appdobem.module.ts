import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppbemSharedModule } from 'app/shared/shared.module';
import { CategoriaAppdobemComponent } from './categoria-appdobem.component';
import { CategoriaAppdobemDetailComponent } from './categoria-appdobem-detail.component';
import { CategoriaAppdobemUpdateComponent } from './categoria-appdobem-update.component';
import { CategoriaAppdobemDeleteDialogComponent } from './categoria-appdobem-delete-dialog.component';
import { categoriaRoute } from './categoria-appdobem.route';

@NgModule({
  imports: [AppbemSharedModule, RouterModule.forChild(categoriaRoute)],
  declarations: [
    CategoriaAppdobemComponent,
    CategoriaAppdobemDetailComponent,
    CategoriaAppdobemUpdateComponent,
    CategoriaAppdobemDeleteDialogComponent
  ],
  entryComponents: [CategoriaAppdobemDeleteDialogComponent]
})
export class AppbemCategoriaAppdobemModule {}
