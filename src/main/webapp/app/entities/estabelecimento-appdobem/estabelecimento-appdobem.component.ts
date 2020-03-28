import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EstabelecimentoAppdobemService } from './estabelecimento-appdobem.service';
import { EstabelecimentoAppdobemDeleteDialogComponent } from './estabelecimento-appdobem-delete-dialog.component';

@Component({
  selector: 'jhi-estabelecimento-appdobem',
  templateUrl: './estabelecimento-appdobem.component.html'
})
export class EstabelecimentoAppdobemComponent implements OnInit, OnDestroy {
  estabelecimentos?: IEstabelecimentoAppdobem[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected estabelecimentoService: EstabelecimentoAppdobemService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.estabelecimentoService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IEstabelecimentoAppdobem[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInEstabelecimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstabelecimentoAppdobem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstabelecimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('estabelecimentoListModification', () => this.loadPage());
  }

  delete(estabelecimento: IEstabelecimentoAppdobem): void {
    const modalRef = this.modalService.open(EstabelecimentoAppdobemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estabelecimento = estabelecimento;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IEstabelecimentoAppdobem[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/estabelecimento-appdobem'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.estabelecimentos = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
