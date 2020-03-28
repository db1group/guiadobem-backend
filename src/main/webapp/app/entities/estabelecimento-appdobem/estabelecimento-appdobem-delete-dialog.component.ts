import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';
import { EstabelecimentoAppdobemService } from './estabelecimento-appdobem.service';

@Component({
  templateUrl: './estabelecimento-appdobem-delete-dialog.component.html'
})
export class EstabelecimentoAppdobemDeleteDialogComponent {
  estabelecimento?: IEstabelecimentoAppdobem;

  constructor(
    protected estabelecimentoService: EstabelecimentoAppdobemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estabelecimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('estabelecimentoListModification');
      this.activeModal.close();
    });
  }
}
