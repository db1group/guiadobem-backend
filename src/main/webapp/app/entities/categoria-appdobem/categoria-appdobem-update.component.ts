import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICategoriaAppdobem, CategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';
import { CategoriaAppdobemService } from './categoria-appdobem.service';

@Component({
  selector: 'jhi-categoria-appdobem-update',
  templateUrl: './categoria-appdobem-update.component.html'
})
export class CategoriaAppdobemUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    urlImagem: [],
    descricao: []
  });

  constructor(protected categoriaService: CategoriaAppdobemService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoria }) => {
      this.updateForm(categoria);
    });
  }

  updateForm(categoria: ICategoriaAppdobem): void {
    this.editForm.patchValue({
      id: categoria.id,
      nome: categoria.nome,
      urlImagem: categoria.urlImagem,
      descricao: categoria.descricao
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categoria = this.createFromForm();
    if (categoria.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriaService.update(categoria));
    } else {
      this.subscribeToSaveResponse(this.categoriaService.create(categoria));
    }
  }

  private createFromForm(): ICategoriaAppdobem {
    return {
      ...new CategoriaAppdobem(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      urlImagem: this.editForm.get(['urlImagem'])!.value,
      descricao: this.editForm.get(['descricao'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaAppdobem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
