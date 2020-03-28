import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';
import { CategoriaAppdobemService } from './categoria-appdobem.service';

@Component({
  templateUrl: './categoria-appdobem-delete-dialog.component.html'
})
export class CategoriaAppdobemDeleteDialogComponent {
  categoria?: ICategoriaAppdobem;

  constructor(
    protected categoriaService: CategoriaAppdobemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categoriaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('categoriaListModification');
      this.activeModal.close();
    });
  }
}
