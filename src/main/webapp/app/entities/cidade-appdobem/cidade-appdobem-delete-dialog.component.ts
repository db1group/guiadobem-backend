import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';
import { CidadeAppdobemService } from './cidade-appdobem.service';

@Component({
  templateUrl: './cidade-appdobem-delete-dialog.component.html'
})
export class CidadeAppdobemDeleteDialogComponent {
  cidade?: ICidadeAppdobem;

  constructor(
    protected cidadeService: CidadeAppdobemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cidadeListModification');
      this.activeModal.close();
    });
  }
}
