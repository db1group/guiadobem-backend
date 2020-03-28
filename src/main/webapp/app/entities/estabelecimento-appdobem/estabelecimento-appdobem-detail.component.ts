import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';

@Component({
  selector: 'jhi-estabelecimento-appdobem-detail',
  templateUrl: './estabelecimento-appdobem-detail.component.html'
})
export class EstabelecimentoAppdobemDetailComponent implements OnInit {
  estabelecimento: IEstabelecimentoAppdobem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estabelecimento }) => (this.estabelecimento = estabelecimento));
  }

  previousState(): void {
    window.history.back();
  }
}
