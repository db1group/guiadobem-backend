import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';

@Component({
  selector: 'jhi-categoria-appdobem-detail',
  templateUrl: './categoria-appdobem-detail.component.html'
})
export class CategoriaAppdobemDetailComponent implements OnInit {
  categoria: ICategoriaAppdobem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoria }) => (this.categoria = categoria));
  }

  previousState(): void {
    window.history.back();
  }
}
