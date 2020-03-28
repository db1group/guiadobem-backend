import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CidadeAppdobemService } from './cidade-appdobem.service';
import { CidadeAppdobemDeleteDialogComponent } from './cidade-appdobem-delete-dialog.component';

@Component({
  selector: 'jhi-cidade-appdobem',
  templateUrl: './cidade-appdobem.component.html'
})
export class CidadeAppdobemComponent implements OnInit, OnDestroy {
  cidades?: ICidadeAppdobem[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected cidadeService: CidadeAppdobemService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.cidadeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ICidadeAppdobem[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInCidades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICidadeAppdobem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCidades(): void {
    this.eventSubscriber = this.eventManager.subscribe('cidadeListModification', () => this.loadPage());
  }

  delete(cidade: ICidadeAppdobem): void {
    const modalRef = this.modalService.open(CidadeAppdobemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cidade = cidade;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ICidadeAppdobem[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/cidade-appdobem'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.cidades = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
