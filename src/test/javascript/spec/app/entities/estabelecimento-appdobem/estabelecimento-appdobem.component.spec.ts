import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { AppbemTestModule } from '../../../test.module';
import { EstabelecimentoAppdobemComponent } from 'app/entities/estabelecimento-appdobem/estabelecimento-appdobem.component';
import { EstabelecimentoAppdobemService } from 'app/entities/estabelecimento-appdobem/estabelecimento-appdobem.service';
import { EstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';

describe('Component Tests', () => {
  describe('EstabelecimentoAppdobem Management Component', () => {
    let comp: EstabelecimentoAppdobemComponent;
    let fixture: ComponentFixture<EstabelecimentoAppdobemComponent>;
    let service: EstabelecimentoAppdobemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [EstabelecimentoAppdobemComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(EstabelecimentoAppdobemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstabelecimentoAppdobemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstabelecimentoAppdobemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstabelecimentoAppdobem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estabelecimentos && comp.estabelecimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstabelecimentoAppdobem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estabelecimentos && comp.estabelecimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
