import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEstabelecimentoAppdobem, EstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';
import { EstabelecimentoAppdobemService } from './estabelecimento-appdobem.service';
import { ICidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';
import { CidadeAppdobemService } from 'app/entities/cidade-appdobem/cidade-appdobem.service';
import { ICategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';
import { CategoriaAppdobemService } from 'app/entities/categoria-appdobem/categoria-appdobem.service';

type SelectableEntity = ICidadeAppdobem | ICategoriaAppdobem;

@Component({
  selector: 'jhi-estabelecimento-appdobem-update',
  templateUrl: './estabelecimento-appdobem-update.component.html'
})
export class EstabelecimentoAppdobemUpdateComponent implements OnInit {
  isSaving = false;
  cidades: ICidadeAppdobem[] = [];
  categorias: ICategoriaAppdobem[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    telefone: [],
    whatsapp: [],
    responsavel: [],
    urlLogo: [],
    publicar: [],
    cidadeId: [],
    categoriaId: []
  });

  constructor(
    protected estabelecimentoService: EstabelecimentoAppdobemService,
    protected cidadeService: CidadeAppdobemService,
    protected categoriaService: CategoriaAppdobemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estabelecimento }) => {
      this.updateForm(estabelecimento);

      this.cidadeService.query().subscribe((res: HttpResponse<ICidadeAppdobem[]>) => (this.cidades = res.body || []));

      this.categoriaService.query().subscribe((res: HttpResponse<ICategoriaAppdobem[]>) => (this.categorias = res.body || []));
    });
  }

  updateForm(estabelecimento: IEstabelecimentoAppdobem): void {
    this.editForm.patchValue({
      id: estabelecimento.id,
      nome: estabelecimento.nome,
      tipo: estabelecimento.tipo,
      telefone: estabelecimento.telefone,
      whatsapp: estabelecimento.whatsapp,
      responsavel: estabelecimento.responsavel,
      urlLogo: estabelecimento.urlLogo,
      publicar: estabelecimento.publicar,
      cidadeId: estabelecimento.cidadeId,
      categoriaId: estabelecimento.categoriaId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estabelecimento = this.createFromForm();
    if (estabelecimento.id !== undefined) {
      this.subscribeToSaveResponse(this.estabelecimentoService.update(estabelecimento));
    } else {
      this.subscribeToSaveResponse(this.estabelecimentoService.create(estabelecimento));
    }
  }

  private createFromForm(): IEstabelecimentoAppdobem {
    return {
      ...new EstabelecimentoAppdobem(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      whatsapp: this.editForm.get(['whatsapp'])!.value,
      responsavel: this.editForm.get(['responsavel'])!.value,
      urlLogo: this.editForm.get(['urlLogo'])!.value,
      publicar: this.editForm.get(['publicar'])!.value,
      cidadeId: this.editForm.get(['cidadeId'])!.value,
      categoriaId: this.editForm.get(['categoriaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstabelecimentoAppdobem>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
