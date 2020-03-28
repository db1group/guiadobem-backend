import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';

@Component({
  selector: 'jhi-cidade-appdobem-detail',
  templateUrl: './cidade-appdobem-detail.component.html'
})
export class CidadeAppdobemDetailComponent implements OnInit {
  cidade: ICidadeAppdobem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cidade }) => (this.cidade = cidade));
  }

  previousState(): void {
    window.history.back();
  }
}
