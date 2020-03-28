import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICidadeAppdobem, CidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';
import { CidadeAppdobemService } from './cidade-appdobem.service';

@Component({
  selector: 'jhi-cidade-appdobem-update',
  templateUrl: './cidade-appdobem-update.component.html'
})
export class CidadeAppdobemUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    urlImagem: []
  });

  constructor(protected cidadeService: CidadeAppdobemService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cidade }) => {
      this.updateForm(cidade);
    });
  }

  updateForm(cidade: ICidadeAppdobem): void {
    this.editForm.patchValue({
      id: cidade.id,
      nome: cidade.nome,
      urlImagem: cidade.urlImagem
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cidade = this.createFromForm();
    if (cidade.id !== undefined) {
      this.subscribeToSaveResponse(this.cidadeService.update(cidade));
    } else {
      this.subscribeToSaveResponse(this.cidadeService.create(cidade));
    }
  }

  private createFromForm(): ICidadeAppdobem {
    return {
      ...new CidadeAppdobem(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      urlImagem: this.editForm.get(['urlImagem'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICidadeAppdobem>>): void {
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
